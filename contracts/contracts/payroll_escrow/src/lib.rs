// contracts/payroll_escrow/src/lib.rs
#![no_std]
#![allow(clippy::needless_borrows_for_generic_args, deprecated)]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env};

mod test;

#[contracttype]
pub enum DataKey {
    Escrow(Address), // keyed by worker address
    Admin,
    UsdcToken,
}

#[contracttype]
#[derive(Clone)]
pub struct EscrowRecord {
    pub employer: Address,
    pub worker: Address,
    pub amount: i128,
    pub release_at: u64,
    pub is_released: bool,
    pub created_at: u64,
}

#[contract]
pub struct PayrollEscrowContract;

#[contractimpl]
impl PayrollEscrowContract {
    pub fn initialize(env: Env, admin: Address, usdc_token: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage()
            .instance()
            .set(&DataKey::UsdcToken, &usdc_token);
    }

    pub fn deposit_escrow(
        env: Env,
        employer: Address,
        worker: Address,
        amount: i128,
        release_after_days: u64,
    ) {
        employer.require_auth();
        assert!(amount > 0, "Amount must be positive");

        let usdc_token: Address = env.storage().instance().get(&DataKey::UsdcToken).unwrap();
        let token_client = token::Client::new(&env, &usdc_token);

        token_client.transfer(&employer, &env.current_contract_address(), &amount);

        let release_at = env.ledger().timestamp() + (release_after_days * 86400);

        let record = EscrowRecord {
            employer: employer.clone(),
            worker: worker.clone(),
            amount,
            release_at,
            is_released: false,
            created_at: env.ledger().timestamp(),
        };

        env.storage()
            .persistent()
            .set(&DataKey::Escrow(worker.clone()), &record);
    }

    pub fn claim_wages(env: Env, worker: Address) -> i128 {
        worker.require_auth();

        let mut record: EscrowRecord = env
            .storage()
            .persistent()
            .get(&DataKey::Escrow(worker.clone()))
            .expect("No escrow found");

        assert!(!record.is_released, "Already released");
        assert!(
            env.ledger().timestamp() >= record.release_at,
            "Release time not reached"
        );

        let usdc_token: Address = env.storage().instance().get(&DataKey::UsdcToken).unwrap();
        let token_client = token::Client::new(&env, &usdc_token);

        let amount = record.amount;
        token_client.transfer(&env.current_contract_address(), &worker, &amount);

        record.is_released = true;
        env.storage()
            .persistent()
            .set(&DataKey::Escrow(worker.clone()), &record);

        amount
    }

    pub fn get_escrow(env: Env, worker: Address) -> Option<EscrowRecord> {
        env.storage().persistent().get(&DataKey::Escrow(worker))
    }
}

// contracts/aid_vault/src/lib.rs
#![no_std]
#![allow(clippy::needless_borrows_for_generic_args, deprecated)]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env};

#[contracttype]
pub enum DataKey {
    Admin,
    IdentityContract,
    UsdcToken,
    TotalDisbursed,
    Allocation(Address),
    Paused,
}

#[contracttype]
#[derive(Clone)]
pub struct AllocationRecord {
    pub refugee: Address,
    pub amount_per_period: i128,
    pub total_allocated: i128,
    pub total_claimed: i128,
    pub last_claim_at: u64,
    pub claim_interval_days: u64,
    pub is_active: bool,
}

#[contract]
pub struct AidVaultContract;

#[contractimpl]
impl AidVaultContract {
    pub fn initialize(env: Env, admin: Address, usdc_token: Address, identity_contract: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage()
            .instance()
            .set(&DataKey::UsdcToken, &usdc_token);
        env.storage()
            .instance()
            .set(&DataKey::IdentityContract, &identity_contract);
        env.storage()
            .instance()
            .set(&DataKey::TotalDisbursed, &0i128);
        env.storage().instance().set(&DataKey::Paused, &false);
    }

    pub fn deposit(env: Env, ngo: Address, amount: i128) {
        ngo.require_auth();
        let usdc_token: Address = env.storage().instance().get(&DataKey::UsdcToken).unwrap();
        let token_client = token::Client::new(&env, &usdc_token);
        token_client.transfer(&ngo, &env.current_contract_address(), &amount);
    }

    pub fn set_allocation(
        env: Env,
        admin: Address,
        refugee: Address,
        amount_per_period: i128,
        claim_interval_days: u64,
    ) {
        admin.require_auth();
        let stored_admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        assert!(admin == stored_admin, "Unauthorized");

        let record = AllocationRecord {
            refugee: refugee.clone(),
            amount_per_period,
            total_allocated: amount_per_period * 12,
            total_claimed: 0,
            last_claim_at: 0,
            claim_interval_days,
            is_active: true,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Allocation(refugee), &record);
    }

    pub fn claim_aid(env: Env, refugee: Address) -> i128 {
        refugee.require_auth();

        let paused: bool = env
            .storage()
            .instance()
            .get(&DataKey::Paused)
            .unwrap_or(false);
        assert!(!paused, "Vault is paused");

        let mut record: AllocationRecord = env
            .storage()
            .persistent()
            .get(&DataKey::Allocation(refugee.clone()))
            .expect("No allocation found");

        assert!(record.is_active, "Allocation is not active");

        let now = env.ledger().timestamp();
        let interval_seconds = record.claim_interval_days * 86400;

        if record.last_claim_at > 0 {
            assert!(
                now >= record.last_claim_at + interval_seconds,
                "Claim interval not reached"
            );
        }

        let usdc_token: Address = env.storage().instance().get(&DataKey::UsdcToken).unwrap();
        let token_client = token::Client::new(&env, &usdc_token);

        let amount = record.amount_per_period;
        token_client.transfer(&env.current_contract_address(), &refugee, &amount);

        record.total_claimed += amount;
        record.last_claim_at = now;
        env.storage()
            .persistent()
            .set(&DataKey::Allocation(refugee.clone()), &record);

        amount
    }
}

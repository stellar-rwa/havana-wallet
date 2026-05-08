// contracts/refugee_identity/src/lib.rs
#![no_std]
#![allow(clippy::needless_borrows_for_generic_args, deprecated)]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, BytesN, Env};

mod test;

#[contracttype]
pub enum DataKey {
    Identity(Address),
    Admin,
    TotalRegistered,
}

#[contracttype]
#[derive(Clone)]
pub struct IdentityRecord {
    pub address: Address,
    pub commitment: BytesN<32>, // ZK commitment hash (no PII stored)
    pub status: IdentityStatus,
    pub verifier: Address, // UNHCR or trusted verifier address
    pub issued_at: u64,
    pub expires_at: u64,
    pub aid_tier: u32, // 1=basic, 2=standard, 3=priority
}

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum IdentityStatus {
    Pending,
    Verified,
    Suspended,
    Expired,
}

#[contract]
pub struct RefugeeIdentityContract;

#[contractimpl]
impl RefugeeIdentityContract {
    /// Initialize the contract with admin address
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage()
            .instance()
            .set(&DataKey::TotalRegistered, &0u64);
    }

    /// Register a new refugee identity (called by verified NGO/verifier)
    pub fn register_identity(
        env: Env,
        verifier: Address,
        refugee_address: Address,
        commitment: BytesN<32>,
        aid_tier: u32,
        validity_days: u64,
    ) -> IdentityRecord {
        verifier.require_auth();

        let expires_at = env.ledger().timestamp() + (validity_days * 86400);

        let record = IdentityRecord {
            address: refugee_address.clone(),
            commitment,
            status: IdentityStatus::Verified,
            verifier,
            issued_at: env.ledger().timestamp(),
            expires_at,
            aid_tier,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Identity(refugee_address.clone()), &record);

        let mut total: u64 = env
            .storage()
            .instance()
            .get(&DataKey::TotalRegistered)
            .unwrap_or(0);
        total += 1;
        env.storage()
            .instance()
            .set(&DataKey::TotalRegistered, &total);

        env.events().publish(
            (symbol_short!("identity"), symbol_short!("verified")),
            refugee_address,
        );

        record
    }

    /// Verify identity without revealing personal data (ZK-style check)
    pub fn verify_identity(env: Env, refugee_address: Address) -> bool {
        match env
            .storage()
            .persistent()
            .get::<DataKey, IdentityRecord>(&DataKey::Identity(refugee_address))
        {
            Some(record) => {
                record.status == IdentityStatus::Verified
                    && record.expires_at > env.ledger().timestamp()
            }
            None => false,
        }
    }

    /// Get identity record
    pub fn get_identity(env: Env, refugee_address: Address) -> Option<IdentityRecord> {
        env.storage()
            .persistent()
            .get(&DataKey::Identity(refugee_address))
    }

    /// Suspend an identity (admin only)
    pub fn suspend_identity(env: Env, caller: Address, refugee_address: Address) {
        caller.require_auth();
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        assert!(caller == admin, "Unauthorized");

        if let Some(mut record) = env
            .storage()
            .persistent()
            .get::<DataKey, IdentityRecord>(&DataKey::Identity(refugee_address.clone()))
        {
            record.status = IdentityStatus::Suspended;
            env.storage()
                .persistent()
                .set(&DataKey::Identity(refugee_address.clone()), &record);
            env.events().publish(
                (symbol_short!("identity"), symbol_short!("suspended")),
                refugee_address,
            );
        }
    }

    /// Get total number of registered identities
    pub fn total_registered(env: Env) -> u64 {
        env.storage()
            .instance()
            .get(&DataKey::TotalRegistered)
            .unwrap_or(0)
    }
}

// contracts/merchant_payment/src/lib.rs
#![no_std]
#![allow(clippy::needless_borrows_for_generic_args, deprecated)]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, token, Address, Env};

#[contracttype]
pub enum DataKey {
    Admin,
    UsdcToken,
}

#[contract]
pub struct MerchantPaymentContract;

#[contractimpl]
impl MerchantPaymentContract {
    pub fn initialize(env: Env, admin: Address, usdc_token: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage()
            .instance()
            .set(&DataKey::UsdcToken, &usdc_token);
    }

    pub fn pay_merchant(env: Env, customer: Address, merchant: Address, amount: i128) {
        customer.require_auth();
        let usdc_token: Address = env.storage().instance().get(&DataKey::UsdcToken).unwrap();
        let token_client = token::Client::new(&env, &usdc_token);
        token_client.transfer(&customer, &merchant, &amount);

        env.events().publish(
            (symbol_short!("payment"), symbol_short!("success")),
            (customer, merchant, amount),
        );
    }
}

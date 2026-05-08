#![cfg(test)]
use super::*;
use soroban_sdk::{Address, Env};

#[test]
fn test_pay_merchant() {
    let env = Env::default();
    let contract_id = env.register(MerchantPaymentContract, ());
    let client = MerchantPaymentContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let usdc_token = Address::generate(&env);
    client.initialize(&admin, &usdc_token);
}

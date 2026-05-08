#![cfg(test)]
use super::*;
use soroban_sdk::{Address, Env};

#[test]
fn test_aid_vault() {
    let env = Env::default();
    let contract_id = env.register(AidVaultContract, ());
    let client = AidVaultContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let usdc_token = Address::generate(&env);
    let identity_contract = Address::generate(&env);
    client.initialize(&admin, &usdc_token, &identity_contract);
}

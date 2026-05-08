// contracts/contracts/refugee_identity/src/test.rs
#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Env};

#[test]
fn test_initialize() {
    let env = Env::default();
    let contract_id = env.register(RefugeeIdentityContract, ());
    let client = RefugeeIdentityContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.initialize(&admin);

    assert_eq!(client.total_registered(), 0);
}

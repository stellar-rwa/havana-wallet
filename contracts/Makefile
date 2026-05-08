# contracts/Makefile

NETWORK = testnet
RPC_URL = https://soroban-testnet.stellar.org
NETWORK_PASSPHRASE = "Test SDF Network ; September 2015"

# Modern Soroban target for Rust 1.84+
TARGET = wasm32v1-none

.PHONY: build test optimize deploy-all clean

build:
	cargo build --target $(TARGET) --release

test:
	cargo test

optimize:
	stellar contract optimize --wasm target/$(TARGET)/release/refugee_identity.wasm
	stellar contract optimize --wasm target/$(TARGET)/release/payroll_escrow.wasm
	stellar contract optimize --wasm target/$(TARGET)/release/aid_vault.wasm
	stellar contract optimize --wasm target/$(TARGET)/release/merchant_payment.wasm

deploy-identity:
	stellar contract deploy \
		--wasm target/$(TARGET)/release/refugee_identity.wasm \
		--network $(NETWORK) \
		--source-account $(DEPLOYER_SECRET_KEY)

deploy-payroll:
	stellar contract deploy \
		--wasm target/$(TARGET)/release/payroll_escrow.wasm \
		--network $(NETWORK) \
		--source-account $(DEPLOYER_SECRET_KEY)

deploy-vault:
	stellar contract deploy \
		--wasm target/$(TARGET)/release/aid_vault.wasm \
		--network $(NETWORK) \
		--source-account $(DEPLOYER_SECRET_KEY)

deploy-all: build optimize deploy-identity deploy-payroll deploy-vault

clean:
	cargo clean

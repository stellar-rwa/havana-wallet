<p align="center">
  <img src="https://img.shields.io/badge/Stellar-Protocol_25-00D4AA?style=for-the-badge&logo=stellar&logoColor=white" alt="Stellar Protocol 25" />
  <img src="https://img.shields.io/badge/Soroban-WASM-6366F1?style=for-the-badge" alt="Soroban WASM" />
  <img src="https://img.shields.io/badge/Monorepo-pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm Monorepo" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<h1 align="center">🌍 Havana</h1>
<p align="center"><strong>Financial Sovereignty for Every Displaced Person on Earth.</strong></p>

<p align="center">
  Self-sovereign ZK identity · Programmable aid disbursement · Trustless payroll escrow · SMS offline fallback<br/>
  <em>Built on the Stellar Network. Designed for the 117 million people the banking system forgot.</em>
</p>

---

## Table of Contents

- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Architecture Overview](#architecture-overview)
- [Smart Contracts](#smart-contracts)
  - [Refugee Identity](#1-refugee-identity-contract)
  - [Aid Vault](#2-aid-vault-contract)
  - [Payroll Escrow](#3-payroll-escrow-contract)
  - [Merchant Payment](#4-merchant-payment-contract)
- [Backend API Reference](#backend-api-reference)
- [Database Schema](#database-schema)
- [Frontend Pages](#frontend-pages)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
  - [Docker Deployment](#docker-deployment)
- [Smart Contract Development](#smart-contract-development)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Security](#security)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## The Problem

There are **117 million displaced people** worldwide (UNHCR, 2024). The vast majority are excluded from formal financial systems because they lack one or more of:

- A government-issued ID
- A bank account or credit history
- A permanent address
- A smartphone or reliable internet connection

Traditional aid delivery relies on cash-based intermediaries, which introduces corruption, theft, and delays. Workers in informal economies face wage exploitation with no legal recourse. Merchants in refugee settlements have no digital payment rails.

**The system wasn't built for them. Havana is.**

---

## Our Solution

Havana is an end-to-end financial platform built on the **Stellar Network** that provides four core primitives:

| Primitive | What It Does | Contract |
|---|---|---|
| **ZK Identity** | Refugees prove verified status using Poseidon hash commitments — no PII ever touches the ledger | `refugee_identity` |
| **Aid Disbursement** | NGOs send USDC directly to verified wallets via the Stellar Disbursement Platform (SDP) in < 5 seconds | `aid_vault` |
| **Payroll Escrow** | Employers lock wages in a smart contract; workers claim after a time-lock — eliminating wage theft | `payroll_escrow` |
| **Merchant Payments** | QR-based point-of-sale for local merchants accepting on-chain USDC | `merchant_payment` |
| **SMS Fallback** | Twilio-powered gateway lets feature phone users check balances and send transfers via SMS | Backend service |

**Cost per transaction: $0.00001** (vs. $25 average SWIFT fee).
**Settlement time: < 5 seconds** (vs. 3–5 business days).

---

## Architecture Overview

Havana is a **pnpm monorepo** with three workspaces:

```
havana-wallet/
├── frontend/                    # Next.js 16 (React 19 + Turbopack)
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── (auth)/          # Login & onboarding flows
│   │   │   ├── (dashboard)/     # Protected dashboard views
│   │   │   ├── identity/        # ZK identity management
│   │   │   ├── send/            # Send payments
│   │   │   ├── receive/         # Receive payments / QR code
│   │   │   └── explore/         # Network explorer
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/          # StatCard, shared elements
│   │   │   ├── layout/          # TopBar, navigation
│   │   │   ├── ngo/             # DisbursementForm, RecipientTable
│   │   │   ├── ui/              # Button, Card primitives
│   │   │   └── wallet/          # BalanceCard, transaction views
│   │   ├── hooks/               # useBalance, useIdentity
│   │   ├── lib/                 # freighter.ts, API client
│   │   ├── providers/           # QueryProvider, StellarProvider
│   │   └── store/               # Zustand stores (walletStore)
│   └── public/
│       └── locales/             # i18n translations (en, ar)
│
├── backend/                     # Express 5 + Prisma + PostgreSQL
│   ├── src/
│   │   ├── config/              # env.ts, database.ts, stellar.ts
│   │   ├── generated/client/    # Prisma-generated types
│   │   ├── middleware/          # auth, errorHandler, rateLimit, validate
│   │   ├── models/              # User, Identity, Disbursement
│   │   ├── routes/              # auth, identity, disburse, payroll, sms
│   │   ├── services/            # StellarService, SDPService, SMSService
│   │   └── utils/               # crypto, logger, stellar helpers
│   └── prisma/
│       └── schema.prisma        # Database schema
│
├── contracts/                   # Soroban (Rust) smart contracts
│   └── contracts/
│       ├── refugee_identity/    # ZK identity verification
│       ├── aid_vault/           # Aid allocation & claims
│       ├── payroll_escrow/      # Wage escrow & release
│       └── merchant_payment/    # Point-of-sale payments
│
├── .github/workflows/           # CI/CD (Stellar Audit Pipeline)
├── docker-compose.yml           # Full-stack local deployment
├── pnpm-workspace.yaml          # Monorepo configuration
└── vercel.json                  # Frontend deployment config
```

---

## Smart Contracts

All four contracts are compiled to **WASM** targeting `wasm32v1-none` (Stellar Protocol 25), audited with `cargo clippy`, and formatted with `cargo fmt`.

### 1. Refugee Identity Contract
**Path:** `contracts/contracts/refugee_identity/`

Manages zero-knowledge identity commitments for refugees. A trusted verifier (e.g., UNHCR field officer) registers a Poseidon hash commitment on-chain — no personal data is ever stored on the ledger.

| Function | Auth | Description |
|---|---|---|
| `initialize(admin)` | None | Set contract admin (one-time) |
| `register_identity(verifier, refugee, commitment, tier, validity_days)` | Verifier | Register a new ZK identity with expiry and aid tier |
| `verify_identity(refugee)` → `bool` | None | Check if identity is verified and not expired |
| `get_identity(refugee)` → `IdentityRecord` | None | Fetch full identity record |
| `suspend_identity(admin, refugee)` | Admin | Suspend a compromised identity |
| `total_registered()` → `u64` | None | Count of all registered identities |

**Data types:**
```rust
IdentityRecord {
    address: Address,
    commitment: BytesN<32>,     // Poseidon ZK hash
    status: IdentityStatus,     // Pending | Verified | Suspended | Expired
    verifier: Address,
    issued_at: u64,
    expires_at: u64,
    aid_tier: u32,              // 1=basic, 2=standard, 3=priority
}
```

**Events:** `(identity, verified)`, `(identity, suspended)`

---

### 2. Aid Vault Contract
**Path:** `contracts/contracts/aid_vault/`

A programmable vault where NGOs deposit USDC and configure recurring allocations. Refugees claim their allocation after a configurable interval — funds cannot be redirected or withheld.

| Function | Auth | Description |
|---|---|---|
| `initialize(admin, usdc_token, identity_contract)` | None | Configure vault with token and identity references |
| `deposit(ngo, amount)` | NGO | Deposit USDC into the vault |
| `set_allocation(admin, refugee, amount_per_period, interval_days)` | Admin | Configure recurring aid allocation |
| `claim_aid(refugee)` → `i128` | Refugee | Claim available allocation (enforces interval) |

**Guards:**
- Vault can be paused by admin in emergencies
- Claims enforce `claim_interval_days` between withdrawals
- Allocation automatically calculates 12-period total

---

### 3. Payroll Escrow Contract
**Path:** `contracts/contracts/payroll_escrow/`

Employers deposit wages into a time-locked escrow. Workers can claim only after the release window passes — smart contract enforcement eliminates wage theft.

| Function | Auth | Description |
|---|---|---|
| `initialize(admin, usdc_token)` | None | Set admin and payment token |
| `deposit_escrow(employer, worker, amount, release_after_days)` | Employer | Lock wages for a specific worker |
| `claim_wages(worker)` → `i128` | Worker | Claim wages after time-lock expires |
| `get_escrow(worker)` → `EscrowRecord` | None | View escrow details |

**Data types:**
```rust
EscrowRecord {
    employer: Address,
    worker: Address,
    amount: i128,
    release_at: u64,
    is_released: bool,
    created_at: u64,
}
```

---

### 4. Merchant Payment Contract
**Path:** `contracts/contracts/merchant_payment/`

A lightweight payment processor for point-of-sale transactions. Customers pay merchants in USDC via a simple QR scan.

| Function | Auth | Description |
|---|---|---|
| `initialize(admin, usdc_token)` | None | Configure the payment contract |
| `pay_merchant(customer, merchant, amount)` | Customer | Transfer USDC directly to merchant |

**Events:** `(payment, success)` with `(customer, merchant, amount)` payload

---

## Backend API Reference

Base URL: `http://localhost:4000/api/v1`

### Authentication (SEP-10)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/challenge` | — | Generate SEP-10 challenge XDR |
| `POST` | `/auth/verify` | — | Verify signed challenge, receive JWT |

### Identity
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/identity/:address` | JWT | Fetch identity status and tier |
| `POST` | `/identity/verify-proof` | JWT | Submit and verify a ZK proof |

### Aid Disbursement
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/disburse/create` | JWT | Initiate a batch disbursement |
| `GET` | `/disburse/:id/status` | — | Check disbursement batch status |

### Payroll
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/payroll/escrow` | JWT | Create a new wage escrow |
| `POST` | `/payroll/claim` | JWT | Worker claims available wages |

### SMS Fallback
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/sms/initiate-transfer` | — | Trigger SMS-based transfer |

### Health
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | — | Service health check |

### Middleware Stack
| Middleware | Description |
|---|---|
| `auth.ts` | JWT verification via `jsonwebtoken` |
| `rateLimit.ts` | Request throttling via `express-rate-limit` |
| `validate.ts` | Request body validation via `zod` schemas |
| `errorHandler.ts` | Centralized error formatting |

---

## Database Schema

PostgreSQL managed via **Prisma ORM**.

```prisma
model User {
  id             String    @id @default(uuid())
  address        String    @unique        // Stellar public key
  role           Role      @default(REFUGEE)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  identityRecord Identity?
}

model Identity {
  id         String   @id @default(uuid())
  user       User     @relation(fields: [userId], references: [id])
  userId     String   @unique
  commitment String                       // ZK commitment hash
  isVerified Boolean  @default(false)
  issuedAt   DateTime
  expiresAt  DateTime
}

enum Role {
  REFUGEE
  NGO
  EMPLOYER
  MERCHANT
}
```

---

## Frontend Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, features, stats, CTA |
| `/onboard` | Wallet connection & role selection |
| `/dashboard` | Protected dashboard (role-specific views) |
| `/identity` | ZK identity registration & verification |
| `/send` | Send USDC payments |
| `/receive` | Receive payments / generate QR code |
| `/explore` | Network and transaction explorer |

### Key Libraries
- **Freighter API** — Stellar wallet connection
- **Framer Motion** — Premium animations
- **Zustand** — Lightweight state management
- **React Query** — Server state & caching
- **react-i18next** — Arabic + English localization

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Blockchain** | Stellar (Soroban) | Protocol 25 |
| **Smart Contracts** | Rust + `soroban-sdk` | WASM (`wasm32v1-none`) |
| **Frontend** | Next.js + React | 16.2.6 / 19.2.4 |
| **Styling** | Tailwind CSS | 4.x |
| **Backend** | Express + TypeScript | 5.x |
| **Database** | PostgreSQL + Prisma | 17 / 6.x |
| **Auth** | SEP-10 + JWT | — |
| **SMS** | Twilio | — |
| **Validation** | Zod | 3.x |
| **Package Manager** | pnpm (workspace) | 10.x |
| **CI/CD** | GitHub Actions | — |
| **Deployment** | Vercel (FE) + Docker | — |

---

## Getting Started

### Prerequisites

| Tool | Minimum Version | Install |
|---|---|---|
| Node.js | 20+ | [nodejs.org](https://nodejs.org) |
| pnpm | 9+ | `npm install -g pnpm` |
| Rust | 1.91+ | [rustup.rs](https://rustup.rs) |
| Stellar CLI | Latest | `cargo install --locked stellar-cli` |
| Docker | 24+ | [docker.com](https://docker.com) *(optional, for PostgreSQL)* |

### Installation

```bash
# Clone the repository
git clone https://github.com/stellar-rwa/havana-wallet.git
cd havana-wallet

# Install all workspace dependencies
pnpm install

# Generate Prisma client
cd backend && npx prisma generate && cd ..
```

### Environment Variables

Create `.env` files in both `frontend/` and `backend/` directories:

**`backend/.env`**
```env
# Server
NODE_ENV=development
PORT=4000

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/havana"

# Auth
JWT_SECRET=your_jwt_secret_here

# Stellar
STELLAR_NETWORK=TESTNET
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
HORIZON_URL=https://horizon-testnet.stellar.org

# Optional: SDP Integration
SDP_API_URL=https://sdp-api.stellar.org
SDP_API_KEY=your_sdp_key

# Optional: SMS Fallback
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
```

**`frontend/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_USDC_ISSUER=GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5
```

### Running Locally

```bash
# From root — start both services
pnpm run dev:frontend    # → http://localhost:3000
pnpm run dev:backend     # → http://localhost:4000
```

### Docker Deployment

Spin up the complete stack (frontend + backend + PostgreSQL) with one command:

```bash
docker-compose up -d
```

This creates:
- **Frontend** on port `3000`
- **Backend** on port `4000`
- **PostgreSQL 17** on port `5432` (data persisted via Docker volume)

---

## Smart Contract Development

### Building WASM Binaries

```bash
cd contracts

# Build all contracts
cargo build --release --target wasm32v1-none

# Compiled binaries are located at:
# target/wasm32v1-none/release/*.wasm
```

### Linting & Formatting

```bash
# From contracts/ directory
cargo clippy --all-targets      # Lint check
cargo fmt --all -- --check      # Format check
cargo test                      # Run unit tests
```

### Deploying to Testnet

```bash
# Deploy a single contract
stellar contract deploy \
  --wasm target/wasm32v1-none/release/refugee_identity.wasm \
  --source <YOUR_SECRET_KEY> \
  --network testnet

# Initialize after deployment
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source <YOUR_SECRET_KEY> \
  --network testnet \
  -- initialize \
  --admin <ADMIN_ADDRESS>
```

---

## Testing

```bash
# Smart contracts
cd contracts && cargo test

# Backend (from root)
pnpm run test:contracts

# Full audit suite (Clippy + Tests + Build)
pnpm run audit:all
```

---

## CI/CD Pipeline

Every PR triggers the **Stellar Audit Pipeline** (`.github/workflows/stellar-audit.yml`):

```
┌─────────────────────────────────────────────────┐
│                PR Opened / Updated               │
└──────────────────────┬──────────────────────────┘
                       │
          ┌────────────┼────────────────┐
          ▼            ▼                ▼
    ┌──────────┐ ┌──────────┐  ┌──────────────┐
    │  Clippy  │ │  Tests   │  │  WASM Build  │
    │  Lint    │ │  Suite   │  │  Validation  │
    └──────────┘ └──────────┘  └──────────────┘
          │            │                │
          └────────────┼────────────────┘
                       ▼
              ┌────────────────┐
              │  ✅ Merge OK   │
              │  ❌ Block PR   │
              └────────────────┘
```

**All three gates must pass** before a PR can be merged.

---

## Security

- **Non-Custodial**: Havana never stores or transmits private keys. All signing occurs in the user's [Freighter](https://freighter.app) wallet or via local encrypted storage.
- **ZK-First**: Personal identity data is never written to the blockchain. Only Poseidon hash commitments are stored on-chain.
- **Input Validation**: All API inputs are validated via Zod schemas before processing.
- **Rate Limiting**: API endpoints are protected against abuse via `express-rate-limit`.
- **Vulnerability Disclosure**: See [SECURITY.md](./SECURITY.md) for our responsible disclosure policy.

---

## Roadmap

- [x] **Phase 1** — Core Soroban contracts (Identity, Aid Vault, Payroll, Merchant)
- [x] **Phase 2** — pnpm monorepo migration and CI/CD pipeline
- [x] **Phase 3** — Premium landing page and frontend architecture
- [ ] **Phase 4** — Testnet deployment with live contract addresses
- [ ] **Phase 5** — NGO pilot program and SDP integration
- [ ] **Phase 6** — Mainnet launch, hardware wallet support, expanded SMS gateway

---

## Contributing

We welcome contributors of all experience levels. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Local development setup
- Coding standards and commit conventions
- PR review process

See our [Code of Conduct](./CODE_OF_CONDUCT.md) for community guidelines.

---

## License

Released under the [MIT License](./LICENSE).

---

<p align="center">
  <strong>Built with ❤️ for the Stellar ecosystem.</strong><br/>
  <em>Because financial access is a human right, not a privilege.</em>
</p>

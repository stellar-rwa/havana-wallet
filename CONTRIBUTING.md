# Contributing to Havana

Thank you for your interest in contributing to Havana! This project is part of the **Stellar Drip Wave** maintainer program.

## 🛠 Getting Started

### Prerequisites
- **Node.js** >= 22
- **Rust** >= 1.84.0 (with `wasm32v1-none` target)
- **Stellar CLI** v26+
- **Docker** (for PostgreSQL)

### Local Setup
1. Clone the repository.
2. Install dependencies (from root):
   ```bash
   pnpm install
   ```
3. Build the smart contracts:
   ```bash
   pnpm run build:contracts
   ```
4. Start the development environment:
   ```bash
   pnpm run dev:frontend
   pnpm run dev:backend
   ```

## 🧪 Testing & Quality
We maintain high standards for code quality. Before submitting a PR, ensure:
- **Contracts**: Run `cargo test` and `cargo clippy`.
- **Backend**: Ensure no TypeScript errors.
- **Frontend**: Verify the UI matches our glassmorphic design system.

## 🌊 Drip Wave Contributions
If you are contributing as part of the Stellar Drip Wave:
1. Look for issues labeled `stellar-wave`.
2. Comment on the issue to express interest.
3. Once assigned, follow the standard PR process.

## 📄 License
By contributing, you agree that your contributions will be licensed under the MIT License.

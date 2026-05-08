// frontend/src/lib/constants.ts
export const USDC_ASSET_CODE = "USDC";
export const USDC_ISSUER = process.env.NEXT_PUBLIC_USDC_ISSUER || "";

export const AID_TIERS = {
  BASIC: 1,
  STANDARD: 2,
  PRIORITY: 3,
};

export const IDENTITY_STATUS = {
  PENDING: 'Pending',
  VERIFIED: 'Verified',
  SUSPENDED: 'Suspended',
  EXPIRED: 'Expired',
};

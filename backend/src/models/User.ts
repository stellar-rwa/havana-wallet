// backend/src/models/User.ts
import { User as PrismaUser } from '../generated/client';
export type User = PrismaUser;
export interface UserProfile extends User {
  verifiedIdentity?: boolean;
}

// backend/src/models/Identity.ts
export interface Identity {
  id: string;
  userId: string;
  commitment: string;
  isVerified: boolean;
  tier: number;
}

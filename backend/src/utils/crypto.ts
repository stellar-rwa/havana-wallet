// backend/src/utils/crypto.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET || 'fallback_secret';

export class CryptoUtils {
  static async hash(data: string) {
    return await bcrypt.hash(data, SALT_ROUNDS);
  }

  static async compare(data: string, hash: string) {
    return await bcrypt.compare(data, hash);
  }

  static generateToken(payload: any) {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, SECRET);
  }
}

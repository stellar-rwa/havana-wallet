// backend/src/routes/identity.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/:address', authMiddleware, (_req, res) => {
  // Fetch identity from DB or Soroban
  res.json({ status: 'verified', tier: 2 });
});

router.post('/verify-proof', authMiddleware, (_req, res) => {
  // Verify ZK Proof
  res.json({ success: true });
});

export { router as identityRouter };

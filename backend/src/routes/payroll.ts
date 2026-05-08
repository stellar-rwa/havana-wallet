// backend/src/routes/payroll.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/escrow', authMiddleware, (_req, res) => {
  res.json({ status: 'escrow_initiated' });
});

router.post('/claim', authMiddleware, (_req, res) => {
  res.json({ status: 'wages_claimed' });
});

export { router as payrollRouter };


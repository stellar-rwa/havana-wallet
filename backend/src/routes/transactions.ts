import { Router } from 'express';

const router = Router();

router.get('/history/:address', (_req, res) => {
  res.json({ transactions: [] });
});

export { router as transactionsRouter };

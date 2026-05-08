// backend/src/routes/disburse.ts
import { Router } from 'express';

const router = Router();

router.get('/:id/status', (req, res) => {
  res.json({ id: req.params.id, status: 'SUCCESS', count: 1240 });
});

router.post('/create', (_req, res) => {
  res.json({ status: 'initiated', disbursementId: 'batch_99' });
});

export { router as disburseRouter };

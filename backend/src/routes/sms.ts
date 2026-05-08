import { Router } from 'express';

const router = Router();

router.post('/initiate-transfer', (_req, res) => {
  res.json({ status: 'sms_sent', fallback: 'initiated' });
});

export { router as smsRouter };

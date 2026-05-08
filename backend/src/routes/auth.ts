// backend/src/routes/auth.ts
import { Router } from 'express';

const router = Router();

router.post('/challenge', (_req, res) => {
  // SEP-10 Step 1: Generate challenge transaction
  res.json({ challenge: 'placeholder_xdr' });
});

router.post('/verify', (_req, res) => {
  // SEP-10 Step 2: Verify signed transaction and issue JWT
  res.json({ token: 'placeholder_jwt' });
});

export { router as authRouter };

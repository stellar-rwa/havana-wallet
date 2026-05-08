// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { identityRouter } from './routes/identity';
import { disburseRouter } from './routes/disburse';
import { payrollRouter } from './routes/payroll';
import { transactionsRouter } from './routes/transactions';
import { smsRouter } from './routes/sms';

const app = express();
const port = env.PORT;

app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (_req, res) => {
  res.json({
    name: 'Havana API',
    version: '1.0.0',
    status: 'Running',
    network: env.STELLAR_NETWORK,
    docs: '/api/v1/health'
  });
});

// Routes
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/identity', identityRouter);
app.use('/api/v1/disburse', disburseRouter);
app.use('/api/v1/payroll', payrollRouter);
app.use('/api/v1/transactions', transactionsRouter);
app.use('/api/v1/sms', smsRouter);

// Startup
async function startServer() {
  await connectDatabase();
  
  app.listen(port, () => {
    console.log(`✅ Havana Backend listening at http://localhost:${port}`);
    console.log(`🌍 Network: ${env.STELLAR_NETWORK}`);
  });
}

startServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

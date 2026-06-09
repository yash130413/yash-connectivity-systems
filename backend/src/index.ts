import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MUST be first before any other imports that use process.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'http';
import { validateEnv, getCorsOrigin, shouldTrustProxy } from './config/env.js';
import { connectToDatabase, closeDatabase, pingDatabase } from './db/connection.js';
import { globalRateLimiter } from './middleware/rateLimit.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import leadsRouter from './routes/leads.js';
import adminRouter from './routes/admin.js';
import adminLeadsRouter from './routes/adminLeads.js';
import productsRouter from './routes/products.js';
import analyticsRouter from './routes/analytics.js';

validateEnv();

const app = express();
const PORT = process.env.PORT || 3001;

if (shouldTrustProxy()) {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(cors({
  origin: getCorsOrigin(),
  credentials: true,
}));
app.use(globalRateLimiter);
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use('/api', leadsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin/leads', adminLeadsRouter);
app.use('/api/admin/analytics', analyticsRouter);
app.use('/api/products', productsRouter);

app.get('/health', async (_req, res) => {
  const dbHealthy = await pingDatabase();
  if (!dbHealthy) {
    res.status(503).json({
      status: 'error',
      message: 'Server is running but database is unavailable',
      database: 'disconnected',
    });
    return;
  }
  res.json({ status: 'ok', message: 'Server is running', database: 'connected' });
});

app.use(notFoundHandler);
app.use(errorHandler);

let server: Server;

async function shutdown(signal: string): Promise<void> {
  console.log(`Received ${signal}, shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      await closeDatabase();
      console.log('Server shut down complete');
      process.exit(0);
    });
    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  } else {
    await closeDatabase();
    process.exit(0);
  }
}

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer();

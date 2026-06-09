import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MUST be first before any other imports that use process.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import { connectToDatabase, closeDatabase } from './db/connection.js';
import leadsRouter from './routes/leads.js';
import adminRouter from './routes/admin.js';
import adminLeadsRouter from './routes/adminLeads.js';
import productsRouter from './routes/products.js';
import analyticsRouter from './routes/analytics.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use('/api', leadsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin/leads', adminLeadsRouter);
app.use('/api/admin/analytics', analyticsRouter);
app.use('/api/products', productsRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit(0);
});

startServer();

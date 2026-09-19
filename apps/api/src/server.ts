import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth';
import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';
import { authenticate } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for web and CMS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.WEB_ORIGIN,
  process.env.CMS_ORIGIN,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      return callback(null, true); // Dev convenience
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Serve static uploads
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Also serve web public images if requested through API
const webPublicImages = path.join(__dirname, '../../web/public/images');
app.use('/images', express.static(webPublicImages));

// Health Check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'imarka-api', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/admin', authenticate, adminRoutes);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 IMARKA MEGALO API server listening on http://localhost:${PORT}`);
  console.log(`📡 Public API: http://localhost:${PORT}/api/v1/public`);
  console.log(`🔐 Admin API: http://localhost:${PORT}/api/v1/admin`);
});

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth';
import { db } from './src/db';
import { cmsSettings, users, admins } from './src/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-dev';

  // Seed default admin if none exists
  try {
    const adminRows = await db.select().from(admins);
    if (adminRows.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await db.insert(admins).values({ username: 'admin', password: hash });
      console.log('Default admin seeded.');
    }
  } catch (err) {
    console.error('Failed to seed admin', err);
  }

  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const adminRows = await db.select().from(admins).where(eq(admins.username, username));
      if (adminRows.length === 0) {
        return res.status(401).json({ error: 'Username atau password salah' });
      }

      const admin = adminRows[0];
      const match = await bcrypt.compare(password, admin.password);
      
      if (!match) {
        return res.status(401).json({ error: 'Username atau password salah' });
      }

      const token = jwt.sign({ username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Public endpoint to get site data
  app.get('/api/site-data', async (req, res) => {
    try {
      const result = await db.select().from(cmsSettings).where(eq(cmsSettings.id, 'default'));
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.json(null);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Protected endpoint to update site data section
  app.post('/api/site-data', requireAuth, async (req: AuthRequest, res) => {
    try {
      const { section, data } = req.body;
      
      const current = await db.select().from(cmsSettings).where(eq(cmsSettings.id, 'default'));
      
      let updatePayload: any = {};
      
      if (current.length === 0) {
        // Initial insert
        updatePayload = { id: 'default', [section]: data };
        await db.insert(cmsSettings).values(updatePayload);
      } else {
        updatePayload = { [section]: data, updatedAt: new Date() };
        await db.update(cmsSettings).set(updatePayload).where(eq(cmsSettings.id, 'default'));
      }
      
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

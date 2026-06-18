import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-dev';
  
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
  }
  
  const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  // Seed default admin if none exists
  try {
    const { data: adminRows, error: findErr } = await supabase.from('admins').select('*');
    if (findErr) {
      console.warn("Supabase check failed (maybe tables not created yet).", findErr.message);
    } else if (adminRows && adminRows.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      const { error: insErr } = await supabase.from('admins').insert([{ username: 'admin', password: hash }]);
      if (insErr) {
        console.error("Failed to seed admin:", insErr);
      } else {
        console.log('Default admin seeded.');
      }
    }
  } catch (err) {
    console.error('Failed to seed admin', err);
  }

  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const { data: adminRows, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username);
        
      if (error || !adminRows || adminRows.length === 0) {
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
      const { data: result, error } = await supabase
        .from('cms_settings')
        .select('*')
        .eq('id', 'default');
      
      if (error) throw error;

      if (result && result.length > 0) {
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
      
      const { data: current, error: currentErr } = await supabase
        .from('cms_settings')
        .select('*')
        .eq('id', 'default');
        
      if (currentErr) throw currentErr;
      
      let updatePayload: any = {};
      
      if (!current || current.length === 0) {
        // Initial insert
        updatePayload = { id: 'default', [section]: data };
        const { error: insErr } = await supabase.from('cms_settings').insert([updatePayload]);
        if (insErr) throw insErr;
      } else {
        updatePayload = { [section]: data, updated_at: new Date().toISOString() };
        const { error: upErr } = await supabase
          .from('cms_settings')
          .update(updatePayload)
          .eq('id', 'default');
        if (upErr) throw upErr;
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

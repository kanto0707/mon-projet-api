import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import etudiantRoutes from './src/routes/etudiantRoutes';
import { checkConnection } from './src/config/db';

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === '123456') {
    const payload = { email };
    const secretKey = process.env.JWT_SECRET || 'fallback_secret';

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Identifiants invalides' });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API REST des étudiants',
    endpoints: ['/login', '/etudiants', '/etudiants/:id']
  });
});

app.use('/etudiants', etudiantRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur serveur' });
});

(async () => {
  try {
    await checkConnection();
    console.log('Connexion PostgreSQL OK');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.warn('Connexion PostgreSQL indisponible :', message);
  }

  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
})();
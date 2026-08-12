import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err);

  if (err?.code === '23505') {
    res.status(409).json({ error: 'Conflit de données : email déjà utilisé' });
    return;
  }

  if (err?.code === '23502') {
    res.status(400).json({ error: 'Données incomplètes...' });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Erreur serveur' });
}

import { Request, Response, NextFunction } from 'express';
import * as etudiantService from '../service/etudiantService';

export async function listEtudiants(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const etudiants = await etudiantService.getAllEtudiants();
    res.status(200).json(etudiants);
  } catch (err) {
    next(err);
  }
}

export async function showEtudiant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const etudiant = await etudiantService.getEtudiantById(id);
    if (!etudiant) {
      res.status(404).json({ error: 'Étudiant introuvable' });
      return;
    }
    res.status(200).json(etudiant);
  } catch (err) {
    next(err);
  }
}

export async function createEtudiant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { nom, prenom, email } = req.body || {};

    if (!nom || !prenom || !email) {
      res.status(400).json({ error: 'Nom, prénom et email sont requis' });
      return;
    }

    const etudiant = await etudiantService.createEtudiant({ nom, prenom, email });
    res.status(201).json(etudiant);
  } catch (err) {
    next(err);
  }
}

export async function updateEtudiant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const etudiant = await etudiantService.updateEtudiant(id, req.body);
    if (!etudiant) {
      res.status(404).json({ error: 'Étudiant introuvable' });
      return;
    }
    res.status(200).json(etudiant);
  } catch (err) {
    next(err);
  }
}

export async function deleteEtudiant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const etudiant = await etudiantService.deleteEtudiant(id);
    if (!etudiant) {
      res.status(404).json({ error: 'Étudiant introuvable' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

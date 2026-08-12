import * as etudiantRepository from '../repositories/etudiantRepository';
import { Etudiant } from '../model/etudiantModel';

export async function getAllEtudiants(): Promise<Etudiant[]> {
  return etudiantRepository.findAll();
}

export async function getEtudiantById(id: string): Promise<Etudiant | null> {
  return etudiantRepository.findById(id);
}

export async function createEtudiant(data: Etudiant): Promise<Etudiant> {
  return etudiantRepository.create(data);
}

export async function updateEtudiant(id: string, data: Etudiant): Promise<Etudiant | null> {
  return etudiantRepository.update(id, data);
}

export async function deleteEtudiant(id: string): Promise<Etudiant | null> {
  return etudiantRepository.remove(id);
}

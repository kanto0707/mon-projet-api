import { pool } from '../config/db';
import { Etudiant } from '../model/etudiantModel';

export async function findAll(): Promise<Etudiant[]> {
  const result = await pool.query('SELECT * FROM etudiants ORDER BY id ASC');
  return result.rows;
}

export async function findById(id: string): Promise<Etudiant | null> {
  const result = await pool.query('SELECT * FROM etudiants WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function create(data: Etudiant): Promise<Etudiant> {
  const { nom, prenom, email } = data;
  const result = await pool.query(
    'INSERT INTO etudiants (nom, prenom, email) VALUES ($1, $2, $3) RETURNING *',
    [nom, prenom, email]
  );
  return result.rows[0];
}

export async function update(id: string, data: Partial<Etudiant>): Promise<Etudiant | null> {
  const current = await findById(id);
  if (!current) return null;

  const nom = data.nom ?? current.nom;
  const prenom = data.prenom ?? current.prenom;
  const email = data.email ?? current.email;

  const result = await pool.query(
    'UPDATE etudiants SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING *',
    [nom, prenom, email, id]
  );
  return result.rows[0] || null;
}

export async function remove(id: string): Promise<Etudiant | null> {
  const result = await pool.query('DELETE FROM etudiants WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
}
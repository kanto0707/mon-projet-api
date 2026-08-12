import express from 'express';
import * as controller from '../controller/etudiantController';

const router = express.Router();

router.get('/', controller.listEtudiants);
router.get('/:id', controller.showEtudiant);
router.post('/', controller.createEtudiant);
router.put('/:id', controller.updateEtudiant);
router.patch('/:id', controller.updateEtudiant);
router.delete('/:id', controller.deleteEtudiant);

export default router;

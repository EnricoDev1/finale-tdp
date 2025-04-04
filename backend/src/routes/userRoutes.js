import express from 'express';
import { getUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/:id', getUserById);

export default router;
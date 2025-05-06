import express from 'express';
import { getUsers, getUserById } from '../controllers/userController.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getUsers);
router.post('/:id', authenticateToken, requireAdmin, getUserById);

export default router;
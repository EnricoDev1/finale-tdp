import express from 'express';
import { getPosts, getPostById, deletePostById, newPost } from '../controllers/blogController.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.delete('/posts/:id', authenticateToken, requireAdmin, deletePostById);
router.post('/new', authenticateToken, requireAdmin, newPost);

export default router;

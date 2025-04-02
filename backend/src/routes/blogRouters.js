import express from 'express';
import { getPosts, getPostById, deletePostById, newPost } from '../controllers/blogController.js';

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.delete('/posts/:id', deletePostById);
router.post('/new', newPost);

// TODO autenticazione e database

export default router;

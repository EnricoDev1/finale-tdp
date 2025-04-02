import express from 'express';
import userRoutes from './userRoutes.js';
import docsRouters from './docsRoutes.js';
import blogRouters from './blogRouters.js';
import authRouters from './authRouters.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/docs', docsRouters);
router.use('/blog', blogRouters);
router.use('/auth', authRouters);

export default router;

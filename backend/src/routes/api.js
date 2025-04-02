import express from 'express';
import userRoutes from './userRoutes.js';
import docsRouters from './docsRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/docs', docsRouters);

export default router;

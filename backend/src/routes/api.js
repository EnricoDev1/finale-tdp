import express from 'express';
import userRoutes from './userRoutes.js';
import docsRouters from './docsRoutes.js';
import blogRouters from './blogRouters.js'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/docs', docsRouters);
router.use('/blog', blogRouters); 

export default router;

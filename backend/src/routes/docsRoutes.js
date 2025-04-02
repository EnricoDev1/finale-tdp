import express from 'express';
import { displayMain } from '../controllers/docsController.js';

const router = express.Router();

router.get('/', displayMain);

export default router;

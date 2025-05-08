import { Router } from 'express';
import projectRoutes from './project.routes';
import skillRoutes from './skill.routes';
import contactRoutes from './contact.routes';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/contact', contactRoutes);

export default router; 
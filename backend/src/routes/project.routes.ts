import { Router } from 'express';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller';

const router = Router();

router
  .route('/')
  .get(getAllProjects)
  .post(createProject);

router
  .route('/:id')
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject);

export default router; 
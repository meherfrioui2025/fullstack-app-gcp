import { Router } from 'express';
import { createUserRules, updateUserRules } from '../middleware/validation';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUserRules, createUser);
router.put('/:id', updateUserRules, updateUser);
router.delete('/:id', deleteUser);

export default router;

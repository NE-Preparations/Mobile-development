import express from 'express';
import { register, login, getCurrentUser, updateProfile, changePassword } from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', auth, getCurrentUser);
router.put('/update-profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);

export default router;
import express from 'express';
import { authController } from '../controllers/AuthController.js';

const { register, login, forgotPassword, resetPassword } = authController;
const router = express.Router();

router.post('/auth/register', register);

router.post('/auth/login', login);

router.post('/auth/forgot-password', forgotPassword);

router.post('/auth/reset-password/:token', resetPassword);

export default router;
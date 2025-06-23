import express from 'express';
import * as authController from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// 公共路由
router.post('/register/send-code', authController.sendRegistrationCode);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-two-factor', authController.verifyTwoFactor);
router.post('/password-reset/send-code', authController.sendPasswordResetCode);
router.post('/password-reset', authController.resetPassword);

export default router; 
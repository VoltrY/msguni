import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth); // Tüm user route'ları için authentication gerekli

router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.patch('/status', userController.updateStatus);

export default router;
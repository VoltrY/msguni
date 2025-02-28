import { Router } from 'express';
import * as messageController from '../controllers/messageController.js';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { messageSchema } from '../validations/schemas.js';
import { upload } from '../config/multer.js';

const router = Router();

router.use(auth);

router.get('/channels/:channelId/messages', messageController.getMessages);
router.post('/channels/:channelId/messages',
  upload.array('attachments', 5),
  validate(messageSchema),
  messageController.createMessage
);
router.put('/messages/:id', validate(messageSchema), messageController.updateMessage);
router.delete('/messages/:id', messageController.deleteMessage);

export default router;
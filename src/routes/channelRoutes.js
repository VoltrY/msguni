import { Router } from 'express';
import * as channelController from '../controllers/channelController.js';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { channelSchema } from '../validations/schemas.js';

const router = Router();

router.use(auth);

router.get('/guilds/:guildId/channels', channelController.getChannels);
router.post('/guilds/:guildId/channels', validate(channelSchema), channelController.createChannel);
router.put('/channels/:id', validate(channelSchema), channelController.updateChannel);
router.delete('/channels/:id', channelController.deleteChannel);

export default router;
import { Router } from 'express';
import * as guildController from '../controllers/guildController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.post('/', guildController.createGuild);
router.get('/', guildController.getGuilds);
router.get('/:id', guildController.getGuild);
router.put('/:id', guildController.updateGuild);
router.delete('/:id', guildController.deleteGuild);

export default router;
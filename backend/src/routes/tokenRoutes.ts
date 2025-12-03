import {Router} from 'express';
import tokenController from '../controllers/tokenController';

const router= Router();

router.post('/', tokenController.createToken);
router.get('/', tokenController.getAllTokens)
router.put('/:id', tokenController.updateStatus)

export default router;
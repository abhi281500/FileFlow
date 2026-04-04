import express from 'express';  
import { uploadFile, getFiles, deleteFile, updateFile } from '../controller/upload.controller.js';
import { upload } from '../middleware/upload.middleware.js'; 
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/files',verifyJWT, upload.any(), uploadFile);

router.get('/files', verifyJWT, getFiles);
router.delete('/files/:fileId', verifyJWT, deleteFile);
router.put('/files/:fileId', verifyJWT, upload.any(), updateFile);

export default router;
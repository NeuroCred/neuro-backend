import express from 'express'
const router = express.Router()

import auth from './auth.js'
import fileRoutes from './fileRoutes.js'
import checkRoute from './checkRoute.js'
import loanRoutes from "./loanRoutes.js"; 


router.use('/auth', auth)
router.use ('/doc', fileRoutes);
router.use ('/check',checkRoute );
router.use('/loans',loanRoutes)


export default router;
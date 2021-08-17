import { dataValidation } from './../validators/dataValidator';
import { dataController } from './../controllers/dataController';
import express from 'express'

const router = express.Router()


router.get('/', dataController.index)
router.post('/', dataValidation, dataController.addData)


export default router
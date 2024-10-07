import express from 'express'

import RobohashesController from './robohashes.controller.js'

const router = express.Router()

router.route('/').get(RobohashesController.apiGetRobohashes) // (Only Get for now. no post, update, or delete)

export default router

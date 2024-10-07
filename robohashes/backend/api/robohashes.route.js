// Giovani Bergamasco
// 10/6/2024
// IT 302 451
// Phase 2 Read MongoDB Data using Node.js
// glb7@njit.edu
import express from 'express'

import RobohashesController from './robohashes.controller.js'

const router = express.Router()

router.route('/').get(RobohashesController.apiGetRobohashes) // (Only Get for now. no post, update, or delete)

export default router

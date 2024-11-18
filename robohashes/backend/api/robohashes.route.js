// Giovani Bergamasco
// 10/27/2024
// IT 302 451
// Phase 3 CUD MongoDB Data using Node.js
// glb7@njit.edu
import express from 'express'

import RobohashesController from './robohashes.controller.js'
import CommentsController from './comments.controller.js'

const router = express.Router()

router.route('/').get(RobohashesController.apiGetRobohashes)
router.route("/id/:id").get(RobohashesController.apiGetRobohashById)

router
  .route("/comment")
  .post(CommentsController.apiPostComment)
  .put(CommentsController.apiUpdateComment)
  .delete(CommentsController.apiDeleteComment)

export default router

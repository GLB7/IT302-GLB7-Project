// Giovani Bergamasco
// 10/27/2024
// IT 302 451
// Phase 3 CUD MongoDB Data using Node.js
// glb7@njit.edu
import CommentsDAO from '../dao/commentsDAO.js'

export default class CommentsController {
    // "XXX" = robohash & "YYY" = comment
    // Post
    static async apiPostComment(req,res,next){
        try{
            const robohashId = req.body.robohash_id 
            const comment = req.body.comment 
            const userInfo = {
                name: req.body.name, 
                _id: req.body.user_id 
            }
            const date = new Date() 

            const CommentResponse = await CommentsDAO.addComment(
                robohashId, // a.Unique Id associated with an "XXX" document
                userInfo, // c.User name & d.User Id
                comment, // b.Text
                date // 3.lastModified
            )
            res.json(CommentResponse)
        } catch (e){
            res.status(500).json({error: e.message})
        }
    }
    // Update
    static async apiUpdateComment(req, res, next) {
        try {
            const commentId = req.body.comment_id 
            const comment = req.body.comment 
            const date = new Date() // d.Addtitional
            const CommentResponse = await CommentsDAO.updateComment(
                commentId, // a.Unique Id associated with a previously created "YYY" document
                req.body.user_id, // c.User Id
                comment, // b.Text
                date // 3.lastModified
            )
            var { error } = CommentResponse
            if (error) {
                res.status.json({error})
            }
            if (CommentResponse.modifiedCount === 0) {
                throw new Error("Unable to update comment. User may not be original commenter.")
            }
            res.json(CommentResponse)
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
    // Delete
    static async apiDeleteComment(req, res, next) {
        try {
            const commentId = req.body.comment_id
            const userId = req.body.user_id
            const CommentResponse = await CommentsDAO.deleteComment(
                commentId, // a.Unique Id associated with a previously created "YYY" document
                userId, // b.User Id
            )
            res.json(CommentResponse)
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}
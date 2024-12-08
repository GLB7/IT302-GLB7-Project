// Giovani Bergamasco
// 10/27/2024
// IT 302 451
// Phase 3 CUD MongoDB Data using Node.js
// glb7@njit.edu
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let comments
export default class CommentsDAO {
    static async injectDB(conn) {
        if (comments) {
            return
        } try {
            comments = await conn.db(process.env.robohash_glb7_NS).collection('comments_glb7')
        } catch (e) {
            console.error(`unable to establish connection handle in commentsDAO: ${e}`)
        }
    }
    // create function
    static async addComment(robohashId, user, comment, date){
        try{
            const commentDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                comment: comment,
                robohash_id: ObjectId.createFromHexString(robohashId)
            }
            return await comments.insertOne(commentDoc)
        }catch(e){
            console.error(`unable to post comment: ${e}`)
            console.error(e)
            return {error: e}
        }
    }
    // modify function
    static async updateComment(commentId, userId, comment, date) {
        try {
            const updateResponse = await comments.updateOne(
                { user_id: userId, _id: ObjectId.createFromHexString(commentId) },
                { $set: { comment: comment, date: date } }
            )
            return updateResponse
        } catch (e) {
            console.error(`unable to update comment: ${e}`)
            console.error(e)
            return {error: e}
        }
    }
    // remove function
    static async deleteComment(commentId, userId) {
        try {
            const deleteResponse = await comments.deleteOne({
                _id: ObjectId.createFromHexString(commentId),
                user_id: userId,
            })
            return deleteResponse
        } catch (e) {
            console.error(`unable to delete comment: ${e}`)
            console.error(e)
            return {error: e.message}
        }
    }
}
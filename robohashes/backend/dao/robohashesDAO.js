import mongodb from "mongodb"
let robohashes
const ObjectId = mongodb.ObjectId

export default class RobohashesDAO {
    static async injectDB(conn) {
        if (robohashes) {
            return
        } try {
            robohashes = await conn.db(process.env.robohash_glb7_NS).collection('robohash_glb7')
        } catch (e) {
            console.error(`unable to connect in RobohashesDAO: ${e}`)
        }
    }

    static async getRobohashes({
        filters = null,
        page = 0,
        robohashesPerPage = 5,
    } = {}) {
        let query = {}
        if (filters) {
            if ("name" in filters) {
                query = { "name": { $eq: filters['name'] } }
            } else if ("set" in filters) {
                query = { "set": { $eq: filters['set'] } }
            } else if ("color" in filters) {
                query = { "color": { $eq: filters['color'] } }
            }
        }

        let cursor
        try {
            cursor = await robohashes
                .find(query)
                .limit(robohashesPerPage)
                .skip(robohashesPerPage * page)

            const robohashesList = await cursor.toArray()
            const totalNumRobohashes = await robohashes.countDocuments(query)
            return { robohashesList, totalNumRobohashes }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            console.error(e)
            return { robohashesList: [], totalNumRobohashes: 0 }
        }
    }
}

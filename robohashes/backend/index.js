// Giovani Bergamasco
// 10/27/2024
// IT 302 451
// Phase 3 CUD MongoDB Data using Node.js
// glb7@njit.edu
import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import RobohashesDAO from './dao/robohashesDAO.js'
import CommentsDAO from './dao/commentsDAO.js'

async function main() {
  dotenv.config()
  const client = new mongodb.MongoClient(process.env.robohash_glb7_DB_URI)
  const port = process.env.PORT || 8000
  try {
    await client.connect()
    await RobohashesDAO.injectDB(client)
    await CommentsDAO.injectDB(client)

    app.listen(port, () => {
      console.log('server is running on port:' + port);
    })
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}
main().catch(console.error)
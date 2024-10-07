import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import RobohashesDAO from './dao/robohashesDAO.js'

async function main() {
  dotenv.config()
  const client = new mongodb.MongoClient(process.env.robohash_glb7_DB_URI)
  const port = process.env.PORT || 8000
  try {
    await client.connect()
    await RobohashesDAO.injectDB(client)

    app.listen(port, () => {
      console.log('server is running on port:' + port);
    })
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}
main().catch(console.error)
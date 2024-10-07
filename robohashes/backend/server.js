import express from 'express'
import cors from 'cors'
import robohashes from './api/robohashes.route.js';


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/GLB7/robohashes", robohashes) // (Incudes UCID)

app.use('*', (req, res) => {
  res.status(404).json({ error: "not found" })
})

export default app
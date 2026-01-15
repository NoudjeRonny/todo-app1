import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import User from "./models/User.js"
import router from "./router/User.js"
dotenv.config() // ✅ MUST be at the very top

import connectDb from "./config/db.js"
const app = express()

app.use(cors())
app.use(express.json())
connectDb()
app.use("/user", router)

const port = process.env.PORT || 4001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

import * as path from 'path';
import { connectToServer } from './connect.js';
import express from 'express';
import cors from 'cors';
import expressRouter from './routes.js';
import dotenv from 'dotenv';

const app = express()
const PORT = 3000   

const __dirname = path.resolve()
console.log(`Current directory: ${__dirname}`)

dotenv.config({ path: path.resolve(__dirname, 'config.env') })

app.use(cors())
app.use(express.json())
app.use("/notes", expressRouter)

console.log(`Directory: ${path.resolve(__dirname, 'config.env')}`)
console.log(`Environment: ${process.env.NODE_ENV}`)

if (process.env.NODE_ENV == "production") {
    console.log("Production mode enabled")
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () =>  {
    connectToServer()
    console.log(`Server is running on port ${PORT}`)
})
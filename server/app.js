import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
const app = express()

 app.use(express.json())

const PORT = 9000;

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/post', postRoutes)

connectDB()
app.listen(PORT , () => console.log(`server running is on port ${PORT}`))
import express from 'express'

const userRoutes = express.Router()

 userRoutes.get('/', (req, res) =>{
    res.send("Welcome Mern Stack Project")
 })


export default userRoutes
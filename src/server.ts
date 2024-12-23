import express from "express"
import colors from "colors"
import swaggerUi from 'swagger-ui-express'
import swaggerSpect from "./config/swagger"

import router from "./router"

// database
import db from './config/db'

(async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green.bold("Database connection successfuly"));
    } catch (error) {
        //console.log(error);
        console.log(colors.red.bold("Error while connecting to database"))
    }
})()

const server = express()

// habilitar la lectura del body en json
server.use(express.json())

server.use('/api/v1', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect))

export default server
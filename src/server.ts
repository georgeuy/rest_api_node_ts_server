import express from "express"
import colors from "colors"
import router from "./router"

// database
import db from './config/db'

export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green.bold("Conexión a postgres exitosa"));
    } catch (error) {
        //console.log(error);
        console.log(colors.red.bold("Hubo un error al conectar a la base de datos de postgres"))
    }
}

connectDB()

const server = express()

// habilitar la lectura del body en json
server.use(express.json())

server.use('/api/v1', router)

export default server
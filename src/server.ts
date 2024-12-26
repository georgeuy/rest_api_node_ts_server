import express from "express"
import cors, { CorsOptions } from "cors"
import colors from "colors"
import router from "./router"

// database
import db from './config/db'
import morgan from "morgan"

(async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green.bold("Conexión a postgres exitosa"));
    } catch (error) {
        //console.log(error);
        console.log(colors.red.bold("Hubo un error al conectar a la base de datos de postgres"))
    }
})()

const corsOption: CorsOptions = {
    origin: (origin, cb)=>{
        if(origin === process.env.FRONTEND_URL){
            //permitir
            cb(null, true)
        }else{
            //denegar
            cb(new Error('CORS Error'))
        }
    }
}

const server = express()

// info requests
server.use(morgan('dev'))

// cors
server.use(cors(corsOption))

// habilitar la lectura del body en json
server.use(express.json())

server.use('/api/v1', router)

export default server
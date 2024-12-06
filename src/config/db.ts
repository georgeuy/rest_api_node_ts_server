import path from 'path'
import { Sequelize } from 'sequelize-typescript'

//const dirModels = __dirname + "/../models/**/*.ts"
const dirModels = path.join(__dirname, '..', 'models', '**', '*.ts')

const db = new Sequelize(
    process.env.DATABASE_URI!,
    {
        models: [dirModels]
    }
)
/*
    Para que TS reconozca los decoradores y nos deje compilar la app
    se deberá agregar en el tsconfig las siguientes opciones en compilerOptions
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
*/


// conexión con soporte para SSL (2 opciones)
// 1:  const db = new Sequelize('postgres://postgres:postgrespw@localhost:55000?ssl=true')
// 2: const db = new Sequelize('postgres://postgres:postgrespw@localhost:55000', { 
//     dialectOptions:{
//         ssl:{
//             require: false
//         }
//     }}
// )

export default db
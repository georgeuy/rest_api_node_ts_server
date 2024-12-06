import 'dotenv/config'
import colors from 'colors'
import server from "./server";

const PORT = process.env.port || 4000

server.listen(
    4000,
    async () => {
        console.log(colors.cyan.bold(`Server listen on port ${PORT}`))
    }
)
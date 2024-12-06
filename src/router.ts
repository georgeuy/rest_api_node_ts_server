import { Router } from "express"
import { postProduct } from "./handlers/product.handler"


const router = Router()

// routing

router.get('/', (req,res) => {
    res.send('GET')
})

router.post('/', postProduct)

router.put('/', (req,res) => {
    res.send('PUT')
})

router.patch('/', (req,res) => {
    res.send('PATCH')
})

router.delete('/', (req,res) => {
    res.send('DELETE')
})

export default router
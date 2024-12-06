import { Router } from "express"

import { postProduct, getProducts } from "./handlers/product.handler"
import { handleInputErrors } from "./middleware"


const router = Router()

// routing

const productsPrefix = '/products'

router.get(productsPrefix, getProducts)
router.post(productsPrefix,handleInputErrors,postProduct)

router.put(productsPrefix, (req,res) => {
    res.send('PUT')
})

router.patch(productsPrefix, (req,res) => {
    res.send('PATCH')
})

router.delete(productsPrefix, (req,res) => {
    res.send('DELETE')
})

export default router
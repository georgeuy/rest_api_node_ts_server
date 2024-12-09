import { Router } from "express"

import { postProduct, getProducts, putProduct, patchProduct, deleteProduct, getProductById } from "./handlers/product.handler"
import { handleInputErrors, validateIdProduct, validateCreateProduct, validateUpdateProduct } from "./middleware"


const router = Router()

// routing

const productsPrefix = '/products'

router.get(productsPrefix, getProducts)
router.get(`${productsPrefix}/:id`, validateIdProduct, handleInputErrors, getProductById)

router.post(productsPrefix, validateCreateProduct, handleInputErrors, postProduct)

router.put(`${productsPrefix}/:id`, validateIdProduct, validateUpdateProduct, handleInputErrors, putProduct)

router.patch(`${productsPrefix}/:id`, validateIdProduct, patchProduct)

router.delete(`${productsPrefix}/:id`, validateIdProduct, deleteProduct)

export default router
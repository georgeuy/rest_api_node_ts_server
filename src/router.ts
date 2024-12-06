import { Router } from "express"

import { postProduct } from "./handlers/product.handler"
import { body } from "express-validator"
import { handleInputErrors } from "./middleware"


const router = Router()

// routing

router.get('/', (req,res) => {
    res.send('GET')
})

router.post('/',

    body('name')
    .notEmpty().withMessage('El nombre del producto es requerido'), 
    
    body('price')
        .notEmpty().withMessage('El precio del producto es requerido')
        .custom( value => !isNaN (value) && value > 0 ).withMessage('Precio inválido'), 
    handleInputErrors,
    postProduct
)

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
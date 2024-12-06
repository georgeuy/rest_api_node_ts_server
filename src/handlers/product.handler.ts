import { Request, Response } from "express" 
import { check, validationResult } from 'express-validator'

import Product from "../models/product.models"

export const postProduct = async (req: Request, res:Response) => {
    
    //validación
    await check('name')
        .notEmpty()
        .withMessage('El nombre del producto es requerido')
        .run(req)
    
    await check('price')
        .notEmpty().withMessage('El precio del producto es requerido')
        .custom( value => !isNaN(value) && value > 0 ).withMessage('Precio inválido')
        .run(req)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //const product = await Product.create(req.body)
    const product = new Product(req.body)
    //await product.save()

    res.json({data: product})
}
import { Request, Response } from "express" 
import { validationResult } from 'express-validator'

import Product from "../models/product.models"

export const postProduct = async (req: Request, res:Response) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }

    //const product = new Product(req.body)
    //await product.save()

    const product = await Product.create(req.body)

    res.json({data: product})
}
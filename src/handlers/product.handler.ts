import { Request, Response } from "express" 

import Product from "../models/product.models"

export const postProduct = async (req: Request, res:Response) => {
    
    const product = await Product.create(req.body)
    res.json({data: product})

}
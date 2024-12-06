import { Request, Response } from "express" 

import Product from "../models/product.models"

export const getProducts = async (req: Request, res:Response) => {
    
    try {
        const products = await Product.findAll()
        res.json({data: products})
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:[{error: 'Ha ocurrido un error mientras se procesaba la petición'}]})
    }
}

export const postProduct = async (req: Request, res:Response) => {
    const product = await Product.create(req.body)
    res.json({data: product})
}
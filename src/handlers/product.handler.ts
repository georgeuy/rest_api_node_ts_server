import { Request, Response } from "express" 

import Product from "../models/product.models"
import {InputError, InputErrors} from '../types'


const productNotFound = (id:string): InputError[] => {
    return [{
        type: "field",
        value: id,
        msg: "Producto no existe",
        path: "id",
        location: "params"
    }]
    
}

const systemError = (path:string): InputError[] => {
    return [{
        type: "system",
        value: "unknow",
        msg: "Ha ocurrido un error mientras se procesaba la petición",
        path,
        location: "product.handler"
    }]
}

export const getProducts = async (req: Request, res:Response) => {
    try {
        const products = await Product.findAll({            
            //order:[['price', 'DESC']],
            //limit: 1,
            //attributes:{exclude:['createdAt', 'updatedAt']}
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
        const errors: InputError[] = systemError('getProducts')
        res.status(500).json({errors})
    }
}

export const getProductById = async (req: Request, res:Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
            const errors:InputError[] = productNotFound(id)
            res.status(404).json({errors})
        }else{
            res.json({data: product})
        }
    } catch (error) {
        console.log(error)
        const errors: InputError[] = systemError('getProductById')
        res.status(500).json({errors})
    }
}

export const postProduct = async (req: Request, res:Response) => {
    try{
        const product = await Product.create(req.body)
        res.json({data: product})
    }catch (error) {
        console.log(error)
        const errors: InputError[] = systemError('postProduct')
        res.status(500).json({errors})
    }
}

export const putProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
            const errors: InputError[] = productNotFound(id)
            res.status(404).json({errors})
        }else{
            // actualizar
            await product.update(req.body)
            res.json({data: product})
        }
    }catch (error) {
        console.log(error)
        const errors: InputError[] = systemError('putProduct')
        res.status(500).json({errors})
    }
}

export const patchProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
            const errors: InputError[] = productNotFound(id)
            res.status(404).json({errors})
        }else{
            // actualizar
            product.availability = !product.availability
            await product.save()
            res.json({data: product})
        }
    }catch (error) {
        console.log(error)
        const errors: InputError[] = systemError('patchProduct')
        res.status(500).json({errors})
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
            const errors: InputError[] = productNotFound(id)
            res.status(404).json({errors})
        }else{
            // delete product
            await product.destroy()
            res.send({data:product})
        }
    }catch (error) {
        console.log(error)
        const errors: InputError[] = systemError('deleteProduct')
        res.status(500).json({errors})
    }
}
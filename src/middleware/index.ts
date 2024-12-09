import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";


export const validateCreateProduct = ( async (req: Request, res: Response, next: NextFunction) => {
    await check('name')
        .notEmpty()
        .withMessage('El nombre del producto es requerido')
        .run(req) 
    
    await check('price')
        .notEmpty().withMessage('El precio del producto es requerido')
        .isFloat({gt: 0})
        .withMessage('Precio debe ser mayor a 0')
        .run(req)
    
    await check('availability')
        .optional()
        .isBoolean()
        .withMessage('La disponibilidad debe ser verdadera o falsa')
        .run(req)

    next()
})


export const validateIdProduct = ( async (req: Request, res: Response, next: NextFunction) => {
    await check('id')
        .isInt()
        .withMessage('Producto inválido')
        .run(req) 
    next()
})


export const validateUpdateProduct = ( async (req: Request, res: Response, next: NextFunction) => {
    await check('name')
        .optional()
        .notEmpty()
        .withMessage('El nombre del producto es requerido')
        .run(req) 
    
    await check('price')
        .optional()
        .notEmpty().withMessage('El precio del producto es requerido')
        .isFloat({gt: 0})
        .withMessage('El Precio debe ser mayor a 0')
        .run(req)
    
    await check('availability')
        .optional()
        .isBoolean()
        .withMessage('La disponibilidad debe ser verdadera o falsa')
        .run(req)

    next()
})


export const handleInputErrors = ((req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return
    }
    next()
})
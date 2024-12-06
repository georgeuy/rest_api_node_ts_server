import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const handleInputErrors = ( async (req: Request, res: Response, next: NextFunction) => {
    
    await check('name')
        .notEmpty()
        .withMessage('El nombre del producto es requerido')
        .run(req) 
    
    await check('price')
        .notEmpty().withMessage('El precio del producto es requerido')
        .custom( value => !isNaN (value) && value > 0 )
        .withMessage('Precio inválido')
        .run(req)
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return
    }

    next()
})
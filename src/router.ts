import { Router } from "express"

import { postProduct, getProducts, putProduct, patchProduct, deleteProduct, getProductById } from "./handlers/product.handler"
import { handleInputErrors, validateIdProduct, validateCreateProduct, validateUpdateProduct } from "./middleware"


const router = Router()


const productsPrefix = '/products'


/**
 * @swagger:
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name: 
 *                  type: string
 *                  description: The product name
 *                  example: Monitor de 50 pulgadas
 *              price: 
 *                  type: number
 *                  description: The product price
 *                  example: 680
 *              availability: 
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 */


/**
 * @swagger
 * /api/v1/products:
 *  get:
 *      summary: Get a list of product
 *      tags:
 *          - Products
 *      description: Return a product list
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product' 
 */
router.get(productsPrefix, getProducts)


/**
 * @swagger
 * /api/v1/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product' 
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad request, invalid ID
 *          500:
 *              description: Server failure
 */
router.get(`${productsPrefix}/:id`, validateIdProduct, handleInputErrors, getProductById)


/**
 * @swagger
 * /api/v1/products:
 *  post:
 *      summary: Create a new Product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Mouse wireless black
 *                          price:
 *                              type: number
 *                              example: 10.50
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request, invalid input data
 *          500:
 *              description: Server failure
 */
router.post(productsPrefix, validateCreateProduct, handleInputErrors, postProduct)


/**
 * @swagger:
 * /api/v1/products/{id}:
 *  put:
 *      summary:
 *      tags:
 *          - Products
 *      description: Return a product updated
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product for update
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Mouse wireless black
 *                          price:
 *                              type: number
 *                              example: 10.50
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product' 
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad request - invalid ID - invalid input data
 *          500:
 *              description: Server Failure
 */
router.put(`${productsPrefix}/:id`, validateIdProduct, validateUpdateProduct, handleInputErrors, putProduct)


/**
 * @swagger:
 * /api/v1/products/{id}:
 *  patch:
 *      summary:
 *      tags:
 *          - Products
 *      description: toggle product availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product for update
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product' 
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad request - invalid ID
 *          500:
 *              description: Server Failure
 */
router.patch(`${productsPrefix}/:id`, validateIdProduct, patchProduct)


/**
 * @swagger:
 * /api/v1/products/{id}:
 *  delete:
 *      summary:
 *      tags:
 *          - Products
 *      description: Delete a product in database
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product for delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product' 
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad request - invalid ID - invalid input data
 *          500:
 *              description: Server Failure
 */
router.delete(`${productsPrefix}/:id`, validateIdProduct, deleteProduct)


export default router
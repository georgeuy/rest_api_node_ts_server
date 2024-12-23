import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi:'3.0.2',
        tags:[
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info:{
            version:'1.0.0',
            title: 'REST API Node JS / Express / Typescript',
            description: 'API Docs for Products'
        }
   },
   apis:[
    './src/router.ts'
   ]
}

const swaggerSpect = swaggerJSDoc(options)

export default swaggerSpect
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestionare a Consultațiilor',
            version: '1.0.0',
            description: 'Un API pentru gestionarea consultațiilor medicale',
        },
        servers: [
            {
                url: 'http://localhost:3000', 
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;

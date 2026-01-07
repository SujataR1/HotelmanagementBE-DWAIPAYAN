const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel Management API",
      version: "1.0.0",
      description: "Swagger documentation"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["server/auth/auth.js"]
};

const swaggerSpace = swaggerJSDoc(options);

module.exports = swaggerSpace;





// const swaggerJSDoc = require("swagger-jsdoc");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Hotel Management API",
//       version: "1.0.0",
//       description: "Swagger documentation"
//     },
//     servers: [
//       {
//         url: "http://192.168.0.187:5000"
//       }
//     ]
//   },
//   apis: ["./auth/*.js"]
// };

// const swaggerSpace = swaggerJSDoc(options);

// module.exports = swaggerSpace;


const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Localhost"
      },
      {
        url: "http://192.168.0.187:5000",
        description: "LAN / Network"
      }
    ],
  },
  apis: ["./routes/*.js", "./auth/*.js"],
});

module.exports = swaggerSpec;



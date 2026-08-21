
import swaggerAutogen from "swagger-autogen"


const doc = {
    info:{
        title: "API de Clinica",
        description: "Documentacion generada por autogen",
        version: "1.0.0"
    },
  host: "c87k99jw-3000.brs.devtunnels.ms",
  basePath: "/",
  schemes: ["https"],
};

const outputFile = "../swagger-output.json"

const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc)


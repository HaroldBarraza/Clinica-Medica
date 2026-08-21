import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import express from "express";
import pacienteRouter from "./routes/paciente.route"
import swaggerUi from "swagger-ui-express";
import fs from 'node:fs';
import path from 'node:path';

const rl = readline.createInterface({ input, output });

const app = express();
const PORT = 3000;

app.use(express.json());

//routes
app.use("/api/pacientes", pacienteRouter);

//swagger
const swaggerFilePath = path.resolve('./src/swagger-output.json');

if (fs.existsSync(swaggerFilePath)) {
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Archivo swagger cargado, exitosamente!');
} else {
    console.log('Archivo swagger json, no encontrado');
}

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});





import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

import express from "express";
import pacienteRouter from "./routes/paciente.route"
import swaggerUi from "swagger-ui-express";
const rl = readline.createInterface({ input, output });

const app = express();
const PORT = 3000;

app.use(express.json());


app.use("/api/pacientes", pacienteRouter);

console.log("hola mundo")
rl.close();


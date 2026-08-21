import recetasrouter from "./routes/recetas.route";
import pacienteRouter from "./routes/paciente.route";
import citasRouter from "./routes/citas.route";

import express from "express";
import swaggerUi from "swagger-ui-express"
import fs from "node:fs"
import path from "node:path";


const app = express();
const PORT = 3000;

app.use(express.json());
const swaggerFilePath = path.resolve("./swagger-output.json");
if (fs.existsSync(swaggerFilePath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("archivo swagger-output.json no encontrado");
}

app.use("/api/recetas", recetasrouter);
app.use("/api/pacientes", pacienteRouter);
app.use("/api/citas", citasRouter)

app.listen(PORT, () => {
  console.log(`el servido esta corriendo en puerto http://localhost:${PORT}`);
});




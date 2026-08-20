import { Router } from "express";
import type { Request, Response} from "express";
import type { Paciente } from "../types/paciente.type";
import { pacientes } from "../data/paciente.data"

const router = Router();

// get para obtener todos los pacientes

router.get("/", (req: Request, res: Response) =>{
    res.status(200).json(pacientes);

});

//get para obtener un paciente por ID

router.get("/:id", (req:Request, res: Response) => {
  const id = Number(req.params.id);

  const paciente = pacientes.find((p) => 
    p.id === id
);

  if (!paciente) {
    return res.status(404).json({
      error: "Paciente no encontrado",
    });
  }

  res.status(200).json(paciente);
});

export default router;

//Post
router.post("/", (req: Request, res: Response) => {
  const { nombre, apellidos, edad, telefono, seguroMedico } = req.body;

  if (!nombre || !apellidos || !edad || !telefono) {
    return res.status(400).json({
      error: "Faltan datos",
    });
  }

  const nuevoPaciente: Paciente = {
    id: pacientes.length > 0
      ? pacientes.length + 1
      : 1,
    nombre,
    apellidos,
    edad,
    telefono,
    seguroMedico: seguroMedico ?? false,
  };

  pacientes.push(nuevoPaciente);

  res.status(201).json(nuevoPaciente);
});
// Delete

router.delete("/:id", function (req: Request, res: Response) {
  const idPacienteBuscado = Number(req.params.id);

  const index = pacientes.findIndex(function (p) {
    return p.id === idPacienteBuscado;
  });

  if (index === -1) {
    return res
      .status(404)
      .json({ error: "Paciente no encontrado, no se puede eliminar" });
  } else {
    const listaPacientes = pacientes.filter(
      (p) => p.id !== idPacienteBuscado,
    );

    pacientes.length = 0;
    pacientes.push(...listaPacientes);

    res.json({ mensaje: "registro de paciente eliminado exitosamente." });
  }
});


//put
router.put("/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);

  const index = pacientes.findIndex(function (p) {
    return p.id === idBuscado;
  });

  if (index === -1) {
    return res
      .status(404)
      .json({ error: "Paciente no encontrado" });
  } else {
    const {
      nombre,
      apellidos,
      edad,
      telefono,
      seguroMedico,
    } = req.body;

    pacientes[index] = {
      id: idBuscado,
      nombre: nombre ?? pacientes[index].nombre,
      apellidos: apellidos ?? pacientes[index].apellidos,
      edad: edad ?? pacientes[index].edad,
      telefono: telefono ?? pacientes[index].telefono,
      seguroMedico: seguroMedico ?? pacientes[index].seguroMedico,
    };

    res.json(pacientes[index]);
  }
});
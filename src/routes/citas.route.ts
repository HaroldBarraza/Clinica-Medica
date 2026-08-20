import { Router } from "express";
import type { Request, Response } from "express";
import {
  Citas,
  CitasFiltradas,
  CrearCita,
  ActualizarCita,
} from "../types/citas";
import { citas, setLista } from "../data/citas";

const router: Router = Router();

let id_autoincrement = 0;

router.get("/", (req: Request<{}, {}, CitasFiltradas>, res: Response) => {
  const { fecha_hora } = req.query;
  let respado_citas = [...citas];
  if (fecha_hora) {
    respado_citas = respado_citas.filter((fecha) => {
      return fecha.fecha_hora === fecha_hora;
    });
  }
  return res.json({ datos: respado_citas });
});

router.get("/:id", (req: Request, res: Response) => {
  const id_cita = Number(req.params.id);
  if (!id_cita) {
    res.status(400).json({ error: "ingrese un Id de cita valido" });
  }
  if (id_cita < 0 && id_cita > citas.length) {
    return res.status(404).json({ error: "el numero de cita no exite" });
  }
  const cita_econtrada = citas.find((cita) => {
    return cita.id === id_cita;
  });
  return res.json({ cita_econtrada });
});

router.post("/", (req: Request<{}, {}, CrearCita>, res: Response) => {
  const { paciente_id, medico_id, fecha_hora, motivo, estado } = req.body;
  if (!paciente_id || !medico_id || !fecha_hora) {
    return res.status(400).json({
      error: "los campos paciente_id, medico_id y fecha no puede estar vacios",
    });
  } else {
    const nueva_cita: Citas = {
      id: id_autoincrement++,
      paciente_id: paciente_id,
      medico_id: medico_id,
      fecha_hora: fecha_hora,
      motivo: motivo,
      estado: estado,
    };
    citas.push(nueva_cita);
    res.status(201).json({ estado: "la cita fue creada exitosamente" });
  }
});

router.put("/:id", (req: Request, res: Response) => {
  const id_cita = Number(req.query.id);
  const cita_encontrada = citas.findIndex((id) => {
    return id.id === id_cita;
  });
  if (cita_encontrada === -1) {
    return res.status(404).json({ error: "la cita que ingreso no existe" });
  } else {
    const {
      paciente_id,
      medico_id,
      fecha_hora,
      motivo,
      estado,
    }: ActualizarCita = req.body;
    citas[cita_encontrada] = {
      id: id_cita,
      paciente_id: paciente_id ?? citas[cita_encontrada].paciente_id,
      medico_id: medico_id ?? citas[cita_encontrada].medico_id,
      fecha_hora: fecha_hora ?? citas[cita_encontrada].fecha_hora,
      motivo: motivo ?? citas[cita_encontrada].motivo,
      estado: estado ?? citas[cita_encontrada].estado,
    };
    res.json(citas[cita_encontrada]);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id_eliminado = Number(req.params.id);
  const cita_econtrada = citas.findIndex((id) => {
    return id.id === id_eliminado;
  });
  if (cita_econtrada === -1) {
    res.status(404).json({ error: "el estudiante no fue encontrado" });
  } else {
    let nueva_cita = citas.filter((id) => {
      return id.id === id_eliminado;
    });
    setLista(nueva_cita);
    res.status(200).json({ mensaje: "se ilmino la cita con exito" });
  }
});

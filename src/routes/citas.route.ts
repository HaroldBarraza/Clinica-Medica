import { Router } from "express";
import { citas } from "../data/citas";

const router = Router();

// Obtener todas las citas
// También permite filtrar por fecha
router.get("/", (req, res) => {
  const { fecha } = req.query;

  if (fecha) {
    const citasFiltradas = citas.filter((cita) =>
      cita.fechaHora.startsWith(fecha as string),
    );

    return res.json(citasFiltradas);
  }

  return res.json(citas);
});

// Obtener una cita por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const cita = citas.find((cita) => cita.id === id);

  if (!cita) {
    return res.status(404).json({
      error: "Cita no encontrada",
    });
  }

  return res.json(cita);
});

export default router;

//POST

router.post("/", (req, res) => {
  const { pacienteId, medicoId, fechaHora, motivo } = req.body;

  if (!pacienteId || !medicoId || !fechaHora || !motivo) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios",
    });
  }

  const nuevaCita = {
    id: citas.length + 1,
    pacienteId,
    medicoId,
    fechaHora,
    motivo,
    estado: "confirmada" as const,
  };

  citas.push(nuevaCita);

  return res.status(201).json(nuevaCita);
});

// PUT

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const cita = citas.find((cita) => cita.id === id);

  if (!cita) {
    return res.status(404).json({
      error: "Cita no encontrada",
    });
  }

  const { pacienteId, medicoId, fechaHora, motivo, estado } = req.body;

  if (pacienteId !== undefined) {
    cita.pacienteId = pacienteId;
  }

  if (medicoId !== undefined) {
    cita.medicoId = medicoId;
  }

  if (fechaHora !== undefined) {
    cita.fechaHora = fechaHora;
  }

  if (motivo !== undefined) {
    cita.motivo = motivo;
  }

  if (estado !== undefined) {
    if (
      estado !== "confirmada" &&
      estado !== "cancelada" &&
      estado !== "completada"
    ) {
      return res.status(400).json({
        error: "Estado no válido",
      });
    }

    cita.estado = estado;
  }

  return res.json(cita);
});

// DELETE

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = citas.findIndex((cita) => cita.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: "Cita no encontrada",
    });
  }

  citas.splice(indice, 1);

  return res.status(204).send();
});

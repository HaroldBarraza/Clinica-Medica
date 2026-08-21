export interface Cita {
  id: number;
  pacienteId: number;
  medicoId: number;
  fechaHora: string;
  motivo: string;
  estado: "confirmada" | "cancelada" | "completada";
}

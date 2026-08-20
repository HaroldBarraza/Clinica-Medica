interface Citas {
  id: number;
  paciente_id: number;
  medico_id: number;
  fecha_hora: string;
  motivo: string;
  estado: string;
}

interface CitasFiltradas {
  paciente_id: number;
  medico_id: number;
  fecha_hora: string;
  motivo: string;
  estado: string;
}

interface CrearCita {
  paciente_id: number;
  medico_id: number;
  fecha_hora: string;
  motivo: string;
  estado: string;
}

interface ActualizarCita {
  paciente_id: number;
  medico_id: number;
  fecha_hora: string;
  motivo: string;
  estado: string;
}

export type { Citas, CitasFiltradas, CrearCita, ActualizarCita };

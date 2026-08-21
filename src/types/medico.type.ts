export interface Medico {
    id: number;
    nombre: string;
    especialidad: string;
    turno: string;
    activo: boolean;
    telefono?: string; 
}

interface Recetas{
    id: number,
    cita_id : number,
    medicamentos: string[],
    indicaciones: string,
    fecha_emision: string
}
interface recetasFiltradas{
    cita_id?: number
}
interface crearRecetas{
    cita_id: number,
    medicamentos:string[],
    indicaciones: string,
    fecha_emision: string
}
interface actualizarReceta{
    cita_id: number,
    medicamentos:string[],
    indicaciones: string,
    fecha_emision: string
}

export type{
    Recetas,
    recetasFiltradas,
    crearRecetas,
    actualizarReceta
}

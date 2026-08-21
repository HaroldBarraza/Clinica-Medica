import { Router } from "express";
import { Request, Response } from "express";
import { Recetas, recetasFiltradas, crearRecetas, actualizarReceta } from "../types/recetas";
import { recetas, setLista } from "../data/recetas";

const router:Router = Router()
let idincrement = 1

router.get("/", (req:Request<{},{}, recetasFiltradas>, res:Response) => {
/*  #swagger.tags = ['Recetas']
#swagger.summary = 'Obeter la lista de recetas'
#swagger.parameters['cita_id']{
in: 'query',
descriptiion: 'filtra por numero de cita',
type: 'integer'
}   
    
 */    const{cita_id} = req.query
    let resultados = [...recetas ]
        if(cita_id)
        resultados = resultados.filter((cita) => {
            return cita.cita_id === Number(cita_id)
        })
    return res.json({datos: resultados})
})

router.get("/:id", (req:Request, res:Response) => {
/* 
#swagger.tags = ['Recetas']
#swagger.summary = 'encutra recetas por el ID'
#swagger.parameter['id'] = {
in: 'path',
description: 'ID receta',
required: true,
type: 'integer'
}

  */   
    const receta_id = Number(req.params.id)
    if(isNaN(receta_id)){
        return res.status(400).json({error: "el ID tien que ser un numero"})
    }
    const encontrado = recetas.find((id) => {
        return id.id === receta_id
    })
    if(!encontrado){
        return res.status(404).json({error : "la receta no existe"})
    }
    return res.json({encontrado})
})

router.post("/" , (req:Request<{},{}, crearRecetas>, res:Response) => {
/* 
#swagger.tags = ['Recetas']
#swagger.summary = 'crea una nueva receta'
#swagger.parameters['body'] = {
in:'body',
description: 'Datos para crear una nueva receta',
required: true,
schema:{
cita_id: 1,
medicamentos: ['Ibuprofeno' ,'Paracetamol'],
indicaciones: 'tomar cada 8 horas',
fecha_emision: '11-07-2026'
}
}

  */   
    const {cita_id, medicamentos, indicaciones, fecha_emision} = req.body
    if(!cita_id || !indicaciones || !fecha_emision){
        return res.status(400).json({error: "todos los campos son obligatorios"})
    }
    if(isNaN(cita_id)){
        return res.status(400).json({error: "el id de la cita necesita ser un numero "})
    }
    const nuevareceta: Recetas = {
        id: idincrement++,
        cita_id,
        medicamentos: medicamentos ?? [],
        indicaciones,
        fecha_emision
    }
    recetas.push(nuevareceta)
    res.status(200).json({nuevareceta})
})

router.put("/:id", (req:Request, res:Response) => {
/* 
#swagger.tags = ['Recetas']
#swagger.summary = 'actualizar una receta segun el id'
#swagger.parameters['id'] = {
in: 'path',
description:'ID de receta que desea actualizar',
required: true,
type: 'integer'
}
#swagger.parameters['body'] = {
in: 'body',
description: 'Datos que desea actualizar',
required: true,
schema: {
cita_id: 1,
medicamentos: ['Ibuprofeno','Naproxeno'],
indicaciones: 'cada 3 horas por 5 dias',
fecha_emision: '21-02-2026'
}
}


  */   
    const buscado = Number(req.params.id)
    const posicion = recetas.findIndex((id) => {
        return id.id === buscado
    })
    if(posicion === -1){
        return res.status(404).json({error: "no exite la receta ingresada"})
    }else{
        const { cita_id, medicamentos, indicaciones,fecha_emision}: actualizarReceta = req.body
        recetas[posicion] = {
            id:buscado,
            cita_id: cita_id ?? recetas[posicion].cita_id,
            medicamentos: medicamentos ?? recetas[posicion].medicamentos,
            indicaciones: indicaciones ?? recetas[posicion].indicaciones,
            fecha_emision: fecha_emision ?? recetas[posicion].fecha_emision
        }
        res.json(recetas[posicion])
    }
})

router.delete("/:id", (req:Request, res:Response) => {
/* 
#swagger.tags = ['Recetas']
#swagger.summary = 'eliminar una recesta segun el ID'
#swagger.parameters['id'] = {
in: 'path',
description: 'ID de la receta que desea eliminar',
required: true,
type:'integer'
}
  */   
    const encontrar_id = Number(req.params.id)
    const encontrado = recetas.findIndex((id) => {
        return id.id === encontrar_id
    })
    if(encontrado === -1) {
        return res.status(404).json({error :"la receta no existe"})
    }else{
        let nueva = recetas.filter((d) => {
            return d.id !== encontrar_id
        })
        setLista(nueva)
        res.json({mesaje: "la recetta se elimino exitosamente"})
    }
})


export default router
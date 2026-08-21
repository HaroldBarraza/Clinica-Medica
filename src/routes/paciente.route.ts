import { Router } from "express";
import type { Request, Response} from "express";
import type { Paciente } from "../types/paciente.type";
import { pacientes } from "../data/paciente.data"

const router = Router();

// get para obtener todos los pacientes

router.get("/", (req: Request, res: Response) =>{
  /*
  #swagger.tags = ['Paciente']
  #swagger.summary = 'Obtener todos los pacientes'
  #swagger.description = 'Obtiene la lista completa de pacientes registrados.'

  #swagger.responses[200] = {
    description: 'Lista de pacientes obtenida correctamente',
    schema: [
      {
        id: 1,
        nombre: 'Ana',
        apellidos: 'Pérez',
        edad: 30,
        telefono: '099123456',
        seguroMedico: true
      },
      {
        id: 2,
        nombre: 'Carlos',
        apellidos: 'Gómez',
        edad: 45,
        telefono: '098765432',
        seguroMedico: false
      }
    ]
  }
*/
    res.status(200).json(pacientes);

});

//get para obtener un paciente por ID

router.get("/:id", (req:Request, res: Response) => {
   /*
   
    #swagger.tags = ['Paciente']
    #swagger.summary = 'Obtiene un paciente por su id'
    #swagger.description = 'Muestra la información del paciente especificado'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID del paciente',
    required: true,
    type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Registro de paciente encontrado exitosamente'
    }

    #swagger.responses[404] = {
      description: 'No existe un paciente con ese id'
    }

  */
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

//Post - crear un nuevo paciente
router.post("/", (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Paciente']
    #swagger.summary = 'Crear un nuevo paciente'
    #swagger.description = 'Registra un nuevo paciente en el sistema.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nombre: 'Ana',
        apellidos: 'Pérez',
        edad: 30,
        telefono: '099123456',
        seguroMedico: true
      }
    }

    #swagger.responses[201] = {
      description: 'Paciente creado exitosamente'
    }

    #swagger.responses[400] = {
      description: 'Faltan datos'
    }
  */
  const { nombre, apellidos, edad, telefono, seguroMedico } = req.body;

  if (!nombre || !apellidos || !edad || !telefono) {
    return res.status(400).json({
      error: "Faltan datos",
    });
  }
  
  const nuevoPaciente: Paciente = {
    id: pacientes.length > 0
      ? Math.max(...pacientes.map((p) => p.id)) + 1
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
// Delete -eliminar un registro de paciente

router.delete("/:id", function (req: Request, res: Response) {
   /*
    #swagger.tags = ['Paciente']
    #swagger.summary = 'Eliminar un registro'
    #swagger.description = 'Elimina un registro de paciente por su id.'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID del paciente que se desea eliminar',
    required: true,
    type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Registro de paciente eliminado correctamente'
      }

    #swagger.responses[404] = {
      description: 'No existe un paciente con ese id'
    }
  */
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


//put - modificar paciente
router.put("/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
   /*
    #swagger.tags = ['Paciente']
    #swagger.summary = 'Modificar registro de paciente'
    #swagger.description = 'Modifica los campos de un registro de paciente.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del paciente que se desea modificar',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    nombre: 'Ana',
    apellidos: 'Pérez',
    edad: 30,
    telefono: '099123456',
    seguroMedico: true
  }
}
    #swagger.responses[200] = {
      description: 'Paciente modificado correctamente'
    }
    #swagger.responses[404] = {
      description: 'Paciente no encontrado'
    }
    */
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

    res.status(200).json(pacientes[index]);
  }
});

export default router;
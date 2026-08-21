import { Router, Request, Response } from 'express';
import { medicos } from '../data/medico.data';
import { Medico } from '../types/medico.type';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const { especialidad } = req.query;
    
    if (especialidad) {
        const filtrados = medicos.filter(
            m => m.especialidad.toLowerCase() === (especialidad as string).toLowerCase()
        );
        return res.json(filtrados);
    }
    
    res.json(medicos);
});


router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const medico = medicos.find(m => m.id === id);
    
    if (!medico) {
        return res.status(404).json({ mensaje: "Médico no encontrado" });
    }
    
    res.json(medico);
});


router.post('/', (req: Request, res: Response) => {
    const { nombre, especialidad, turno, activo } = req.body;

    
    if (!nombre || !especialidad || !turno || activo === undefined) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios (nombre, especialidad, turno, activo)" });
    }

    const nuevoId = medicos.length > 0 ? Math.max(...medicos.map(m => m.id)) + 1 : 1;
    
    const nuevoMedico: Medico = {
        id: nuevoId,
        nombre,
        especialidad,
        turno,
        activo,
        telefono: req.body.telefono
    };

    medicos.push(nuevoMedico);
    res.status(201).json({ mensaje: "Médico registrado exitosamente", medico: nuevoMedico });
});


router.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const medico = medicos.find(m => m.id === id);

    if (!medico) {
        return res.status(404).json({ mensaje: "Médico no encontrado" });
    }

    const { turno, telefono, activo } = req.body;


    if (turno !== undefined) medico.turno = turno;
    if (telefono !== undefined) medico.telefono = telefono;
    if (activo !== undefined) medico.activo = activo;

    res.json({ mensaje: "Médico actualizado exitosamente", medico });
});


router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = medicos.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Médico no encontrado" });
    }

    medicos.splice(index, 1);
    res.json({ mensaje: "Médico eliminado exitosamente" });
});

export default router;
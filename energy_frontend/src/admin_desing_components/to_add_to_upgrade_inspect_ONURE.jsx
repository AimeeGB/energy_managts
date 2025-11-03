import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Add_Upgrade_Inspect_ONURE = () => {
    
    const estadoinicial = { id: 0, tipo_inspeccion: "ONURE", nombre_inpectores: "", deficiencias_violaciones: "", plan_acciones: ""};
    const history = useNavigate();
    const params = useParams();

    const API_URL = 'http://127.0.0.1:8000/api/inspecciones/';
    
    const [inspecciones,setInspeccion] = useState(estadoinicial);

    //constantes para validacion

    const [errors, setErrors] = useState({});

    const validationsForm = (inspecciones) => {
        let errors = [];
        let regexNombre = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
        let regexDescripcion = /^.{99,900000}$/;
        
        if (!inspecciones.nombre_inpectores.trim()) {
            errors.nombre_inpectores = "¡¡¡El Nombre es Requerido!!!";
        } else if (!regexNombre.test(inspecciones.nombre_inpectores.trim())) {
            errors.nombre_inpectores = "El campo Nombre solo acepta letras y espacios en blanco";
        }

        if (!inspecciones.deficiencias_violaciones.trim()) {
            errors.deficiencias_violaciones = "¡¡¡Los Apellidos son Requeridos!!!";
        } else if (!regexDescripcion.test(inspecciones.deficiencias_violaciones.trim())) {
            errors.deficiencias_violaciones = "El campo Apellidos solo acepta letras y espacios en blanco";
        }

        if (!inspecciones.plan_acciones.trim()) {
            errors.plan_acciones = "¡¡¡El descripcion es Requerido!!!";
        } else if (!regexDescripcion.test(inspecciones.plan_acciones.trim())) {
            errors.plan_acciones = "El campo descripcion solo acepta 200.000 caracteres";
        }

        return errors;
    };

    const handleInputChange = (e) => {
        setInspeccion({...inspecciones, [e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validationsForm(inspecciones));
        let errorr = validationsForm(inspecciones);
        if (Object.keys(errorr).length === 0) {
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('user_id')
            try {
                // let response;

                if (!params.id) {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                
                            "tipo_inspeccion":String(inspecciones.tipo_inspeccion).trim(),
                            "nombre_inpectores":String(inspecciones.nombre_inpectores).trim(),
                            "deficiencias_violaciones":String(inspecciones.deficiencias_violaciones).trim(),
                            "plan_acciones":String(inspecciones.plan_acciones).trim(),
                            "user_id":userId
                
                        })
                    });
                    const data = await response.json();
                    if (data.message === 'Success'){
                        setInspeccion(estadoinicial)
                    }
                }else{
                    await fetch(`${API_URL}${params.id}/`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                
                            "nombre_inpectores":String(inspecciones.nombre_inpectores).trim(),
                            "deficiencias_violaciones":String(inspecciones.deficiencias_violaciones).trim(),
                            "plan_acciones":String(inspecciones.plan_acciones).trim(),
                
                        })
                    });
                }
                history('/admin/dashboard/inspect');
            }   catch (error) {
                console.log(error);
            }

        } else {
            return;
        }
        
    };


    const getInspeccion = async (inspeccionId) => {
        const token = localStorage.getItem('token')
        try {
            const res = await fetch(`${API_URL}${inspeccionId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            const { nombre_inpectores, deficiencias_violaciones, plan_acciones } = data.inspeccion;
            setInspeccion({ nombre_inpectores, deficiencias_violaciones, plan_acciones });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getInspeccion(params.id);
        }
        // eslint-disable-next-line 
    }, []);

    return (
        <div className='container-fluid py-4'>
            <div className='row justify-content-center'>
                <div className='col-lg-6 col-md-8'>
                    <div className='card shadow-sm border-0'>
                        <div className='card-header bg-dark text-white'>
                            <h4 className='mb-0 text-center'>
                                {params.id ? 'Editar Reporte' : 'Agregar Reporte'}
                            </h4>
                        </div>
                        <div className='card-body p-4'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                    <label className='form-label fw-bold'>Nombre de los inspectores</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.nombre_inpectores ? 'is-invalid' : ''}`} 
                                        name="nombre_inpectores" 
                                        placeholder="Ingrese los nombres de los inspectores" 
                                        value={inspecciones.nombre_inpectores} 
                                        onChange={handleInputChange} 
                                    />
                                    {errors.nombre_inpectores &&
                                        <div className="invalid-feedback">{errors.nombre_inpectores}</div>}
                                </div>
                                
                                <div className='mb-4'>
                                    <label className='form-label fw-bold'>Deficiencias y violaciones detectadas</label>
                                    <textarea 
                                        className={`form-control ${errors.deficiencias_violaciones ? 'is-invalid' : ''}`} 
                                        rows={5} 
                                        name="deficiencias_violaciones" 
                                        placeholder="Describa las deficiencias encontradas..." 
                                        value={inspecciones.deficiencias_violaciones} 
                                        onChange={handleInputChange}
                                    ></textarea>
                                    {errors.deficiencias_violaciones &&
                                        <div className="invalid-feedback">{errors.deficiencias_violaciones}</div>}
                                </div>
                                
                                <div className='mb-4'>
                                    <label className='form-label fw-bold'>Plan de Acciones de Mejoras</label>
                                    <textarea 
                                        className={`form-control ${errors.plan_acciones ? 'is-invalid' : ''}`} 
                                        rows={5} 
                                        name="plan_acciones" 
                                        placeholder="Describa el plan de mejoras..." 
                                        value={inspecciones.plan_acciones} 
                                        onChange={handleInputChange}
                                    ></textarea>
                                    {errors.plan_acciones &&
                                        <div className="invalid-feedback">{errors.plan_acciones}</div>}
                                </div>
                                
                                <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-4'>
                                    <button 
                                        type='button' 
                                        className='btn btn-outline-secondary me-md-2'
                                        onClick={() => history('/admin/dashboard/inspect')}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type='submit' 
                                        className='btn btn-dark'
                                    >
                                        {params.id ? 'Actualizar' : 'Guardar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add_Upgrade_Inspect_ONURE
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';

// const Upgrade_Profile = () => {

//     const [perfil, setPerfil] = useState({
//         nombre: '',
//         apellido: '',
//         email: ''
//     })

//     // const estadoinicial = { id: 0, nombre: "", apellido: "", email: "", area: ""};
//     // const history = useNavigate();
//     // const params = useParams();

//     const API_URL = 'http://127.0.0.1:8000/api/client-profile/';
    

//     //constantes para validacion

//     // const [errors, setErrors] = useState({});

//     // const validationsForm = (clientes) => {
//     //     let errors = [];
//     //     let regexNombre = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
//     //     let regexDescripcion = /^.{9,900000}$/;
        
//     //     if (!clientes.nombre.trim()) {
//     //         errors.nombre = "¡¡¡El Nombre es Requerido!!!";
//     //     } else if (!regexNombre.test(clientes.nombre.trim())) {
//     //         errors.nombre = "El campo Nombre solo acepta letras y espacios en blanco";
//     //     }

//     //     if (!clientes.apellido.trim()) {
//     //         errors.apellido = "¡¡¡El Apellidos es Requerido!!!";
//     //     } else if (!regexNombre.test(clientes.apellido.trim())) {
//     //         errors.apellido = "El campo Apellidos solo acepta letras y espacios en blanco";
//     //     }

//     //     if (!clientes.area.trim()) {
//     //         errors.area = "¡¡¡El Area es Requerido!!!";
//     //     } else if (!regexNombre.test(clientes.area.trim())) {
//     //         errors.area = "El campo Area solo acepta letras y espacios en blanco";
//     //     }


//     //     return errors;
//     // };

//     useEffect(() => {
//         const fetchPerfil = async () => {
//         const token = localStorage.getItem('token') 
//         try {
//             // const token = localStorage.getItem('token') // Obtén el token del almacenamiento local
//             const response = await fetch(API_URL, {
//                 method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//             })
//             const data = await response.json()
//             setPerfil(data.cliente)
//           } catch (error) {
//             console.error(error)
//           }
//         }
    
//         fetchPerfil()
//       }, [])
    
//     const handleChange = (e) => {
//         setPerfil({
//             ...perfil,
//             [e.target.id]: e.target.value
//         })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const token = localStorage.getItem('token') 
//         try {
//             // const token = localStorage.getItem('token') // Obtén el token del almacenamiento local
//             await fetch(API_URL, {
//                 method: 'PUT',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     },
//                 body: JSON.stringify(perfil)
//             })
//             alert('Perfil actualizado exitosamente')
//         } catch (error) {
//             console.error(error)
//         }
//         window.location.reload();
//     }
    

//     return (
//         <>
//             <div className='col-md-5 col-12 mb-2'>
//                 <div className='card'>
//                     <h4 className='card-header'>Actualizar Perfil</h4>
//                     <div className='card-body'>
//                         <form onSubmit={handleSubmit}>
//                             <div className='mb-3'>
//                                 <label for='nombre' className='form-label'>Nombre</label>
//                                 <input type='text' className='form-control' required id="nombre" placeholder="Introduzca su nombre.." value={perfil.nombre} onChange={handleChange}></input>
//                             </div>
//                             <div className='mb-3'>
//                                 <label for='apellido' className='form-label'>Apellidos</label>
//                                 <input type='text' className='form-control' required id="apellido" placeholder="Introduzca su apellidos.." value={perfil.apellido} onChange={handleChange}></input>
//                             </div>
//                             <div className='mb-3'>
//                                 <label for='email' className='form-label'>Email</label>
//                                 <input type='email' className='form-control' required id="email" placeholder="Introduzca su correo.." value={perfil.email} onChange={handleChange}></input>
//                             </div>
                           
//                             <button type='submit' className='btn btn-dark'>Enviar</button>

//                             {/* {errors.nombre &&
//                                 <div className="alert alert-danger mt-2" role="alert">
//                                     {errors.nombre}</div>}
//                             {errors.apellido &&
//                                 <div className="alert alert-danger mt-2" role="alert">
//                                     {errors.apellido}</div>}
//                             {errors.area &&
//                                 <div className="alert alert-danger mt-2" role="alert">
//                                     {errors.area}</div>} */}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Upgrade_Profile

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upgrade_Profile = () => {
    const [perfil, setPerfil] = useState({
        nombre: '',
        apellido: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const API_URL = 'http://127.0.0.1:8000/api/client-profile/';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPerfil = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setPerfil(data.cliente);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPerfil();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
        
        if (!perfil.nombre.trim()) {
            newErrors.nombre = "El nombre es requerido";
        } else if (!nameRegex.test(perfil.nombre.trim())) {
            newErrors.nombre = "El nombre solo puede contener letras";
        }
        
        if (!perfil.apellido.trim()) {
            newErrors.apellido = "El apellido es requerido";
        } else if (!nameRegex.test(perfil.apellido.trim())) {
            newErrors.apellido = "El apellido solo puede contener letras";
        }
        
        if (!perfil.email.trim()) {
            newErrors.email = "El email es requerido";
        } else if (!/\S+@\S+\.\S+/.test(perfil.email)) {
            newErrors.email = "El email no es válido";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            const token = localStorage.getItem('token');
            try {
                await fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(perfil)
                });
                // navigate('/admin/dashboard?profile_updated=true');
                window.location.reload();
            } catch (error) {
                console.error(error);
                setIsSubmitting(false);
            }
        }
    };

    return (
        
          
                <div className='col-lg-5 col-md-6'>
                    <div className='card shadow-sm border-0'>
                        <div className='card-header bg-dark text-white'>
                            <h4 className='mb-0'>
                                <i className='bi bi-person-gear me-2'></i>
                                Actualizar Perfil
                            </h4>
                        </div>
                        <div className='card-body p-4'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                    <label className='form-label fw-bold'>Nombre</label>
                                    <input 
                                        type='text' 
                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                        id="nombre" 
                                        placeholder="Introduzca su nombre" 
                                        value={perfil.nombre} 
                                        onChange={(e) => setPerfil({...perfil, nombre: e.target.value})}
                                    />
                                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                                </div>
                                
                                <div className='mb-4'>
                                    <label className='form-label fw-bold'>Apellidos</label>
                                    <input 
                                        type='text' 
                                        className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                        id="apellido" 
                                        placeholder="Introduzca sus apellidos" 
                                        value={perfil.apellido} 
                                        onChange={(e) => setPerfil({...perfil, apellido: e.target.value})}
                                    />
                                    {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                                </div>
                                
                                <div className='mb-4'>
                                    <label className='form-label fw-bold'>Email</label>
                                    <input 
                                        type='email' 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email" 
                                        placeholder="Introduzca su correo electrónico" 
                                        value={perfil.email} 
                                        onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                               
                                <div className='d-flex justify-content-end mt-4'>
                                    {/* <button 
                                        type='button' 
                                        className='btn btn-outline-secondary me-3'
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancelar
                                    </button> */}
                                    <button 
                                        type='submit' 
                                        className='btn btn-dark'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Guardando...
                                            </>
                                        ) : 'Guardar Cambios'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
        
    );
};

export default Upgrade_Profile;
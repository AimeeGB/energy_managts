// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';

// const Add_Upgrade_Agreements = () => {
    
//     const estadoinicial = { id: 0, title: "", status: "", end_at: ""};
//     const history = useNavigate();
//     const params = useParams();

//     const API_URL = 'http://127.0.0.1:8000/api/acuerdos/';
    
//     const [acuerdos,setAcuerdos] = useState(estadoinicial);

//     //constantes para validacion

//     const [errors, setErrors] = useState({});

//     const validationsForm = (acuerdos) => {
//         let errors = [];
//         let regextitle = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
        
//         if (!acuerdos.title.trim()) {
//             errors.title = "¡¡¡El title es Requerido!!!";
//         } else if (!regextitle.test(acuerdos.title.trim())) {
//             errors.title = "El campo title solo acepta letras y espacios en blanco";
//         }

//         if (!acuerdos.status.trim()) {
//             errors.status = "¡¡¡Los statuss son Requeridos!!!";
//         } else if (!regextitle.test(acuerdos.status.trim())) {
//             errors.status = "El campo statuss solo acepta letras y espacios en blanco";
//         }
//         return errors;
//     };

//     const handleInputChange = (e) => {
//         setAcuerdos({...acuerdos, [e.target.name]:e.target.value});
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors(validationsForm(acuerdos));
//         let errorr = validationsForm(acuerdos);
//         if (Object.keys(errorr).length === 0) {
//             const token = localStorage.getItem('token')
//             const userId = localStorage.getItem('user_id')
//             try {
//                 // let response;

//                 if (!params.id) {
//                     const response = await fetch(API_URL, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             Authorization: `Bearer ${token}`
//                         },
//                         body: JSON.stringify({
                
//                             "title":String(acuerdos.title).trim(),
//                             "status":String(acuerdos.status).trim(),
//                             "end_at":String(acuerdos.end_at).trim(),
//                             "user_id":userId
                
//                         })
//                     });
//                     const data = await response.json();
//                     if (data.message === 'Success'){
//                         setAcuerdos(estadoinicial)
//                     }
//                 }else{
//                     await fetch(`${API_URL}${params.id}/`, {
//                         method: 'PUT',
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
                
//                             "title":String(acuerdos.title).trim(),
//                             "status":String(acuerdos.status).trim(),
//                             "end_at":String(acuerdos.end_at).trim(),
                
//                         })
//                     });
//                 }
//                 history('/agreements-sucess');
//             }   catch (error) {
//                 console.log(error);
//             }

//         } else {
//             return;
//         }
        
//     };

//     const getAcuerdos = async (acuerdoId) => {
//         const token = localStorage.getItem('token')
//         try {
//             const res = await fetch(`${API_URL}${acuerdoId}`,{
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             const data = await res.json();
//             const { title, status, end_at } = data.acuerdo;
//             setAcuerdos({ title, status, end_at });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (params.id) {
//             getAcuerdos(params.id);
//         }
//         // eslint-disable-next-line 
//     }, []);

//     return (
//         <div className='container-fluid py-4'>
//             <div className='row justify-content-center'>
//                 <div className='col-lg-6 col-md-8'>
//                     <div className='card shadow-sm border-0'>
//                         <div className='card-header bg-dark text-white'>
//                             <h4 className='mb-0 text-center'>
//                                 {params.id ? 'Editar Acuerdo' : 'Nuevo Acuerdo'}
//                             </h4>
//                         </div>
//                         <div className='card-body p-4'>
//                             <form onSubmit={handleSubmit}>
//                                 <div className='mb-4'>
//                                     <label className='form-label fw-bold'>Nombre del Acuerdo</label>
//                                     <input 
//                                         type="text" 
//                                         className={`form-control ${errors.title ? 'is-invalid' : ''}`}
//                                         name="title" 
//                                         placeholder="Ingrese el nombre del acuerdo" 
//                                         value={acuerdos.title} 
//                                         onChange={handleInputChange} 
//                                     />
//                                     {errors.title &&
//                                         <div className="invalid-feedback">{errors.title}</div>}
//                                 </div>
                                
//                                 <div className='mb-4'>
//                                     <label className='form-label fw-bold'>Estado</label>
//                                     <select 
//                                         className={`form-select ${errors.status ? 'is-invalid' : ''}`}
//                                         name="status" 
//                                         value={acuerdos.status} 
//                                         onChange={handleInputChange}
//                                     >
//                                         <option value="">Seleccione un estado</option>
//                                         <option value="Pendiente">Pendiente</option>
//                                         <option value="En Progreso">En Progreso</option>
//                                         <option value="Completado">Completado</option>
//                                     </select>
//                                     {errors.status &&
//                                         <div className="invalid-feedback">{errors.status}</div>}
//                                 </div>
                                
//                                 <div className='mb-4'>
//                                     <label className='form-label fw-bold'>Fecha de Expiración</label>
//                                     <input 
//                                         type="date" 
//                                         className={`form-control ${errors.end_at ? 'is-invalid' : ''}`}
//                                         name="end_at" 
//                                         value={acuerdos.end_at} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </div>
                                
//                                 <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-4'>
//                                     <button 
//                                         type='button' 
//                                         className='btn btn-outline-secondary me-md-2'
//                                         onClick={() => history('/agreements-sucess')}
//                                     >
//                                         Cancelar
//                                     </button>
//                                     <button 
//                                         type='submit' 
//                                         className='btn btn-dark'
//                                     >
//                                         {params.id ? 'Actualizar' : 'Guardar'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Add_Upgrade_Agreements

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import AgreementsSuccess from './agreements_sucess';

const Add_Upgrade_Agreements = () => {
  const estadoinicial = { id: 0, title: "", status: "", end_at: "" };
  const navigate = useNavigate();
  const params = useParams();
  const API_URL = 'http://127.0.0.1:8000/api/acuerdos/';
  const [acuerdos, setAcuerdos] = useState(estadoinicial);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validationsForm = (acuerdos) => {
    let errors = {};
    let regextitle = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
    
    if (!acuerdos.title.trim()) {
      errors.title = "El nombre del acuerdo es requerido";
    } else if (!regextitle.test(acuerdos.title.trim())) {
      errors.title = "El campo solo acepta letras y espacios en blanco";
    }

    if (!acuerdos.status.trim()) {
      errors.status = "El estado es requerido";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    setAcuerdos({...acuerdos, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validationsForm(acuerdos);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      try {
        if (!params.id) {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              "title": String(acuerdos.title).trim(),
              "status": String(acuerdos.status).trim(),
              "end_at": String(acuerdos.end_at).trim(),
              "user_id": userId
            })
          });
          const data = await response.json();
          if (data.message === 'Success') {
            setAcuerdos(estadoinicial);
            setShowSuccessModal(true);
          }
        } else {
          await fetch(`${API_URL}${params.id}/`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "title": String(acuerdos.title).trim(),
              "status": String(acuerdos.status).trim(),
              "end_at": String(acuerdos.end_at).trim(),
            })
          });
          setShowSuccessModal(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAcuerdos = async (acuerdoId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}${acuerdoId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      const { title, status, end_at } = data.acuerdo;
      setAcuerdos({ title, status, end_at });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getAcuerdos(params.id);
    }
  }, [params.id]);

  return (
    <div className='container-fluid py-4'>
      <AgreementsSuccess 
        show={showSuccessModal} 
        onHide={() => navigate('/admin/dashboard/agreements')} 
      />
      
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-8'>
          <div className='card shadow-sm border-0'>
            <div className='card-header bg-dark text-white'>
              <h4 className='mb-0 text-center'>
                <i className={`bi ${params.id ? 'bi-pencil-square' : 'bi-file-earmark-plus'} me-2`}></i>
                {params.id ? 'Editar Acuerdo' : 'Nuevo Acuerdo'}
              </h4>
            </div>
            <div className='card-body p-4'>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label className='form-label fw-bold'>Nombre del Acuerdo</label>
                  <input 
                      type="text" 
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      name="title" 
                      placeholder="Ingrese el nombre del acuerdo" 
                      value={acuerdos.title} 
                      onChange={handleInputChange} 
                  />
                    {errors.title &&
                        <div className="invalid-feedback">{errors.title}</div>}
                </div>
                
                <div className='mb-4'>
                    <label className='form-label fw-bold'>Estado</label>
                    <select 
                        className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                        name="status" 
                        value={acuerdos.status} 
                        onChange={handleInputChange}
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    {errors.status &&
                        <div className="invalid-feedback">{errors.status}</div>}
                </div>
                
                <div className='mb-4'>
                    <label className='form-label fw-bold'>Fecha de Expiración</label>
                    <input 
                        type="date" 
                        className={`form-control ${errors.end_at ? 'is-invalid' : ''}`}
                        name="end_at" 
                        value={acuerdos.end_at} 
                        onChange={handleInputChange} 
                    />
                </div>

                <div className='d-flex justify-content-end gap-2 mt-4'>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/admin/dashboard/agreements')}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    variant="dark" 
                    type="submit"
                  >
                    <i className={`bi ${params.id ? 'bi-check-lg' : 'bi-save'} me-1`}></i>
                    {params.id ? 'Actualizar' : 'Guardar'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_Upgrade_Agreements;
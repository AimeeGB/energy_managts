// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react';
// import Sidebar from './sidebar/sidebar';

// //import { ExportToExcelOrdenes } from '../export-excel/ExportExcel';

// const Agreements = (props) => {

//     // const baseUrl = 'http://127.0.0.1:8000/api';

//     // const API_URL = 'http://127.0.0.1:8000/api/acuerdos/';

//     const baseUrl = 'http://127.0.0.1:8000/api';
//     const API_URL = `${baseUrl}/acuerdos/`

//     useEffect(() => {
//         fetchData(baseUrl +'/acuerd');
//     },[]);

//     function fetchData(baseurl){
//         fetch(baseurl)
//         .then((response) => response.json())
//         // .then((data) => {
//         //     setTotalResults(data.count);
//         // });
//     }

//     const [acuerdos,setAcuerdos] = useState([])
//     const fileName = "Informe de Solicitudes";
//     const history = useNavigate();

//     const listAcuerdos = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const res = await fetch(API_URL, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const data = await res.json();
//             setAcuerdos(data.acuerdos);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         listAcuerdos();
//     }, []);

//     const handleDelete = async (id) => {
//         const token = localStorage.getItem('token');
//         await fetch(`${API_URL}${id}/`, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//         })
//         window.location.reload();
//     };
   
//     return (
//         <div className='container-fluid py-4'>
//             <div className='row'>

//                 <div className='col-md-3 col-12 mb-4'>
//                     <Sidebar/>
//                 </div>
                
//                 <div className='col-md-9 col-12'>
//                     <div className='card shadow-sm border-0'>
//                         <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
//                             <h5 className='mb-0'>Gestión de Acuerdos</h5>
//                             <Link to='/admin/dashboard/to_add_agreements' className='btn btn-light btn-sm'>
//                                 <i className='bi bi-plus-circle me-1'></i> Nuevo Acuerdo
//                             </Link>
//                         </div>
                        
//                         <div className='card-body'>
//                             <div className='table-responsive'>
//                                 <table className='table table-hover align-middle'>
//                                     <thead className='table-light'>
//                                         <tr>
//                                             <th width="5%">#</th>
//                                             <th>Nombre</th>
//                                             <th width="15%">Estado</th>
//                                             <th width="15%">Fecha Creación</th>
//                                             <th width="15%">Fecha Expiración</th>
//                                             <th width="15%">Acciones</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {acuerdos && acuerdos.length > 0 ? (
//                                             acuerdos.map((acuerdo, index) => (
//                                                 <tr key={index}>
//                                                     <td>{index + 1}</td>
//                                                     <td>
//                                                         <strong>{acuerdo.title}</strong>
//                                                     </td>
//                                                     <td>
//                                                         <span className={`badge ${acuerdo.status === 'Finalizado' ? 'bg-success' : 'bg-warning'}`}>
//                                                             {acuerdo.status}
//                                                         </span>
//                                                     </td>
//                                                     <td>{acuerdo.created_at}</td>
//                                                     <td>
//                                                         <span className={new Date(acuerdo.end_at) < new Date() ? 'text-danger' : ''}>
//                                                             {acuerdo.end_at}
//                                                         </span>
//                                                     </td>
//                                                     <td>
//                                                         <div className='d-flex gap-2'>
//                                                             <button 
//                                                                 onClick={() => history(`/admin/dashboard/to_upgrade_agreements/${acuerdo.id}`)} 
//                                                                 className='btn btn-sm btn-outline-dark'
//                                                                 title='Editar'
//                                                             >
//                                                                 <i className='bi bi-pencil'></i>
//                                                             </button>
//                                                             <button 
//                                                                 onClick={() => acuerdo.id && handleDelete(acuerdo.id)} 
//                                                                 className='btn btn-sm btn-outline-danger'
//                                                                 title='Eliminar'
//                                                             >
//                                                                 <i className='bi bi-trash'></i>
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="6" className='text-center py-4'>
//                                                     <i className='bi bi-inbox text-muted' style={{fontSize: '2rem'}}></i>
//                                                     <p className='mt-2'>No hay acuerdos registrados</p>
//                                                     <Link to='/admin/dashboard/to_add_agreements' className='btn btn-dark btn-sm'>
//                                                         Crear primer acuerdo
//                                                     </Link>
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
                        
//                         {/* <div className='card-footer bg-light'>
//                             <div className='d-flex justify-content-between align-items-center'>
//                                 <small className='text-muted'>
//                                     Mostrando {acuerdos.length} registros
//                                 </small>
//                                 <ExportToExcelOrdenes 
//                                     apiData={acuerdos} 
//                                     fileName="Informe_de_Acuerdos"
//                                     className="btn btn-success btn-sm"
//                                 />
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Agreements


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import { Modal, Button, Badge } from 'react-bootstrap';
import AgreementsSuccess from './agreements_sucess';

const Agreements = () => {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const API_URL = `${baseUrl}/acuerdos/`;
  const [acuerdos, setAcuerdos] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const listAcuerdos = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setAcuerdos(data.acuerdos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listAcuerdos();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    setShowSuccessModal(true);
    setTimeout(() => {
      listAcuerdos();
    }, 1000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completado':
        return 'success';
      case 'En Progreso':
        return 'warning';
      case 'Cancelado':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className='container-fluid py-4'>
      <AgreementsSuccess 
        show={showSuccessModal} 
        onHide={() => setShowSuccessModal(false)} 
      />
      
      <div className='row'>
        <div className='col-md-3 col-12 mb-4'>
          <Sidebar/>
        </div>
        
        <div className='col-md-9 col-12'>
          <div className='card shadow-sm border-0'>
            <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
              <h5 className='mb-0'>
                <i className='bi bi-file-earmark-text me-2'></i>
                Gestión de Acuerdos
              </h5>
              <Link to='/admin/dashboard/to_add_agreements' className='btn btn-light btn-sm'>
                <i className='bi bi-plus-circle me-1'></i> Nuevo Acuerdo
              </Link>
            </div>
            
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table table-hover align-middle'>
                  <thead className='table-light'>
                    <tr>
                      <th width="5%">#</th>
                      <th>Nombre</th>
                      <th width="15%">Estado</th>
                      <th width="15%">Fecha Creación</th>
                      <th width="15%">Fecha Expiración</th>
                      <th width="15%">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acuerdos && acuerdos.length > 0 ? (
                      acuerdos.map((acuerdo, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{acuerdo.title}</strong>
                          </td>
                          <td>
                            <Badge bg={getStatusBadge(acuerdo.status)} className="text-capitalize">
                              {acuerdo.status}
                            </Badge>
                          </td>
                          <td>{new Date(acuerdo.created_at).toLocaleDateString()}</td>
                          <td>
                            <span className={new Date(acuerdo.end_at) < new Date() ? 'text-danger' : ''}>
                              {new Date(acuerdo.end_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td>
                            <div className='d-flex gap-2'>
                              <button 
                                onClick={() => navigate(`/admin/dashboard/to_upgrade_agreements/${acuerdo.id}`)} 
                                className='btn btn-sm btn-outline-dark'
                                title='Editar'
                              >
                                <i className='bi bi-pencil'></i>
                              </button>
                              <button 
                                onClick={() => acuerdo.id && handleDelete(acuerdo.id)} 
                                className='btn btn-sm btn-outline-danger'
                                title='Eliminar'
                              >
                                <i className='bi bi-trash'></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className='text-center py-4'>
                          <i className='bi bi-inbox text-muted' style={{fontSize: '2rem'}}></i>
                          <p className='mt-2'>No hay acuerdos registrados</p>
                          <Link to='/admin/dashboard/to_add_agreements' className='btn btn-dark btn-sm'>
                            Crear primer acuerdo
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreements;
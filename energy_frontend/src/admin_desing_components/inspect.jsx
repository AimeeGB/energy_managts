// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Sidebar from './sidebar/sidebar';

// import { generarPdfInspeccion } from './service_api/generatePdf';

// const Inspect = () => {

//     const [inspecciones, setInspeccion] = useState([])
//     const history = useNavigate();

//     const [isLoading, setIsLoading] = useState(true);

//     const baseUrl = 'http://127.0.0.1:8000/api';
//     const API_URL = `${baseUrl}/inspecciones/`

//     const listInspecciones = async () => {
//         setIsLoading(true);
//         const token = localStorage.getItem('token');
//         try {
//             const res = await fetch(API_URL, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const data = await res.json();
//             setInspeccion(data.inspecciones);
//         } catch (error) {
//             console.log(error);
//         }
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         listInspecciones();
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

//     const exportarPdf = (inspeccion) => {
//         const doc = generarPdfInspeccion(inspeccion);
//         doc.save(`Inspecciones de la ${inspeccion.tipo_inspeccion}_(${inspeccion.inspeccion_time}).pdf`);
//     }

//     return (
//         <div className='container-fluid py-4'>
//             <div className='row'>
//                 <div className='col-md-3 col-12 mb-4'>
//                     <Sidebar />
//                 </div>

//                 <div className='col-md-9 col-12'>
//                     <div className='card shadow-sm border-0'>
//                         <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
//                             <h5 className='mb-0'>Inspecciones</h5>
//                             <div className='dropdown'>
//                                 <button className='btn btn-light btn-sm dropdown-toggle' type='button' data-bs-toggle='dropdown'>
//                                     <i className='bi bi-plus-circle me-1'></i> Agregar
//                                 </button>
//                                 <ul className='dropdown-menu dropdown-menu-end'>
//                                     <li><span className='dropdown-header'>Tipo de inspección</span></li>
//                                     <li><hr className='dropdown-divider' /></li>
//                                     <li>
//                                         <Link className='dropdown-item' to='/admin/dashboard/to_add_inspect/'>
//                                             <i className='bi bi-building me-2'></i>Empresa/Organismo
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link className='dropdown-item' to='/admin/dashboard/to_add_inspect_onure'>
//                                             <i className='bi bi-shield-check me-2'></i>ONURE
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>

//                         <div className='card-body'>
//                             {isLoading ? (
//                                 <div className='text-center py-5'>
//                                     <div className='spinner-border text-dark' role='status'>
//                                         <span className='visually-hidden'>Cargando...</span>
//                                     </div>
//                                 </div>
//                             ) : inspecciones && inspecciones.length > 0 ? (
//                                 <div className='row row-cols-1 row-cols-md-2 g-4'>
//                                     {inspecciones.map((inspeccion) => (
//                                         <div className='col' key={inspeccion.id}>
//                                             <div className='card h-100 shadow-sm'>
//                                                 <div className='card-header bg-light'>
//                                                     <div className='d-flex justify-content-between align-items-center'>
//                                                         <span className='badge bg-dark'>
//                                                             {inspeccion.tipo_inspeccion}
//                                                         </span>
//                                                         <small className='text-muted'>
//                                                             {inspeccion.inspeccion_time}
//                                                         </small>
//                                                     </div>
//                                                     <h6 className='mt-2 mb-0'>
//                                                         <i className='bi bi-person-check me-2'></i>
//                                                         {inspeccion.nombre_inpectores}
//                                                     </h6>
//                                                 </div>

//                                                 {/* <div className='card-body'>
//                                                     <div className="accordion accordion-flush" id={`accordion-${inspeccion.id}`}>
//                                                         <div className="accordion-item">
//                                                             <h2 className="accordion-header">
//                                                                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseDeficiencias-${inspeccion.id}`}>
//                                                                     <i className='bi bi-exclamation-triangle me-2'></i>Deficiencias
//                                                                 </button>
//                                                             </h2>
//                                                             <div id={`collapseDeficiencias-${inspeccion.id}`} className="accordion-collapse collapse" data-bs-parent={`#accordion-${inspeccion.id}`}>
//                                                                 <div className="accordion-body">
//                                                                     {inspeccion.deficiencias_violaciones}
//                                                                 </div>
//                                                             </div>
//                                                         </div>

//                                                         <div className="accordion-item">
//                                                             <h2 className="accordion-header">
//                                                                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapsePlan-${inspeccion.id}`}>
//                                                                     <i className='bi bi-clipboard-check me-2'></i>Plan de Mejoras
//                                                                 </button>
//                                                             </h2>
//                                                             <div id={`collapsePlan-${inspeccion.id}`} className="accordion-collapse collapse" data-bs-parent={`#accordion-${inspeccion.id}`}>
//                                                                 <div className="accordion-body">
//                                                                     {inspeccion.plan_acciones}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div> */}

//                                                 <div className='card-body'>
//                                                     <div className='mb-3'>
//                                                         <h6 className='d-flex align-items-center'>
//                                                             <i className='bi bi-exclamation-triangle me-2'></i>
//                                                             Deficiencias
//                                                         </h6>
//                                                         <p className='ms-4 mb-0' style={{ whiteSpace: 'pre-line' }}>
//                                                             {inspeccion.deficiencias_violaciones}
//                                                         </p>
//                                                     </div>
//                                                     <div>
//                                                         <h6 className='d-flex align-items-center'>
//                                                             <i className='bi bi-clipboard-check me-2'></i>
//                                                             Plan de Mejoras
//                                                         </h6>
//                                                         <p className='ms-4 mb-0' style={{ whiteSpace: 'pre-line' }}>
//                                                             {inspeccion.plan_acciones}
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 <div className='card-footer bg-transparent border-top-0'>
//                                                     <div className='d-flex justify-content-end gap-2'>
//                                                         <button
//                                                             onClick={() => exportarPdf(inspeccion)}
//                                                             className='btn btn-sm btn-outline-dark'
//                                                             title='Exportar PDF'
//                                                         >
//                                                             <i className='bi bi-file-earmark-pdf'></i>
//                                                         </button>
//                                                         <button
//                                                             onClick={() => history(`/admin/dashboard/to_upgrade_inspect/${inspeccion.id}`)}
//                                                             className='btn btn-sm btn-outline-secondary'
//                                                             title='Editar'
//                                                         >
//                                                             <i className='bi bi-pencil'></i>
//                                                         </button>
//                                                         <button
//                                                             onClick={() => inspeccion.id && handleDelete(inspeccion.id)}
//                                                             className='btn btn-sm btn-outline-danger'
//                                                             title='Eliminar'
//                                                         >
//                                                             <i className='bi bi-trash'></i>
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className='text-center py-5'>
//                                     <i className='bi bi-inbox text-muted' style={{ fontSize: '3rem' }}></i>
//                                     <p className='mt-3'>No hay inspecciones registradas</p>
//                                     <Link to='/admin/dashboard/to_add_inspect/' className='btn btn-dark mt-2'>
//                                         Crear primera inspección
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )


// }

// export default Inspect

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import { generarPdfInspeccion } from './service_api/generatePdf';
import { Modal, Button } from 'react-bootstrap';

const Inspect = () => {
    const [inspecciones, setInspeccion] = useState([]);
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const baseUrl = 'http://127.0.0.1:8000/api';
    const API_URL = `${baseUrl}/inspecciones/`;

    const listInspecciones = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            setInspeccion(data.inspecciones);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        listInspecciones();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await fetch(`${API_URL}${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        window.location.reload();
    };

    const exportarPdf = (inspeccion) => {
        const doc = generarPdfInspeccion(inspeccion);
        doc.save(`Inspecciones de la ${inspeccion.tipo_inspeccion}_(${inspeccion.inspeccion_time}).pdf`);
    };

    const truncateText = (text, maxWords) => {
        if (!text) return '';
        const words = text.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return text;
    };

    const hasLongText = (inspeccion) => {
        const deficienciasWords = inspeccion.deficiencias_violaciones ? inspeccion.deficiencias_violaciones.split(' ').length : 0;
        const planAccionesWords = inspeccion.plan_acciones ? inspeccion.plan_acciones.split(' ').length : 0;
        return deficienciasWords > 40 || planAccionesWords > 40;
    };

    const handleShowMore = (inspeccion) => {
        setSelectedInspection(inspeccion);
        setShowModal(true);
    };

    return (
        <div className='container-fluid py-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-4'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12'>
                    <div className='card shadow-sm border-0'>
                        <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                            <h5 className='mb-0'>Inspecciones</h5>
                            <div className='dropdown'>
                                <button className='btn btn-light btn-sm dropdown-toggle' type='button' data-bs-toggle='dropdown'>
                                    <i className='bi bi-plus-circle me-1'></i> Agregar
                                </button>
                                <ul className='dropdown-menu dropdown-menu-end'>
                                    <li><span className='dropdown-header'>Tipo de inspección</span></li>
                                    <li><hr className='dropdown-divider' /></li>
                                    <li>
                                        <Link className='dropdown-item' to='/admin/dashboard/to_add_inspect/'>
                                            <i className='bi bi-building me-2'></i>Empresa/Organismo
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item' to='/admin/dashboard/to_add_inspect_onure'>
                                            <i className='bi bi-shield-check me-2'></i>ONURE
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='card-body'>
                            {isLoading ? (
                                <div className='text-center py-5'>
                                    <div className='spinner-border text-dark' role='status'>
                                        <span className='visually-hidden'>Cargando...</span>
                                    </div>
                                </div>
                            ) : inspecciones && inspecciones.length > 0 ? (
                                <div className='row row-cols-1 row-cols-md-2 g-4'>
                                    {inspecciones.map((inspeccion) => (
                                        <div className='col' key={inspeccion.id}>
                                            <div className='card h-100 shadow-sm'>
                                                <div className='card-header bg-light'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <span className='badge bg-dark'>
                                                            {inspeccion.tipo_inspeccion}
                                                        </span>
                                                        <small className='text-muted'>
                                                            {inspeccion.inspeccion_time}
                                                        </small>
                                                    </div>
                                                    <h6 className='mt-2 mb-0'>
                                                        <i className='bi bi-person-check me-2'></i>
                                                        {inspeccion.nombre_inpectores}
                                                    </h6>
                                                </div>
                                                <div className='card-body'>
                                                    <div className='mb-3'>
                                                        <h6 className='d-flex align-items-center'>
                                                            <i className='bi bi-exclamation-triangle me-2'></i>
                                                            Deficiencias
                                                        </h6>
                                                        <p className='ms-4 mb-0' style={{ whiteSpace: 'pre-line' }}>
                                                            {truncateText(inspeccion.deficiencias_violaciones, 40)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h6 className='d-flex align-items-center'>
                                                            <i className='bi bi-clipboard-check me-2'></i>
                                                            Plan de Mejoras
                                                        </h6>
                                                        <p className='ms-4 mb-0' style={{ whiteSpace: 'pre-line' }}>
                                                            {truncateText(inspeccion.plan_acciones, 40)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='card-footer bg-transparent border-top-0'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        {/* {hasLongText(inspeccion) && (
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                onClick={() => handleShowMore(inspeccion)}
                                                            >
                                                                <i className='bi bi-arrows-angle-expand me-1'></i> Mostrar más
                                                            </Button>
                                                        )} */}
                                                        <div className='d-flex gap-2'>
                                                            <button onClick={() => exportarPdf(inspeccion)} className='btn btn-sm btn-outline-dark' title='Exportar PDF'>
                                                                <i className='bi bi-file-earmark-pdf'></i>
                                                            </button>
                                                            <button onClick={() => history(`/admin/dashboard/to_upgrade_inspect/${inspeccion.id}`)} className='btn btn-sm btn-outline-secondary' title='Editar'>
                                                                <i className='bi bi-pencil'></i>
                                                            </button>
                                                            <button onClick={() => inspeccion.id && handleDelete(inspeccion.id)} className='btn btn-sm btn-outline-danger' title='Eliminar'>
                                                                <i className='bi bi-trash'></i>
                                                            </button>
                                                        </div>
                                                        {hasLongText(inspeccion) && (
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                onClick={() => handleShowMore(inspeccion)}
                                                            >
                                                                <i className='bi bi-arrows-angle-expand me-1'></i> Mostrar más
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-5'>
                                    <i className='bi bi-inbox text-muted' style={{ fontSize: '3rem' }}></i>
                                    <p className='mt-3'>No hay inspecciones registradas</p>
                                    <Link to='/admin/dashboard/to_add_inspect/' className='btn btn-dark mt-2'>
                                        Crear primera inspección
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-screen Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                fullscreen
            >
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>
                        Detalles completos de la inspección - {selectedInspection?.tipo_inspeccion}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInspection && (
                        <div className="container py-3">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5 className="d-flex align-items-center">
                                        <i className="bi bi-calendar me-2"></i>
                                        Fecha: {selectedInspection.inspeccion_time}
                                    </h5>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="d-flex align-items-center">
                                        <i className="bi bi-person-check me-2"></i>
                                        Inspectores: {selectedInspection.nombre_inpectores}
                                    </h5>
                                </div>
                            </div>

                            <div className="card mb-4">
                                <div className="card-header bg-light">
                                    <h5 className="mb-0 d-flex align-items-center">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        Deficiencias
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <p style={{ whiteSpace: 'pre-line' }}>
                                        {selectedInspection.deficiencias_violaciones}
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header bg-light">
                                    <h5 className="mb-0 d-flex align-items-center">
                                        <i className="bi bi-clipboard-check me-2"></i>
                                        Plan de Mejoras
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <p style={{ whiteSpace: 'pre-line' }}>
                                        {selectedInspection.plan_acciones}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Inspect;
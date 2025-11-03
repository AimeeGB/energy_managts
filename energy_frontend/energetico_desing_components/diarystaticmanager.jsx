// // StaticAreasManagement.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Badge,
//   Alert
// } from 'react-bootstrap';
// import { FaEdit, FaTrash, FaPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa';

// const StaticAreasManagement = () => {
//   const [areas, setAreas] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingArea, setEditingArea] = useState(null);
//   const [formData, setFormData] = useState({
//     nombre: '',
//     plan_mes: '',
//     activa: true,
//     orden: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

//   // Cargar áreas estáticas
//   const loadAreas = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/areas-estaticas/`);
//       if (response.ok) {
//         const data = await response.json();
//         setAreas(data);
//       } else {
//         setError('Error al cargar las áreas');
//       }
//     } catch (error) {
//       setError('Error de conexión');
//     }
//   };

//   useEffect(() => {
//     loadAreas();
//   }, []);

//   // Guardar área
//   const saveArea = async () => {
//     try {
//       const url = editingArea 
//         ? `${API_BASE_URL}/areas-estaticas/${editingArea.id}/`
//         : `${API_BASE_URL}/areas-estaticas/`;
      
//       const method = editingArea ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       if (response.ok) {
//         setSuccess(editingArea ? 'Área actualizada correctamente' : 'Área creada correctamente');
//         setShowModal(false);
//         setEditingArea(null);
//         setFormData({ nombre: '', plan_mes: '', activa: true, orden: '' });
//         loadAreas();
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || 'Error al guardar el área');
//       }
//     } catch (error) {
//       setError('Error de conexión');
//     }
//   };

//   // Eliminar área
//   const deleteArea = async (id) => {
//     if (window.confirm('¿Está seguro de que desea eliminar esta área?')) {
//       try {
//         const response = await fetch(`${API_BASE_URL}/areas-estaticas/${id}/`, {
//           method: 'DELETE',
//         });
        
//         if (response.ok) {
//           setSuccess('Área eliminada correctamente');
//           loadAreas();
//         } else {
//           setError('Error al eliminar el área');
//         }
//       } catch (error) {
//         setError('Error de conexión');
//       }
//     }
//   };

//   // Toggle estado activo
//   const toggleStatus = async (area) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/areas-estaticas/${area.id}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...area, activa: !area.activa }),
//       });
      
//       if (response.ok) {
//         setSuccess('Estado actualizado correctamente');
//         loadAreas();
//       } else {
//         setError('Error al actualizar el estado');
//       }
//     } catch (error) {
//       setError('Error de conexión');
//     }
//   };

//   // Abrir modal para editar
//   const openEditModal = (area) => {
//     setEditingArea(area);
//     setFormData({
//       nombre: area.nombre,
//       plan_mes: area.plan_mes,
//       activa: area.activa,
//       orden: area.orden
//     });
//     setShowModal(true);
//   };

//   // Abrir modal para nuevo
//   const openNewModal = () => {
//     setEditingArea(null);
//     setFormData({ nombre: '', plan_mes: '', activa: true, orden: '' });
//     setShowModal(true);
//   };

//   return (
//     <Container className="py-4">
//       <Row>
//         <Col>
//           <Card>
//             <Card.Header className="d-flex justify-content-between align-items-center">
//               <h4 className="mb-0">Gestión de Áreas Estáticas</h4>
//               <Button variant="primary" onClick={openNewModal}>
//                 <FaPlus className="me-2" /> Nueva Área
//               </Button>
//             </Card.Header>
//             <Card.Body>
//               {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
//               {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
              
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Nombre</th>
//                     <th>Plan del Mes (kWh)</th>
//                     <th>Estado</th>
//                     <th>Orden</th>
//                     <th>Acciones</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {areas.map((area, index) => (
//                     <tr key={area.id}>
//                       <td>{index + 1}</td>
//                       <td>{area.nombre}</td>
//                       <td>{area.plan_mes}</td>
//                       <td>
//                         <Badge bg={area.activa ? "success" : "secondary"}>
//                           {area.activa ? "Activa" : "Inactiva"}
//                         </Badge>
//                       </td>
//                       <td>{area.orden}</td>
//                       <td>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => openEditModal(area)}
//                         >
//                           <FaEdit />
//                         </Button>
//                         <Button
//                           variant="outline-secondary"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => toggleStatus(area)}
//                         >
//                           {area.activa ? <FaToggleOff /> : <FaToggleOn />}
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => deleteArea(area.id)}
//                         >
//                           <FaTrash />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                   {areas.length === 0 && (
//                     <tr>
//                       <td colSpan="6" className="text-center">No hay áreas estáticas configuradas</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Modal para agregar/editar área */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingArea ? 'Editar Área' : 'Nueva Área'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Nombre del área</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={formData.nombre}
//                 onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
//                 placeholder="Ej: SEDE UNIVERSITARIA SIBANICU"
//               />
//             </Form.Group>
            
//             <Form.Group className="mb-3">
//               <Form.Label>Plan Total del Mes (kWh)</Form.Label>
//               <Form.Control
//                 type="number"
//                 step="0.01"
//                 value={formData.plan_mes}
//                 onChange={(e) => setFormData({ ...formData, plan_mes: e.target.value })}
//                 placeholder="Ej: 150"
//               />
//             </Form.Group>
            
//             <Form.Group className="mb-3">
//               <Form.Label>Orden en el reporte</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={formData.orden}
//                 onChange={(e) => setFormData({ ...formData, orden: e.target.value })}
//                 placeholder="Número de orden (0 para auto)"
//               />
//               <Form.Text className="text-muted">
//                 Dejar en 0 para asignar automáticamente al final
//               </Form.Text>
//             </Form.Group>
            
//             <Form.Check
//               type="checkbox"
//               label="Área activa (incluir en reporte)"
//               checked={formData.activa}
//               onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
//             />
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancelar
//           </Button>
//           <Button variant="primary" onClick={saveArea}>
//             {editingArea ? 'Actualizar' : 'Crear'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default StaticAreasManagement;


// StaticAreasManagement.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Badge,
//   Alert
// } from 'react-bootstrap';

// const StaticAreasManagement = () => {
//   const [areas, setAreas] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingArea, setEditingArea] = useState(null);
//   const [formData, setFormData] = useState({
//     nombre: '',
//     plan_mes: '',
//     activa: true,
//     orden: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

//   // Cargar áreas estáticas
//   const loadAreas = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/areas-estaticas/`);
//       if (response.ok) {
//         const data = await response.json();
//         setAreas(data);
//       } else {
//         setError('Error al cargar las áreas');
//       }
//     } catch (error) {
//       setError('Error de conexión');
//     }
//   };

//   useEffect(() => {
//     loadAreas();
//   }, []);

//   // Guardar área
//   const saveArea = async () => {
//     try {
//       const url = editingArea 
//         ? `${API_BASE_URL}/areas-estaticas/${editingArea.id}/`
//         : `${API_BASE_URL}/areas-estaticas/`;
      
//       const method = editingArea ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       if (response.ok) {
//         setSuccess(editingArea ? 'Área actualizada correctamente' : 'Área creada correctamente');
//         setShowModal(false);
//         setEditingArea(null);
//         setFormData({ nombre: '', plan_mes: '', activa: true, orden: '' });
//         loadAreas();
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || 'Error al guardar el área');
//       }
//     } catch (error) {
//       setError('Error de conexión');
//     }
//   };

//   // Eliminar área
//   const deleteArea = async (id) => {
//     if (window.confirm('¿Está seguro de que desea eliminar esta área?')) {
//       try {
//         const response = await fetch(`${API_BASE_URL}/areas-estaticas/${id}/`, {
//           method: 'DELETE',
//         });
        
//         if (response.ok) {
//           setSuccess('Área eliminada correctamente');
//           loadAreas();
//         } else {
//           setError('Error al eliminar el área');
//         }
//       } catch (error) {
//         setError('Error de conexión');
//       }
//     }
//   };

//   // Toggle estado activo
//   const toggleStatus = async (area) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/areas-estaticas/${area.id}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...area, activa: !area.activa }),
//       });
      
//       if (response.ok) {
//         setSuccess('Estado actualizado correctamente');
//         loadAreas();
//       } else {
//         setError('Error al actualizar el estado');
//       }
//     } catch (error) {
//       setError('Error de conexión');
//     }
//   };

//   // Abrir modal para editar
//   const openEditModal = (area) => {
//     setEditingArea(area);
//     setFormData({
//       nombre: area.nombre,
//       plan_mes: area.plan_mes,
//       activa: area.activa,
//       orden: area.orden
//     });
//     setShowModal(true);
//   };

//   // Abrir modal para nuevo
//   const openNewModal = () => {
//     setEditingArea(null);
//     setFormData({ nombre: '', plan_mes: '', activa: true, orden: '' });
//     setShowModal(true);
//   };

//   return (
//     <Container className="py-4">
//       <Row>
//         <Col>
//           <Card>
//             <Card.Header className="d-flex justify-content-between align-items-center">
//               <h4 className="mb-0">Gestión de Áreas Estáticas</h4>
//               <Button variant="primary" onClick={openNewModal}>
//                 <i className="bi bi-plus-circle me-2"></i> Nueva Área
//               </Button>
//             </Card.Header>
//             <Card.Body>
//               {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
//               {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
              
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Nombre</th>
//                     <th>Plan del Mes (kWh)</th>
//                     <th>Estado</th>
//                     <th>Orden</th>
//                     <th>Acciones</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {areas.map((area, index) => (
//                     <tr key={area.id}>
//                       <td>{index + 1}</td>
//                       <td>{area.nombre}</td>
//                       <td>{area.plan_mes}</td>
//                       <td>
//                         <Badge bg={area.activa ? "success" : "secondary"}>
//                           {area.activa ? "Activa" : "Inactiva"}
//                         </Badge>
//                       </td>
//                       <td>{area.orden}</td>
//                       <td>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => openEditModal(area)}
//                           title="Editar"
//                         >
//                           <i className="bi bi-pencil"></i>
//                         </Button>
//                         <Button
//                           variant="outline-secondary"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => toggleStatus(area)}
//                           title={area.activa ? "Desactivar" : "Activar"}
//                         >
//                           <i className={`bi bi-toggle-${area.activa ? 'on' : 'off'}`}></i>
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => deleteArea(area.id)}
//                           title="Eliminar"
//                         >
//                           <i className="bi bi-trash"></i>
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                   {areas.length === 0 && (
//                     <tr>
//                       <td colSpan="6" className="text-center">No hay áreas estáticas configuradas</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Modal para agregar/editar área */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             <i className={`bi ${editingArea ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
//             {editingArea ? 'Editar Área' : 'Nueva Área'}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>
//                 <i className="bi bi-building me-1"></i>
//                 Nombre del área
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 value={formData.nombre}
//                 onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
//                 placeholder="Ej: SEDE UNIVERSITARIA SIBANICU"
//               />
//             </Form.Group>
            
//             <Form.Group className="mb-3">
//               <Form.Label>
//                 <i className="bi bi-lightning-charge me-1"></i>
//                 Plan Total del Mes (kWh)
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 step="0.01"
//                 value={formData.plan_mes}
//                 onChange={(e) => setFormData({ ...formData, plan_mes: e.target.value })}
//                 placeholder="Ej: 150"
//               />
//             </Form.Group>
            
//             <Form.Group className="mb-3">
//               <Form.Label>
//                 <i className="bi bi-sort-numeric-down me-1"></i>
//                 Orden en el reporte
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 value={formData.orden}
//                 onChange={(e) => setFormData({ ...formData, orden: e.target.value })}
//                 placeholder="Número de orden (0 para auto)"
//               />
//               <Form.Text className="text-muted">
//                 Dejar en 0 para asignar automáticamente al final
//               </Form.Text>
//             </Form.Group>
            
//             <Form.Check
//               type="checkbox"
//               label={
//                 <>
//                   <i className="bi bi-power me-1"></i>
//                   Área activa (incluir en reporte)
//                 </>
//               }
//               checked={formData.activa}
//               onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
//             />
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             <i className="bi bi-x-circle me-1"></i>
//             Cancelar
//           </Button>
//           <Button variant="primary" onClick={saveArea}>
//             <i className={`bi ${editingArea ? 'bi-check-circle' : 'bi-plus-circle'} me-1`}></i>
//             {editingArea ? 'Actualizar' : 'Crear'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default StaticAreasManagement;


import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Alert
} from 'react-bootstrap';

const StaticAreasManagement = () => {
  const [areas, setAreas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    provincia: '',
    municipio: '',
    plan_mes: '',
    activa: true,

  });
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  const [municipios, setMunicipios] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE_URL = 'http://127.0.0.1:8000/energetico_api';

  // Cargar áreas estáticas
  // const loadAreas = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/areas-estaticas/`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setAreas(data);
  //     } else {
  //       setError('Error al cargar las áreas');
  //     }
  //   } catch (error) {
  //     setError('Error de conexión');
  //   }
  // };

  // useEffect(() => {
  //   loadAreas();
  // }, []);

    // Lista de provincias (debe coincidir con el backend)
  const provincias = [
    'Pinar del Río', 'Artemisa', 'La Habana', 'Mayabeque', 'Matanzas',
    'Cienfuegos', 'Villa Clara', 'Sancti Spíritus', 'Ciego de Ávila',
    'Camagüey', 'Las Tunas', 'Holguín', 'Granma', 'Santiago de Cuba', 'Guantánamo'
  ];

  // Mapeo de municipios por provincia
  const municipiosPorProvincia = {
    'Pinar del Río': ['Consolación del Sur', 'Guane', 'La Palma', 'Los Palacios', 'Mantua', 'Minas de Matahambre', 'Pinar del Río', 'San Juan y Martínez', 'San Luis', 'Sandino', 'Viñales'],
    'Artemisa': ['Alquízar', 'Artemisa', 'Bauta', 'Caimito', 'Guanajay', 'Güira de Melena', 'Mariel', 'San Antonio de los Baños', 'Bahía Honda', 'Candelaria', 'San Cristóbal'],
    'La Habana': ['Arroyo Naranjo', 'Boyeros', 'Centro Habana', 'Cerro', 'Cotorro', 'Diez de Octubre', 'Guanabacoa', 'La Habana del Este', 'La Habana Vieja', 'La Lisa', 'Marianao', 'Playa', 'Plaza de la Revolución', 'Regla', 'San Miguel del Padrón'],   
    'Mayabeque': ['Batabanó', 'Bejucal', 'Güines', 'Jaruco', 'Madruga',   'Melena del Sur', 'Nueva Paz', 'Quivicán', 'San José de las Lajas', 'Santa Cruz del Norte'],   
    'Matanzas': ['Calimete', 'Cárdenas', 'Ciénaga de Zapata', 'Colón', 'Jagüey Grande', 'Jovellanos', 'Limonar', 'Los Arabos', 'Martí', 'Matanzas', 'Pedro Betancourt', 'Perico', 'Unión de Reyes'],   
    'Cienfuegos': ['Abreus', 'Aguada de Pasajeros', 'Cienfuegos', 'Cruces',   'Cumanayagua', 'Lajas', 'Palmira', 'Rodas'],   
    'Villa Clara': ['Caibarién', 'Camajuaní', 'Cifuentes', 'Corralillo', 'Encrucijada', 'Manicaragua', 'Placetas', 'Quemado de Güines', 'Ranchuelo', 'Remedios', 'Sagua la Grande', 'Santa Clara', 'Santo Domingo'], 
    'Sancti Spíritus': ['Cabaiguán', 'Fomento', 'Jatibonico', 'La Sierpe', 'Sancti Spíritus', 'Taguasco', 'Trinity', 'Yaguajay'], 
    'Ciego de Ávila': ['Baraguá', 'Bolivia', 'Chambas', 'Ciego de Ávila', 'Ciro Redondo', 'Florencia', 'Majagua', 'Morón', 'Primero de Enero', 'Venezuela'], 
    'Camagüey': ['Camagüey', 'Carlos M. de Céspedes', 'Esmeralda', 'Florida', 'Guáimaro', 'Jimaguayú', 'Minas', 'Najasa', 'Nuevitas', 'Sibanicú', 'Sierra de Cubitas', 'Vertientes'], 
    'Las Tunas': ['Amancio', 'Colombia', 'Jesús Menéndez', 'Jobabo', 'Las Tunas', 'Majibacoa', 'Manatí', 'Puerto Padre'], 
    'Holguín': ['Antilla', 'Báguanos', 'Banes', 'Cacocum', 'Calixto García', 'Cueto', 'Frank País', 'Gibara', 'Holguín', 'Mayarí', 'Moa', 'Rafael Freyre', 'Sagua de Tánamo', 'Urbano Noris'], 
    'Granma': ['Bartolomé Masó', 'Bayamo', 'Buey Arriba', 'Campechuela', 'Cauto Cristo', 'Guisa', 'Jiguaní', 'Manzanillo', 'Media Luna', 'Niquero', 'Pilón', 'Río Cauto', 'Yara'], 
    'Santiago de Cuba': ['Contramaestre', 'Guamá', 'Mella', 'Palma Soriano', 'San Luis', 'Santiago de Cuba', 'Segundo Frente', 'Songo-La Maya', 'Tercer Frente'], 
    'Guantánamo': ['Baracoa', 'Caimanera', 'El Salvador', 'Guantánamo', 'Imías', 'Maisí', 'Manuel Tames', 'Niceto Pérez', 'San Antonio del Sur', 'Yateras']
  };

  useEffect(() => {
    loadAreas();
  }, []);

  // Cargar áreas estáticas
  const loadAreas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/areas-estaticas/`);
      if (response.ok) {
        const data = await response.json();
        setAreas(data);
        setError('');
      } else {
        setError('Error al cargar las áreas');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  // Cuando cambia la provincia, actualizar los municipios disponibles
  useEffect(() => {
    if (formData.provincia) {
      setMunicipios(municipiosPorProvincia[formData.provincia] || []);
    } else {
      setMunicipios([]);
    }
  }, [formData.provincia]);

  // Abrir modal para editar
  // const openEditModal = (area) => {
  //   setEditingArea(area);
  //   setFormData({
  //     nombre: area.nombre,
  //     provincia: area.provincia || '',
  //     municipio: area.municipio || '',
  //     plan_mes: area.plan_mes,
  //     activa: area.activa
  //   });
  //   setShowModal(true);
  // };

  // Guardar área
  const saveArea = async () => {
    try {
      const url = editingArea 
        ? `${API_BASE_URL}/areas-estaticas/${editingArea.id}/`
        : `${API_BASE_URL}/areas-estaticas/`;
      
      const method = editingArea ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSuccess(editingArea ? 'Área actualizada correctamente' : 'Área creada correctamente');
        setShowModal(false);
        setEditingArea(null);
        setFormData({ nombre: '', plan_mes: '', activa: true, orden: '' });
        loadAreas();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al guardar el área');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  // Eliminar área
  const deleteArea = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta área?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/areas-estaticas/${id}/`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setSuccess('Área eliminada correctamente');
          loadAreas();
        } else {
          setError('Error al eliminar el área');
        }
      } catch (error) {
        setError('Error de conexión');
      }
    }
  };

  // Toggle estado activo
  const toggleStatus = async (area) => {
    try {
      const response = await fetch(`${API_BASE_URL}/areas-estaticas/${area.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...area, activa: !area.activa }),
      });
      
      if (response.ok) {
        setSuccess('Estado actualizado correctamente');
        loadAreas();
      } else {
        setError('Error al actualizar el estado');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  // Abrir modal para editar
  const openEditModal = (area) => {
    setEditingArea(area);
    setFormData({
      nombre: area.nombre,
      provincia: area.provincia || '',
      municipio: area.municipio || '',
      plan_mes: area.plan_mes,
      activa: area.activa
    });
    setShowModal(true);
  };

  // Abrir modal para nuevo
  const openNewModal = () => {
    setEditingArea(null);
    setFormData({ nombre: '', provincia: '', municipio: '', plan_mes: '', activa: true});
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Gestión de Áreas Estáticas</h4>
              <Button variant="primary" onClick={openNewModal}>
                <i className="bi bi-plus-circle me-2"></i> Nueva Área
              </Button>
            </Card.Header>
            <Card.Body>
              {/* {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
              {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>} */}

              {/* <Alert variant="info" className="mb-3">
                <i className="bi bi-info-circle me-2"></i>
                Las áreas estáticas se mostrarán automáticamente en el reporte diario 
                cuando se seleccione una fecha. Los datos se insertarán desde la fila 8 
                y se agregarán filas automáticamente si se supera la fila 35.
              </Alert> */}
              
              {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
              {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
                          
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Plan del Mes (kWh)</th>
                    <th>Estado</th>
                    <th>Provincia</th>
                    <th>Municipio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area, index) => (
                    <tr key={area.id}>
                      <td>{index + 1}</td>
                      <td>{area.nombre}</td>
                      <td>{area.plan_mes}</td>
                      <td>
                        <Badge bg={area.activa ? "success" : "secondary"}>
                          {area.activa ? "Activa" : "Inactiva"}
                        </Badge>
                      </td>
                      <td>{area.provincia}</td>
                      <td>{area.municipio}</td>
                      <td>
                        <Button
                          variant="outline-dark"
                          size="sm"
                          className="me-2"
                          onClick={() => openEditModal(area)}
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-2"
                          onClick={() => toggleStatus(area)}
                          title={area.activa ? "Desactivar" : "Activar"}
                        >
                          <i className={`bi bi-toggle-${area.activa ? 'on' : 'off'}`}></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteArea(area.id)}
                          title="Eliminar"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {areas.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">No hay áreas estáticas configuradas</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para agregar/editar área */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`bi ${editingArea ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
            {editingArea ? 'Editar Área' : 'Nueva Área'}
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-building me-1"></i>
                Nombre del área
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: SEDE UNIVERSITARIA SIBANICU"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-lightning-charge me-1"></i>
                Plan Total del Mes (kWh)
              </Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={formData.plan_mes}
                onChange={(e) => setFormData({ ...formData, plan_mes: e.target.value })}
                placeholder="Ej: 150"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-sort-numeric-down me-1"></i>
                Orden en el reporte
              </Form.Label>
              <Form.Control
                type="number"
                value={formData.orden}
                onChange={(e) => setFormData({ ...formData, orden: e.target.value })}
                placeholder="Número de orden (0 para auto)"
              />
              <Form.Text className="text-muted">
                Dejar en 0 para asignar automáticamente al final
              </Form.Text>
            </Form.Group>
            
            <Form.Check
              type="checkbox"
              label={
                <>
                  <i className="bi bi-power me-1"></i>
                  Área activa (incluir en reporte)
                </>
              }
              checked={formData.activa}
              onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
            />
          </Form>
        </Modal.Body> */}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del área</Form.Label>
              <Form.Control
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: SEDE UNIVERSITARIA SIBANICU"
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Select
                    value={formData.provincia}
                    onChange={(e) => setFormData({ ...formData, provincia: e.target.value, municipio: '' })}
                  >
                    <option value="">Seleccione una provincia</option>
                    {provincias.map(provincia => (
                      <option key={provincia} value={provincia}>{provincia}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Municipio</Form.Label>
                  <Form.Select
                    value={formData.municipio}
                    onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                    disabled={!formData.provincia}
                  >
                    <option value="">Seleccione un municipio</option>
                    {municipios.map(municipio => (
                      <option key={municipio} value={municipio}>{municipio}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Plan Total del Mes (kWh)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={formData.plan_mes}
                onChange={(e) => setFormData({ ...formData, plan_mes: e.target.value })}
                placeholder="Ej: 150"
              />
            </Form.Group>
            
            <Form.Check
              type="checkbox"
              label="Área activa (incluir en reporte)"
              checked={formData.activa}
              onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <i className="bi bi-x-circle me-1"></i>
            Cancelar
          </Button>
          <Button variant="dark" onClick={saveArea}>
            <i className={`bi ${editingArea ? 'bi-check-circle' : 'bi-plus-circle'} me-1`}></i>
            {editingArea ? 'Actualizar' : 'Crear'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StaticAreasManagement;
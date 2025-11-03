// import React, { useState, useEffect, useRef } from 'react';
// import { Form, Button, Row, Col, Tab, Tabs, Alert, Modal, Card, Spinner, Container } from 'react-bootstrap';
// import api from './service_api/transformer_loss_api';

// const TransformerLossReport = () => {
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [loading, setLoading] = useState(false);
//   const [loadingData, setLoadingData] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [file, setFile] = useState(null);
//   const [hasData, setHasData] = useState(false);
//   const fileInputRef = useRef(null);

//   const monthNames = {
//     1: "ENERO", 2: "FEBRERO", 3: "MARZO", 4: "ABRIL", 5: "MAYO", 6: "JUNIO",
//     7: "JULIO", 8: "AGOSTO", 9: "SEPTIEMBRE", 10: "OCTUBRE", 11: "NOVIEMBRE", 12: "DICIEMBRE"
//   };

//   const monthName = {
//     1: "01 ENERO", 2: "02 FEBRERO", 3: "03 MARZO", 4: "04 ABRIL", 5: "05 MAYO", 6: "06 JUNIO",
//     7: "07 JULIO", 8: "08 AGOSTO", 9: "09 SEPTIEMBRE", 10: "10 OCTUBRE", 11: "11 NOVIEMBRE", 12: "12 DICIEMBRE"
//   };

//   const checkDataExists = async () => {
//     try {
//       setLoadingData(true);
//       const data = await api.getTransformerLossData(month, year);
//       setHasData(Array.isArray(data) && data.length > 0);
//     } catch (error) {
//       console.error('Error checking data:', error);
//       setHasData(false);
//     } finally {
//       setLoadingData(false);
//     }
//   };

//   useEffect(() => {
//     checkDataExists();
//   }, [month, year]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Por favor seleccione un archivo');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await api.uploadBitacoraFile(file);

//       setSuccess('Datos cargados exitosamente');
//       setHasData(true);
//     } catch (error) {
//       setError(error.message || 'Error al procesar el archivo');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const blob = await api.downloadExcelTransformerLossData(month, year);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `${monthName[month]} ${year.toString()}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       setError(error.message || 'Error al generar el reporte');
//       if (error.message.includes('No hay datos')) {
//         setHasData(false);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-4">
//       <Card className="shadow-sm">
//         <Card.Header className="bg-dark text-white">
//           <h2 className="mb-0">Reporte de Pérdidas de Transformación</h2>
//         </Card.Header>
//         <Card.Body>
//           {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
//           {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

//           <Row className="mb-4 g-3">
//             <Col md={3}>
//               <Form.Group controlId="formMonth">
//                 <Form.Label>Mes</Form.Label>
//                 <Form.Select 
//                   value={month} 
//                   onChange={(e) => setMonth(parseInt(e.target.value))}
//                   disabled={loading}
//                 >
//                   {Object.entries(monthNames).map(([num, name]) => (
//                     <option key={num} value={num}>{name}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId="formYear">
//                 <Form.Label>Año</Form.Label>
//                 <Form.Control 
//                   type="number" 
//                   value={year} 
//                   onChange={(e) => setYear(parseInt(e.target.value))}
//                   min="2000" 
//                   max="2100" 
//                   disabled={loading}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} className="d-flex align-items-end">
//               {loadingData ? (
//                 <Spinner animation="border" size="sm" />
//               ) : hasData ? (
//                 <Alert variant="info" className="mb-0">
//                   Ya existen datos para {monthNames[month]} {year}
//                 </Alert>
//               ) : (
//                 <Alert variant="warning" className="mb-0">
//                   No hay datos para {monthNames[month]} {year}
//                 </Alert>
//               )}
//             </Col>
//           </Row>

//           {!hasData && (
//             <Card className="mb-4">
//               <Card.Header className="bg-light">
//                 <h5 className="mb-0">Cargar Datos desde Bitácora</h5>
//               </Card.Header>
//               <Card.Body>
//                 <Form.Group controlId="formFile" className="mb-3">
//                   <Form.Label>Seleccione el archivo bitácora</Form.Label>
//                   <Form.Control 
//                     type="file" 
//                     accept=".xlsx,.xls" 
//                     onChange={handleFileChange}
//                     ref={fileInputRef}
//                   />
//                   <Form.Text className="text-muted">
//                     Seleccione el archivo "Tabla R 1A-Bitacora {monthNames[month]} {year}.xlsx"
//                   </Form.Text>
//                 </Form.Group>
//                 <Button 
//                   variant="primary" 
//                   onClick={handleUpload}
//                   disabled={loading || !file}
//                 >
//                   {loading ? (
//                     <Spinner as="span" animation="border" size="sm" className="me-2" />
//                   ) : (
//                     <i className="bi bi-upload me-2"></i>
//                   )}
//                   Cargar Datos
//                 </Button>
//               </Card.Body>
//             </Card>
//           )}

//           <div className="d-grid">
//             <Button 
//               variant="dark" 
//               size="lg" 
//               onClick={handleDownload}
//               disabled={loading || !hasData}
//             >
//               {loading ? (
//                 <Spinner as="span" animation="border" size="sm" className="me-2" />
//               ) : (
//                 <i className="bi bi-file-earmark-excel me-2"></i>
//               )}
//               Generar Reporte de Pérdidas
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default TransformerLossReport;


// import React, { useState, useEffect } from 'react';
// import { Form, Button, Row, Col, Alert, Modal, Card, Spinner, Container } from 'react-bootstrap';
// import api from './service_api/transformer_loss_api';

// const TransformerLossReport = () => {
//     const [month, setMonth] = useState(new Date().getMonth() + 1);
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasData, setHasData] = useState(false);

//     const monthNames = {
//         1: "ENERO", 2: "FEBRERO", 3: "MARZO", 4: "ABRIL", 5: "MAYO", 6: "JUNIO",
//         7: "JULIO", 8: "AGOSTO", 9: "SEPTIEMBRE", 10: "OCTUBRE", 11: "NOVIEMBRE", 12: "DICIEMBRE"
//     };

//     const monthName = {
//         1: "01 ENERO", 2: "02 FEBRERO", 3: "03 MARZO", 4: "04 ABRIL", 5: "05 MAYO", 6: "06 JUNIO",
//         7: "07 JULIO", 8: "08 AGOSTO", 9: "09 SEPTIEMBRE", 10: "10 OCTUBRE", 11: "11 NOVIEMBRE", 12: "12 DICIEMBRE"
//     };

//     const checkDataExists = async () => {
//         try {
//             setLoadingData(true);
//             const data = await api.getTransformerLossData(month, year);
//             setHasData(Array.isArray(data) && data.length > 0);
//         } catch (error) {
//             console.error('Error checking data:', error);
//             setHasData(false);
//         } finally {
//             setLoadingData(false);
//         }
//     };

//     useEffect(() => {
//         checkDataExists();
//     }, [month, year]);

//     const handleDownload = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const blob = await api.downloadExcelTransformerLossData(month, year);
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `Transformacion ${monthName[month]} ${year.toString()}.xlsx`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(url);
//         } catch (error) {
//             setError(error.message || 'Error al generar el reporte');
//             if (error.message.includes('No hay datos')) {
//                 setHasData(false);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Container className="py-4">
//             <Card className="shadow-sm">
//                 <Card.Header className="bg-dark text-white">
//                     <h2 className="mb-0">Reporte de Pérdidas de Transformación</h2>
//                 </Card.Header>
//                 <Card.Body>
//                     {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                    
//                     <Row className="mb-4 g-3">
//                         <Col md={3}>
//                             <Form.Group controlId="formMonth">
//                                 <Form.Label>Mes</Form.Label>
//                                 <Form.Select 
//                                     value={month} 
//                                     onChange={(e) => setMonth(parseInt(e.target.value))} 
//                                     disabled={loading}
//                                 >
//                                     {Object.entries(monthNames).map(([num, name]) => (
//                                         <option key={num} value={num}>{name}</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Col>
//                         <Col md={3}>
//                             <Form.Group controlId="formYear">
//                                 <Form.Label>Año</Form.Label>
//                                 <Form.Control 
//                                     type="number" 
//                                     value={year} 
//                                     onChange={(e) => setYear(parseInt(e.target.value))} 
//                                     min="2000" 
//                                     max="2100" 
//                                     disabled={loading} 
//                                 />
//                             </Form.Group>
//                         </Col>
//                         <Col md={6} className="d-flex align-items-end">
//                             {loadingData ? (
//                                 <Spinner animation="border" size="sm" />
//                             ) : hasData ? (
//                                 <Alert variant="info" className="mb-0">
//                                     Datos disponibles para {monthNames[month]} {year}
//                                 </Alert>
//                             ) : (
//                                 <Alert variant="warning" className="mb-0">
//                                     No hay datos disponibles. Genere primero el reporte de Bitácora.
//                                 </Alert>
//                             )}
//                         </Col>
//                     </Row>

//                     <div className="d-grid">
//                         <Button 
//                             variant="dark" 
//                             size="lg" 
//                             onClick={handleDownload} 
//                             disabled={loading || !hasData}
//                         >
//                             {loading ? (
//                                 <Spinner as="span" animation="border" size="sm" className="me-2" />
//                             ) : (
//                                 <i className="bi bi-file-earmark-excel me-2"></i>
//                             )}
//                             Generar Reporte de Pérdidas
//                         </Button>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default TransformerLossReport;


// import React, { useState, useEffect } from 'react';
// import { Form, Button, Row, Col, Alert, Modal, Card, Spinner, Container, Table } from 'react-bootstrap';
// import api from './service_api/transformer_loss_api';

// const TransformerLossReport = () => {
//     const [month, setMonth] = useState(new Date().getMonth() + 1);
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasData, setHasData] = useState(false);
//     const [transformerData, setTransformerData] = useState([]);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [currentEdit, setCurrentEdit] = useState(null);

//     const monthNames = {
//         1: "ENERO", 2: "FEBRERO", 3: "MARZO", 4: "ABRIL", 5: "MAYO", 6: "JUNIO",
//         7: "JULIO", 8: "AGOSTO", 9: "SEPTIEMBRE", 10: "OCTUBRE", 11: "NOVIEMBRE", 12: "DICIEMBRE"
//     };

//     const monthName = {
//         1: "01 ENERO", 2: "02 FEBRERO", 3: "03 MARZO", 4: "04 ABRIL", 5: "05 MAYO", 6: "06 JUNIO",
//         7: "07 JULIO", 8: "08 AGOSTO", 9: "09 SEPTIEMBRE", 10: "10 OCTUBRE", 11: "11 NOVIEMBRE", 12: "12 DICIEMBRE"
//     };

//     const MONOFASICO_CHOICES = [
//         {value: 5, label: '5 kVA', pfe: 0.046, pcu: 0.107},
//         {value: 10, label: '10 kVA', pfe: 0.065, pcu: 0.18},
//         {value: 15, label: '15 kVA', pfe: 0.084, pcu: 0.251},
//         {value: 25, label: '25 kVA', pfe: 0.115, pcu: 0.389},
//         {value: 37.5, label: '37.5 kVA', pfe: 0.162, pcu: 0.487},
//         {value: 50, label: '50 kVA', pfe: 0.199, pcu: 0.626},
//         {value: 75, label: '75 kVA', pfe: 0.269, pcu: 0.882},
//         {value: 100, label: '100 kVA', pfe: 0.332, pcu: 1.185},
//         {value: 167, label: '167 kVA', pfe: 0.482, pcu: 1.893},
//         {value: 250, label: '250 kVA', pfe: 0.66, pcu: 2.802},
//         {value: 333, label: '333 kVA', pfe: 0.83, pcu: 3.587}
//     ];

//     const checkDataExists = async () => {
//         try {
//             setLoadingData(true);
//             const data = await api.getTransformerLossData(month, year);
//             setHasData(Array.isArray(data) && data.length > 0);
//             setTransformerData(data);
//         } catch (error) {
//             console.error('Error checking data:', error);
//             setHasData(false);
//             setTransformerData([]);
//         } finally {
//             setLoadingData(false);
//         }
//     };

//     useEffect(() => {
//         checkDataExists();
//     }, [month, year]);

//     const handleDownload = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const blob = await api.downloadExcelTransformerLossData(month, year);
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `Transformacion ${monthName[month]} ${year.toString()}.xlsx`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(url);
//         } catch (error) {
//             setError(error.message || 'Error al generar el reporte');
//             if (error.message.includes('No hay datos')) {
//                 setHasData(false);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const handleEditClick = (data) => {
//     //     setCurrentEdit(data);
//     //     setShowEditModal(true);
//     // };

//     // const handleSaveEdit = async () => {
//     //     try {
//     //         setLoading(true);
//     //         setError(null);
            
//     //         // Preparar datos para enviar - asegurarse de que transformer_type es un número
//     //         const dataToSend = {
//     //             area: currentEdit.area,
//     //             month: currentEdit.month,
//     //             year: currentEdit.year,
//     //             transformer_type: parseFloat(currentEdit.transformer_type) // Convertir explícitamente a float
//     //         };
            
//     //         const response = await api.updateTransformerLossData(dataToSend);
            
//     //         if (response.error) {
//     //             throw new Error(response.error);
//     //         }
            
//     //         setShowEditModal(false);
//     //         await checkDataExists(); // Refresh data
//     //     } catch (error) {
//     //         setError(error.message || 'Error al actualizar los datos');
//     //         console.error('Error details:', error);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const handleEditClick = (data) => {
//         setCurrentEdit({
//             ...data,
//             // Asegurar que transformer_type es número
//             transformer_type: parseFloat(data.transformer_type)
//         });
//         setShowEditModal(true);
//     };

//     const handleTransformerTypeChange = (e) => {
//         const selectedValue = parseFloat(e.target.value);
//         const selectedTransformer = MONOFASICO_CHOICES.find(t => t.value === selectedValue);
        
//         setCurrentEdit({
//             ...currentEdit,
//             transformer_type: selectedValue,
//             kva: selectedValue,
//             pfe: selectedTransformer.pfe,
//             pcu: selectedTransformer.pcu
//         });
//     };

//     const handleSaveEdit = async () => {
//         try {
//             setLoading(true);
//             setError(null);
            
//             // Preparar datos para enviar (solo los necesarios)
//             const dataToSend = {
//                 area: currentEdit.area,
//                 month: currentEdit.month,
//                 year: currentEdit.year,
//                 transformer_type: currentEdit.transformer_type // Enviar como número
//             };
            
//             const response = await api.updateTransformerLossData(dataToSend);
            
//             if (response.error) {
//                 throw new Error(response.error);
//             }
            
//             setShowEditModal(false);
//             await checkDataExists(); // Refresh data
//         } catch (error) {
//             setError(error.message || 'Error al actualizar los datos');
//             console.error('Error details:', error);
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <Container className="py-4">
//             <Card className="shadow-sm">
//                 <Card.Header className="bg-dark text-white">
//                     <h2 className="mb-0">Reporte de Pérdidas de Transformación</h2>
//                 </Card.Header>
//                 <Card.Body>
//                     {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                    
//                     <Row className="mb-4 g-3">
//                         <Col md={3}>
//                             <Form.Group controlId="formMonth">
//                                 <Form.Label>Mes</Form.Label>
//                                 <Form.Select 
//                                     value={month} 
//                                     onChange={(e) => setMonth(parseInt(e.target.value))} 
//                                     disabled={loading}
//                                 >
//                                     {Object.entries(monthNames).map(([num, name]) => (
//                                         <option key={num} value={num}>{name}</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Col>
//                         <Col md={3}>
//                             <Form.Group controlId="formYear">
//                                 <Form.Label>Año</Form.Label>
//                                 <Form.Control 
//                                     type="number" 
//                                     value={year} 
//                                     onChange={(e) => setYear(parseInt(e.target.value))} 
//                                     min="2000" 
//                                     max="2100" 
//                                     disabled={loading} 
//                                 />
//                             </Form.Group>
//                         </Col>
//                         <Col md={6} className="d-flex align-items-end">
//                             {loadingData ? (
//                                 <Spinner animation="border" size="sm" />
//                             ) : hasData ? (
//                                 <Alert variant="info" className="mb-0">
//                                     Datos disponibles para {monthNames[month]} {year}
//                                 </Alert>
//                             ) : (
//                                 <Alert variant="warning" className="mb-0">
//                                     No hay datos disponibles. Genere primero el reporte de Bitácora.
//                                 </Alert>
//                             )}
//                         </Col>
//                     </Row>

//                     {hasData && (
//                         <>
//                             <Table striped bordered hover className="mt-4">
//                                 <thead>
//                                     <tr>
//                                         <th>Área</th>
//                                         <th>kVA</th>
//                                         <th>Pfe</th>
//                                         <th>Pcu</th>
//                                         <th>Acciones</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {transformerData.map((data) => (
//                                         <tr key={`${data.area}-${data.month}-${data.year}`}>
//                                             <td>{data.area}</td>
//                                             <td>{data.kva}</td>
//                                             <td>{data.pfe}</td>
//                                             <td>{data.pcu}</td>
//                                             <td>
//                                                 <Button 
//                                                     variant="outline-primary" 
//                                                     size="sm"
//                                                     onClick={() => handleEditClick(data)}
//                                                 >
//                                                     Editar
//                                                 </Button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>

//                             <div className="d-grid mt-3">
//                                 <Button 
//                                     variant="dark" 
//                                     size="lg" 
//                                     onClick={handleDownload} 
//                                     disabled={loading}
//                                 >
//                                     {loading ? (
//                                         <Spinner as="span" animation="border" size="sm" className="me-2" />
//                                     ) : (
//                                         <i className="bi bi-file-earmark-excel me-2"></i>
//                                     )}
//                                     Generar Reporte de Pérdidas
//                                 </Button>
//                             </div>
//                         </>
//                     )}
//                 </Card.Body>
//             </Card>

//             {/* Modal de edición */}
//             {/*<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Editar Datos del Transformador</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {currentEdit && (
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Área</Form.Label>
//                                 <Form.Control 
//                                     type="text" 
//                                     value={currentEdit.area} 
//                                     readOnly 
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Tipo de Transformador</Form.Label>
//                                 <Form.Select
//                                     value={currentEdit.transformer_type}
//                                     onChange={(e) => setCurrentEdit({
//                                         ...currentEdit,
//                                         transformer_type: parseFloat(e.target.value)
//                                     })}
//                                 >
//                                     {MONOFASICO_CHOICES.map(([value, label]) => (
//                                         <option key={value} value={value}>{label}</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>kVA</Form.Label>
//                                 <Form.Control 
//                                     type="text" 
//                                     value={currentEdit.kva} 
//                                     readOnly 
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Pfe</Form.Label>
//                                 <Form.Control 
//                                     type="text" 
//                                     value={currentEdit.pfe} 
//                                     readOnly 
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Pcu</Form.Label>
//                                 <Form.Control 
//                                     type="text" 
//                                     value={currentEdit.pcu} 
//                                     readOnly 
//                                 />
//                             </Form.Group>
//                         </Form>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                         Cancelar
//                     </Button>
//                     <Button variant="primary" onClick={handleSaveEdit} disabled={loading}>
//                         {loading ? (
//                             <Spinner as="span" animation="border" size="sm" className="me-2" />
//                         ) : null}
//                         Guardar Cambios
//                     </Button>
//                 </Modal.Footer>
//             </Modal>*/}

//             <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Editar Datos del Transformador</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {currentEdit && (
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Área</Form.Label>
//                                 <Form.Control 
//                                     type="text" 
//                                     value={currentEdit.area} 
//                                     readOnly 
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Tipo de Transformador</Form.Label>
//                                 <Form.Select
//                                     value={currentEdit.transformer_type}
//                                     onChange={handleTransformerTypeChange}
//                                 >
//                                     {MONOFASICO_CHOICES.map((transformer) => (
//                                         <option key={transformer.value} value={transformer.value}>
//                                             {transformer.label} - Pfe: {transformer.pfe}, Pcu: {transformer.pcu}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>kVA</Form.Label>
//                                 <Form.Control 
//                                     type="number" 
//                                     value={currentEdit.kva} 
//                                     readOnly 
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Pfe</Form.Label>
//                                 <Form.Control 
//                                     type="number" 
//                                     value={currentEdit.pfe} 
//                                     readOnly 
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Pcu</Form.Label>
//                                 <Form.Control 
//                                     type="number" 
//                                     value={currentEdit.pcu} 
//                                     readOnly 
//                                 />
//                             </Form.Group>
//                         </Form>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                         Cancelar
//                     </Button>
//                     <Button variant="primary" onClick={handleSaveEdit} disabled={loading}>
//                         {loading ? (
//                             <Spinner as="span" animation="border" size="sm" className="me-2" />
//                         ) : null}
//                         Guardar Cambios
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </Container>
//     );
// };

// export default TransformerLossReport;


import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Modal, Card, Spinner, Container, Table } from 'react-bootstrap';
import api from './service_api/transformer_loss_api';

const TransformerLossReport = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [error, setError] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [transformerData, setTransformerData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingValues, setEditingValues] = useState({});

    const monthNames = {
        1: "ENERO", 2: "FEBRERO", 3: "MARZO", 4: "ABRIL", 5: "MAYO", 6: "JUNIO",
        7: "JULIO", 8: "AGOSTO", 9: "SEPTIEMBRE", 10: "OCTUBRE", 11: "NOVIEMBRE", 12: "DICIEMBRE"
    };

    const monthName = {
        1: "01 ENERO", 2: "02 FEBRERO", 3: "03 MARZO", 4: "04 ABRIL", 5: "05 MAYO", 6: "06 JUNIO",
        7: "07 JULIO", 8: "08 AGOSTO", 9: "09 SEPTIEMBRE", 10: "10 OCTUBRE", 11: "11 NOVIEMBRE", 12: "12 DICIEMBRE"
    };

    const TRANSFORMER_OPTIONS = [
        { kva: 5, pfe: 0.046, pcu: 0.107 },
        { kva: 10, pfe: 0.065, pcu: 0.18 },
        { kva: 15, pfe: 0.084, pcu: 0.251 },
        { kva: 25, pfe: 0.115, pcu: 0.389 },
        { kva: 37.5, pfe: 0.162, pcu: 0.487 },
        { kva: 50, pfe: 0.199, pcu: 0.626 },
        { kva: 75, pfe: 0.269, pcu: 0.882 },
        { kva: 100, pfe: 0.332, pcu: 1.185 },
        { kva: 167, pfe: 0.482, pcu: 1.893 },
        { kva: 250, pfe: 0.66, pcu: 2.802 },
        { kva: 333, pfe: 0.83, pcu: 3.587 }
    ];

    const checkDataExists = async () => {
        try {
            setLoadingData(true);
            const data = await api.getTransformerLossData(month, year);
            setHasData(Array.isArray(data) && data.length > 0);
            setTransformerData(data);
        } catch (error) {
            console.error('Error checking data:', error);
            setHasData(false);
            setTransformerData([]);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        checkDataExists();
    }, [month, year]);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);
        try {
            const blob = await api.downloadExcelTransformerLossData(month, year);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Transformacion ${monthName[month]} ${year.toString()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setError(error.message || 'Error al generar el reporte');
            if (error.message.includes('No hay datos')) {
                setHasData(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStartEdit = (id, data) => {
        setEditingId(id);
        setEditingValues({
            kva: data.kva,
            pfe: data.pfe,
            pcu: data.pcu
        });
    };

    const handleSelectChange = (e) => {
        const selectedKva = parseFloat(e.target.value);
        const selected = TRANSFORMER_OPTIONS.find(t => t.kva === selectedKva);
        
        setEditingValues({
            kva: selectedKva,
            pfe: selected.pfe,
            pcu: selected.pcu
        });
    };

    // const handleSaveEdit = async () => {
    //     try {
    //         setLoading(true);
    //         setError(null);
            
    //         const dataToUpdate = {
    //             area: transformerData.find(d => d.id === editingId).area,
    //             month: month,
    //             year: year,
    //             ...editingValues
    //         };
            
    //         const response = await api.updateTransformerLossData(dataToUpdate);
            
    //         if (response.error) {
    //             throw new Error(response.error);
    //         }
            
    //         setEditingId(null);
    //         await checkDataExists();
    //     } catch (error) {
    //         setError(error.message || 'Error al actualizar los datos');
    //         console.error('Error details:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSaveEdit = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const dataToUpdate = {
                id: editingId,  // Añadir el ID
                area: transformerData.find(d => d.id === editingId).area,
                month: month,
                year: year,
                ...editingValues
            };
            
            const response = await api.updateTransformerLossData(dataToUpdate);
            
            if (response.error) {
                throw new Error(response.error);
            }
            
            setEditingId(null);
            await checkDataExists();
        } catch (error) {
            setError(error.message || 'Error al actualizar los datos');
            console.error('Error details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    return (
        <Container className="py-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-dark text-white">
                    <h2 className="mb-0">Reporte de Pérdidas de Transformación</h2>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                    
                    <Row className="mb-4 g-3">
                        <Col md={3}>
                            <Form.Group controlId="formMonth">
                                <Form.Label>Mes</Form.Label>
                                <Form.Select 
                                    value={month} 
                                    onChange={(e) => setMonth(parseInt(e.target.value))} 
                                    disabled={loading}
                                >
                                    {Object.entries(monthNames).map(([num, name]) => (
                                        <option key={num} value={num}>{name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formYear">
                                <Form.Label>Año</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={year} 
                                    onChange={(e) => setYear(parseInt(e.target.value))} 
                                    min="2000" 
                                    max="2100" 
                                    disabled={loading} 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex align-items-end">
                            {loadingData ? (
                                <Spinner animation="border" size="sm" />
                            ) : hasData ? (
                                <Alert variant="info" className="mb-0">
                                    Datos disponibles para {monthNames[month]} {year}
                                </Alert>
                            ) : (
                                <Alert variant="warning" className="mb-0">
                                    No hay datos disponibles. Genere primero el reporte de Bitácora.
                                </Alert>
                            )}
                        </Col>
                    </Row>

                    {hasData && (
                        <>
                            <Table striped bordered hover className="mt-4">
                                <thead>
                                    <tr>
                                        <th>Área</th>
                                        <th>kVA</th>
                                        <th>Pfe</th>
                                        <th>Pcu</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transformerData.map((data) => (
                                        <tr key={`${data.area}-${data.month}-${data.year}`}>
                                            <td>{data.area}</td>
                                            <td>
                                                {editingId === data.id ? (
                                                    <Form.Select
                                                        value={editingValues.kva}
                                                        onChange={handleSelectChange}
                                                        disabled={loading}
                                                    >
                                                        {TRANSFORMER_OPTIONS.map((option) => (
                                                            <option key={option.kva} value={option.kva}>
                                                                {option.kva} kVA
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                ) : (
                                                    data.kva
                                                )}
                                            </td>
                                            <td>
                                                {editingId === data.id ? editingValues.pfe : data.pfe}
                                            </td>
                                            <td>
                                                {editingId === data.id ? editingValues.pcu : data.pcu}
                                            </td>
                                            <td>
                                                {editingId === data.id ? (
                                                    <>
                                                        <Button 
                                                            variant="success" 
                                                            size="sm" 
                                                            onClick={handleSaveEdit}
                                                            disabled={loading}
                                                            className="me-2"
                                                        >
                                                            {loading ? (
                                                                <Spinner as="span" animation="border" size="sm" />
                                                            ) : 'Guardar'}
                                                        </Button>
                                                        <Button 
                                                            variant="secondary" 
                                                            size="sm" 
                                                            onClick={handleCancelEdit}
                                                            disabled={loading}
                                                        >
                                                            Cancelar
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm"
                                                        onClick={() => handleStartEdit(data.id, data)}
                                                    >
                                                        Editar
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <div className="d-grid mt-3">
                                <Button 
                                    variant="dark" 
                                    size="lg" 
                                    onClick={handleDownload} 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                                    ) : (
                                        <i className="bi bi-file-earmark-excel me-2"></i>
                                    )}
                                    Generar Reporte de Pérdidas
                                </Button>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TransformerLossReport;

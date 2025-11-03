// import React, { useState } from 'react';
// import { Form, Button, Row, Col, Alert, Card, Container, Spinner } from 'react-bootstrap';
// import dailyReportApi from './api/daily_report_api';

// const DailyReport = () => {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleGenerateReport = async () => {
//         if (!selectedDate) {
//             setError('Por favor seleccione una fecha');
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const blob = await dailyReportApi.generateDailyReport(selectedDate);
            
//             // Crear enlace de descarga
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `Reporte_Diario_${selectedDate}.xlsx`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(url);
            
//         } catch (error) {
//             setError(error.message || 'Error al generar el reporte');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Container className="py-4">
//             <Card className="shadow-sm">
//                 <Card.Header className="bg-dark text-white">
//                     <h2 className="mb-0">Generar Reporte Diario</h2>
//                 </Card.Header>
//                 <Card.Body>
//                     {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                    
//                     <Row className="mb-4">
//                         <Col md={6}>
//                             <Form.Group controlId="formDate">
//                                 <Form.Label>Seleccione la fecha</Form.Label>
//                                 <Form.Control
//                                     type="date"
//                                     value={selectedDate}
//                                     onChange={(e) => setSelectedDate(e.target.value)}
//                                     disabled={loading}
//                                 />
//                                 <Form.Text className="text-muted">
//                                     Seleccione la fecha para la cual desea generar el reporte diario
//                                 </Form.Text>
//                             </Form.Group>
//                         </Col>
//                     </Row>
                    
//                     <Button
//                         variant="dark"
//                         onClick={handleGenerateReport}
//                         disabled={loading || !selectedDate}
//                         size="lg"
//                     >
//                         {loading ? (
//                             <>
//                                 <Spinner as="span" animation="border" size="sm" className="me-2" />
//                                 Generando Reporte...
//                             </>
//                         ) : (
//                             <>
//                                 <i className="bi bi-file-earmark-excel me-2"></i>
//                                 Generar Reporte Diario
//                             </>
//                         )}
//                     </Button>
                    
//                     <div className="mt-3">
//                         <Alert variant="info">
//                             <strong>Nota:</strong> Este reporte generará un archivo Excel con dos hojas:
//                             <ul className="mb-0 mt-2">
//                                 <li><strong>Modelo 5:</strong> Información del día seleccionado</li>
//                                 <li><strong>Lecturas pico:</strong> Datos heredados de la bitácora</li>
//                             </ul>
//                         </Alert>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default DailyReport;


// import React, { useState } from 'react';
// import { Form, Button, Row, Col, Alert, Card, Container, Spinner } from 'react-bootstrap';

// const DailyReport = () => {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleGenerateReport = async () => {
//         if (!selectedDate) {
//             setError('Por favor seleccione una fecha');
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(
//                 `http://127.0.0.1:8000/energetico_api/daily-report/?date=${selectedDate}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
            
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Error al generar el reporte');
//             }
            
//             const blob = await response.blob();
            
//             // Crear enlace de descarga
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `Reporte_Diario_${selectedDate}.xlsx`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(url);
            
//         } catch (error) {
//             setError(error.message || 'Error al generar el reporte');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Container className="py-4">
//             <Card className="shadow-sm">
//                 <Card.Header className="bg-dark text-white">
//                     <h2 className="mb-0">Generar Reporte Diario</h2>
//                 </Card.Header>
//                 <Card.Body>
//                     {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                    
//                     <Row className="mb-4">
//                         <Col md={6}>
//                             <Form.Group controlId="formDate">
//                                 <Form.Label>Seleccione la fecha</Form.Label>
//                                 <Form.Control
//                                     type="date"
//                                     value={selectedDate}
//                                     onChange={(e) => setSelectedDate(e.target.value)}
//                                     disabled={loading}
//                                 />
//                                 <Form.Text className="text-muted">
//                                     Seleccione la fecha para la cual desea generar el reporte diario
//                                 </Form.Text>
//                             </Form.Group>
//                         </Col>
//                     </Row>
                    
//                     <Button
//                         variant="dark"
//                         onClick={handleGenerateReport}
//                         disabled={loading || !selectedDate}
//                         size="lg"
//                     >
//                         {loading ? (
//                             <>
//                                 <Spinner as="span" animation="border" size="sm" className="me-2" />
//                                 Generando Reporte...
//                             </>
//                         ) : (
//                             <>
//                                 <i className="bi bi-file-earmark-excel me-2"></i>
//                                 Generar Reporte Diario
//                             </>
//                         )}
//                     </Button>
                    
//                     <div className="mt-3">
//                         <Alert variant="info">
//                             <strong>Nota:</strong> Este reporte generará un archivo Excel con dos hojas:
//                             <ul className="mb-0 mt-2">
//                                 <li><strong>Modelo 5:</strong> Información del día seleccionado</li>
//                                 <li><strong>Lecturas pico:</strong> Datos heredados de la bitácora</li>
//                             </ul>
//                         </Alert>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default DailyReport;


// import React, { useState } from 'react';
// import { Form, Button, Row, Col, Card, Container, Alert, Spinner } from 'react-bootstrap';
// import { dailyReportApi } from './service_api/daily_report_api';

// const DailyReportGenerator = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleGenerateReport = async () => {
//     if (!selectedDate) {
//       setError('Por favor seleccione una fecha');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const blob = await dailyReportApi.generateDailyReport(selectedDate);
      
//       // Crear enlace de descarga
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Reporte_Diario_${selectedDate}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       setSuccess(true);
//     } catch (err) {
//       setError(err.message || 'Error al generar el reporte');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-4">
//       <Card className="shadow-sm">
//         <Card.Header className="bg-dark text-white">
//           <h2 className="mb-0">Generar Reporte Diario</h2>
//         </Card.Header>
//         <Card.Body>
//           {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
//           {success && <Alert variant="success">Reporte generado y descargado exitosamente</Alert>}

//           <Form>
//             <Row className="mb-4">
//               <Col md={6}>
//                 <Form.Group controlId="formDate">
//                   <Form.Label>Seleccione la fecha para el reporte</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     max={new Date().toISOString().split('T')[0]}
//                   />
//                   <Form.Text className="text-muted">
//                     Seleccione la fecha para la cual desea generar el reporte diario
//                   </Form.Text>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Button
//               variant="primary"
//               onClick={handleGenerateReport}
//               disabled={loading || !selectedDate}
//               size="lg"
//             >
//               {loading ? (
//                 <>
//                   <Spinner as="span" animation="border" size="sm" className="me-2" />
//                   Generando Reporte...
//                 </>
//               ) : (
//                 <>
//                   <i className="bi bi-file-earmark-excel me-2"></i>
//                   Generar Reporte Diario
//                 </>
//               )}
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default DailyReportGenerator;


// import React, { useState } from 'react';
// import { Form, Button, Row, Col, Card, Container, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
// import { dailyReportApi } from './service_api/daily_report_api';
// import DiaryStaticManager from './diarystaticmanager';

// const DailyReportGenerator = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [staticAreas, setStaticAreas] = useState([]);

//   const handleGenerateReport = async () => {
//     if (!selectedDate) {
//       setError('Por favor seleccione una fecha');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const blob = await dailyReportApi.generateDailyReport(selectedDate);
      
//       // Crear enlace de descarga
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Reporte_Diario_${selectedDate}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       setSuccess(true);
//     } catch (err) {
//       setError(err.message || 'Error al generar el reporte');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-4">
//       <Tabs defaultActiveKey="report" id="daily-report-tabs">
//         <Tab eventKey="report" title="Generar Reporte">
//           <Card className="shadow-sm mt-3">
//             <Card.Header className="bg-primary text-white">
//               <h2 className="mb-0">Generar Reporte Diario</h2>
//             </Card.Header>
//             <Card.Body>
//               {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
//               {success && <Alert variant="success">Reporte generado y descargado exitosamente</Alert>}

//               <Form>
//                 <Row className="mb-4">
//                   <Col md={6}>
//                     <Form.Group controlId="formDate">
//                       <Form.Label>Seleccione la fecha para el reporte</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                         max={new Date().toISOString().split('T')[0]}
//                       />
//                       <Form.Text className="text-muted">
//                         Seleccione la fecha para la cual desea generar el reporte diario
//                       </Form.Text>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Button
//                   variant="primary"
//                   onClick={handleGenerateReport}
//                   disabled={loading || !selectedDate}
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Spinner as="span" animation="border" size="sm" className="me-2" />
//                       Generando Reporte...
//                     </>
//                   ) : (
//                     <>
//                       <i className="bi bi-file-earmark-excel me-2"></i>
//                       Generar Reporte Diario
//                     </>
//                   )}
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Tab>
        
//         <Tab eventKey="static" title="Áreas Estáticas">
//           <DiaryStaticManager onStaticAreasChange={setStaticAreas} />
//         </Tab>
//       </Tabs>
//     </Container>
//   );
// };

// export default DailyReportGenerator;

// report-diary.jsx - Mejorar manejo de errores
import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Container, Alert, Spinner } from 'react-bootstrap';
import { dailyReportApi } from './service_api/daily_report_api';
import StaticAreasManagement from './diarystaticmanager';

const DailyReportGenerator = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // const handleGenerateReport = async () => {
  //   if (!selectedDate) {
  //     setError('Por favor seleccione una fecha');
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);
  //   setSuccess(false);

  //   try {
  //     const blob = await dailyReportApi.generateDailyReport(selectedDate);
      
  //     // Crear enlace de descarga
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `Reporte_Diario_${selectedDate}.xlsx`);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //     window.URL.revokeObjectURL(url);

  //     setSuccess(true);
  //   } catch (err) {
  //     // Mostrar mensajes de error más específicos
  //     setError(err.message || 'Error desconocido al generar el reporte');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleGenerateReport = async () => {
    if (!selectedDate) {
        setError('Por favor seleccione una fecha');
        return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const blob = await dailyReportApi.generateDailyReport(selectedDate);
        
        // Crear enlace de descarga
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Reporte_Diario_${selectedDate}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        setSuccess(true);
    } catch (err) {
        // Mensajes de error más específicos
        if (err.message.includes('No hay datos disponibles')) {
            setError(`No se encontraron datos de áreas dinámicas para la fecha ${selectedDate}. Asegúrese de que existen registros para este mes.`);
        } else if (err.message.includes('Plantilla de Excel no encontrada')) {
            setError('Error del sistema: No se encuentra la plantilla de reporte.');
        } else {
            setError(err.message || 'Error desconocido al generar el reporte');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-dark text-white">
          <h2 className="mb-0">Generar Reporte Diario</h2>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              <strong>Error:</strong> {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <strong>Éxito:</strong> Reporte generado y descargado exitosamente
            </Alert>
          )}

          <Form>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="formDate">
                  <Form.Label>Seleccione la fecha para el reporte</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    isInvalid={!!error && !selectedDate}
                  />
                  <Form.Text className="text-muted">
                    Seleccione la fecha para la cual desea generar el reporte diario
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <StaticAreasManagement/>

            <Button
              variant="dark"
              onClick={handleGenerateReport}
              disabled={loading || !selectedDate}
              size="lg"
            >
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Generando Reporte...
                </>
              ) : (
                <>
                  <i className="bi bi-file-earmark-excel me-2"></i>
                  Generar Reporte Diario
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DailyReportGenerator;


// import React, { useState } from 'react';
// import { Form, Button, Row, Col, Card, Container, Alert, Spinner } from 'react-bootstrap';
// import { dailyReportApi } from './service_api/daily_report_api';
// import StaticAreasManagement from './diarystaticmanager';

// const DailyReportGenerator = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [showStaticAreas, setShowStaticAreas] = useState(false);

//   const handleGenerateReport = async () => {
//     if (!selectedDate) {
//       setError('Por favor seleccione una fecha');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const blob = await dailyReportApi.generateDailyReport(selectedDate);
      
//       // Crear enlace de descarga
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Reporte_Diario_${selectedDate}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       setSuccess(true);
//     } catch (err) {
//       // Mostrar mensajes de error más específicos
//       setError(err.message || 'Error desconocido al generar el reporte');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-4">
//       <Card className="shadow-sm">
//         <Card.Header className="bg-dark text-white">
//           <h2 className="mb-0">Generar Reporte Diario</h2>
//         </Card.Header>
//         <Card.Body>
//           {error && (
//             <Alert variant="danger" onClose={() => setError(null)} dismissible>
//               <strong>Error:</strong> {error}
//             </Alert>
//           )}
//           {success && (
//             <Alert variant="success">
//               <strong>Éxito:</strong> Reporte generado y descargado exitosamente
//             </Alert>
//           )}

//           <Form>
//             <Row className="mb-4">
//               <Col md={6}>
//                 <Form.Group controlId="formDate">
//                   <Form.Label>Seleccione la fecha para el reporte</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     max={new Date().toISOString().split('T')[0]}
//                     isInvalid={!!error && !selectedDate}
//                   />
//                   <Form.Text className="text-muted">
//                     Seleccione la fecha para la cual desea generar el reporte diario.
//                     El reporte incluirá tanto áreas estáticas como dinámicas.
//                   </Form.Text>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-4">
//               <Col>
//                 <Button
//                   variant="outline-dark"
//                   onClick={() => setShowStaticAreas(!showStaticAreas)}
//                   className="mb-3"
//                 >
//                   <i className={`bi bi-${showStaticAreas ? 'chevron-up' : 'chevron-down'} me-2`}></i>
//                   {showStaticAreas ? 'Ocultar' : 'Mostrar'} Gestión de Áreas Estáticas
//                 </Button>
                
//                 {showStaticAreas && <StaticAreasManagement />}
//               </Col>
//             </Row>

//             <Button
//               variant="dark"
//               onClick={handleGenerateReport}
//               disabled={loading || !selectedDate}
//               size="lg"
//             >
//               {loading ? (
//                 <>
//                   <Spinner as="span" animation="border" size="sm" className="me-2" />
//                   Generando Reporte...
//                 </>
//               ) : (
//                 <>
//                   <i className="bi bi-file-earmark-excel me-2"></i>
//                   Generar Reporte Diario
//                 </>
//               )}
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default DailyReportGenerator;

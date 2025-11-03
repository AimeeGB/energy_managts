// import React, { useState, useEffect } from 'react';
// import { Form, Button, Row, Col, Tab, Tabs, Table, Alert, Modal, Card, Spinner, Container, Badge } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import api from './service_api/bitacora_api';

// const TablaBitacora = () => {
//     const areas = [
//         { id: 'Cocina C', name: 'Cocina Comedor', default_plan: 21000 },
//         { id: 'Ciencia A', name: 'Ciencia Animal', default_plan: 26000 },
//         { id: 'Preparatoria', name: 'Preparatoria', default_plan: 10000 },
//         { id: 'Sede Martí', name: 'José Martí', default_plan: 20000 },
//         { id: 'A.Cultural', name: 'Área Cultural', default_plan: 26000 },
//         { id: 'Laboratorios Tec.', name: 'Laboratorios Técnicos', default_plan: 10000 },
//         { id: 'Sede Fajardo', name: 'Manuel Fajardo', default_plan: 5430 },
//     ];

//     const [formData, setFormData] = useState({
//         month: new Date().getMonth() + 1,
//         year: new Date().getFullYear(),
//         perdidas: '',
//         plan_mes: '',
//     });

//     const monthNames = {
//         1: "ENERO", 2: "FEBRERO", 3: "MARZO", 4: "ABRIL", 5: "MAYO", 6: "JUNIO",
//         7: "JULIO", 8: "AGOSTO", 9: "SEPTIEMBRE", 10: "OCTUBRE", 11: "NOVIEMBRE", 12: "DICIEMBRE"
//     };

//     const [activeTab, setActiveTab] = useState('Cocina C');
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState(null);
//     const [showCierreModal, setShowCierreModal] = useState(false);
//     const [unsavedChanges, setUnsavedChanges] = useState({});
//     const [showUnsavedModal, setShowUnsavedModal] = useState(false);
//     const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const [pendingTab, setPendingTab] = useState(null);
//     const navigate = useNavigate();

//     const getDaysInMonth = (month, year) => {
//         return new Date(year, month, 0).getDate();
//     };

//     const [dailyData, setDailyData] = useState(() => {
//         const initialDailyData = {};
//         const daysInMonth = getDaysInMonth(formData.month, formData.year);
//         areas.forEach(area => {
//             initialDailyData[area.id] = Array.from({length: daysInMonth}, (_, i) => ({
//                 day: i + 1,
//                 mad: '',
//                 dia: '',
//                 pico: '',
//                 react: '',
//             }));
//         });
//         return initialDailyData;
//     });

//     const [cierreData, setCierreData] = useState(() => {
//         const initialCierreData = {};
//         areas.forEach(area => {
//             initialCierreData[area.id] = {
//                 mad_cierre: '',
//                 dia_cierre: '',
//                 pico_cierre: '',
//                 total_cierre: '',
//                 pico_diurno_11am_cierre: '',
//                 pico_diurno_1pm_cierre: '',
//                 react_cierre: ''
//             };
//         });
//         return initialCierreData;
//     });

//     const hasUnsavedChanges = (area) => {
//         return unsavedChanges[area] || false;
//     };

//     const markUnsavedChanges = (area) => {
//         setUnsavedChanges(prev => ({ ...prev, [area]: true }));
//     };

//     const handleTabChange = (tab) => {
//         if (hasUnsavedChanges(activeTab)) {
//             setPendingTab(tab);
//             setShowUnsavedModal(true);
//         } else {
//             setActiveTab(tab);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'month' || name === 'year') {
//             const newMonth = name === 'month' ? parseInt(value) : formData.month;
//             const newYear = name === 'year' ? parseInt(value) : formData.year;
//             const daysInMonth = getDaysInMonth(newMonth, newYear);

//             setDailyData(prev => {
//                 const newDailyData = {};
//                 areas.forEach(area => {
//                     const currentData = prev[area.id] || [];
//                     newDailyData[area.id] = Array.from({length: daysInMonth}, (_, i) => {
//                         return i < currentData.length ? currentData[i] : {
//                             day: i + 1,
//                             mad: '',
//                             dia: '',
//                             pico: '',
//                             react: '',
//                         };
//                     });
//                 });
//                 return newDailyData;
//             });
//         }

//         setFormData(prev => ({ ...prev, [name]: value }));
//         markUnsavedChanges(activeTab);
//     };

//     const handleDailyDataChange = (area, day, field, value) => {
//         setDailyData(prev => ({
//             ...prev,
//             [area]: prev[area].map(item => 
//                 item.day === day ? { ...item, [field]: value } : item
//             )
//         }));
//         markUnsavedChanges(area);
//     };

//     const handleCierreDataChange = (area, field, value) => {
//         setCierreData(prev => ({
//             ...prev,
//             [area]: { ...prev[area], [field]: value }
//         }));
//         markUnsavedChanges(area);
//     };

//     const checkEmptyFieldsBeforeLastDay = (areaData) => {
//         let lastDayWithData = 0;
//         for (let i = 0; i < areaData.length; i++) {
//             const dayData = areaData[i];
//             if (dayData.mad || dayData.dia || dayData.pico || dayData.react) {
//                 lastDayWithData = dayData.day;
//             }
//         }

//         for (let i = 0; i < areaData.length && areaData[i].day <= lastDayWithData; i++) {
//             const dayData = areaData[i];
//             if (!dayData.mad || !dayData.dia || !dayData.pico || !dayData.react) {
//                 return dayData.day;
//             }
//         }
//         return null;
//     };

//     //Codigo de funcional 03/05/25
//     // const loadDataAutomatically = async () => {
//     //     try {
//     //         const data = await api.getEnergyData(activeTab, formData.month, formData.year);
//     //         const daysInMonth = getDaysInMonth(formData.month, formData.year);

//     //         if (data) {
//     //             setFormData(prev => ({
//     //                 ...prev,
//     //                 perdidas: data.perdidas || '',
//     //                 plan_mes: data.plan_mes || ''
//     //             }));

//     //             const newDailyData = Array.from({length: daysInMonth}, (_, i) => {
//     //                 const dayData = (data.daily_data || []).find(d => d.day === i+1) || {};
//     //                 return {
//     //                     day: i+1,
//     //                     mad: dayData.mad || '',
//     //                     dia: dayData.dia || '',
//     //                     pico: dayData.pico || '',
//     //                     react: dayData.react || ''
//     //                 };
//     //             });

//     //             setDailyData(prev => ({ ...prev, [activeTab]: newDailyData }));
//     //             setUnsavedChanges(prev => ({ ...prev, [activeTab]: false }));

//     //             const firstDayData = data.daily_data?.[0] || {};
//     //             setCierreData(prev => ({
//     //                 ...prev,
//     //                 [activeTab]: {
//     //                     mad_cierre: firstDayData.mad_cierre || '',
//     //                     dia_cierre: firstDayData.dia_cierre || '',
//     //                     pico_cierre: firstDayData.pico_cierre || '',
//     //                     total_cierre: firstDayData.total_cierre || '',
//     //                     pico_diurno_11am_cierre: firstDayData.pico_diurno_11am_cierre || '',
//     //                     pico_diurno_1pm_cierre: firstDayData.pico_diurno_1pm_cierre || '',
//     //                     react_cierre: firstDayData.react_cierre || ''
//     //                 }
//     //             }));
//     //         } else {
//     //             setDailyData(prev => ({
//     //                 ...prev,
//     //                 [activeTab]: Array.from({length: daysInMonth}, (_, i) => ({
//     //                     day: i + 1,
//     //                     mad: '',
//     //                     dia: '',
//     //                     pico: '',
//     //                     react: ''
//     //                 }))
//     //             }));

//     //             setCierreData(prev => ({
//     //                 ...prev,
//     //                 [activeTab]: {
//     //                     mad_cierre: '',
//     //                     dia_cierre: '',
//     //                     pico_cierre: '',
//     //                     total_cierre: '',
//     //                     pico_diurno_11am_cierre: '',
//     //                     pico_diurno_1pm_cierre: '',
//     //                     react_cierre: ''
//     //                 }
//     //             }));
//     //         }
//     //     } catch (error) {
//     //         console.error('Error al cargar datos automáticamente:', error);
//     //         const daysInMonth = getDaysInMonth(formData.month, formData.year);

//     //         setDailyData(prev => ({
//     //             ...prev,
//     //             [activeTab]: Array.from({length: daysInMonth}, (_, i) => ({
//     //                 day: i + 1,
//     //                 mad: '',
//     //                 dia: '',
//     //                 pico: '',
//     //                 react: ''
//     //             }))
//     //         }));

//     //         setCierreData(prev => ({
//     //             ...prev,
//     //             [activeTab]: {
//     //                 mad_cierre: '',
//     //                 dia_cierre: '',
//     //                 pico_cierre: '',
//     //                 total_cierre: '',
//     //                 pico_diurno_11am_cierre: '',
//     //                 pico_diurno_1pm_cierre: '',
//     //                 react_cierre: ''
//     //             }
//     //         }));
//     //     }
//     // };


//     //Codigo de funcional 04/05/25
//     const loadDataAutomatically = async () => {
//         try {
//             const data = await api.getEnergyData(activeTab, formData.month, formData.year);
//             const daysInMonth = getDaysInMonth(formData.month, formData.year);

//             if (data) {
//                 setFormData(prev => ({
//                     ...prev,
//                     perdidas: data.perdidas || '',
//                     plan_mes: data.plan_mes || ''
//                 }));

//                 const newDailyData = Array.from({length: daysInMonth}, (_, i) => {
//                     const dayData = (data.daily_data || []).find(d => d.day === i+1) || {};
//                     return {
//                         day: i+1,
//                         mad: dayData.mad || '',
//                         dia: dayData.dia || '',
//                         pico: dayData.pico || '',
//                         react: dayData.react || ''
//                     };
//                 });

//                 setDailyData(prev => ({ ...prev, [activeTab]: newDailyData }));
//                 setUnsavedChanges(prev => ({ ...prev, [activeTab]: false }));

//                 const firstDayData = data.daily_data?.[0] || {};
//                 setCierreData(prev => ({
//                     ...prev,
//                     [activeTab]: {
//                         mad_cierre: firstDayData.mad_cierre || '',
//                         dia_cierre: firstDayData.dia_cierre || '',
//                         pico_cierre: firstDayData.pico_cierre || '',
//                         total_cierre: firstDayData.total_cierre || '',
//                         pico_diurno_11am_cierre: firstDayData.pico_diurno_11am_cierre || '',
//                         pico_diurno_1pm_cierre: firstDayData.pico_diurno_1pm_cierre || '',
//                         react_cierre: firstDayData.react_cierre || ''
//                     }
//                 }));
//             } else {
//                 setDailyData(prev => ({
//                     ...prev,
//                     [activeTab]: Array.from({length: daysInMonth}, (_, i) => ({
//                         day: i + 1,
//                         mad: '',
//                         dia: '',
//                         pico: '',
//                         react: ''
//                     }))
//                 }));

//                 setCierreData(prev => ({
//                     ...prev,
//                     [activeTab]: {
//                         mad_cierre: '',
//                         dia_cierre: '',
//                         pico_cierre: '',
//                         total_cierre: '',
//                         pico_diurno_11am_cierre: '',
//                         pico_diurno_1pm_cierre: '',
//                         react_cierre: ''
//                     }
//                 }));
//             }
//         } catch (error) {
//             console.error('Error al cargar datos automáticamente:', error);
//             const daysInMonth = getDaysInMonth(formData.month, formData.year);

//             setDailyData(prev => ({
//                 ...prev,
//                 [activeTab]: Array.from({length: daysInMonth}, (_, i) => ({
//                     day: i + 1,
//                     mad: '',
//                     dia: '',
//                     pico: '',
//                     react: ''
//                 }))
//             }));

//             setCierreData(prev => ({
//                 ...prev,
//                 [activeTab]: {
//                     mad_cierre: '',
//                     dia_cierre: '',
//                     pico_cierre: '',
//                     total_cierre: '',
//                     pico_diurno_11am_cierre: '',
//                     pico_diurno_1pm_cierre: '',
//                     react_cierre: ''
//                 }
//             }));
//         }
//     };

//     useEffect(() => {
//         loadDataAutomatically();
//     }, [formData.month, formData.year, activeTab]);


//     //Codigo funcional 03/05/25
//     // const saveAreaData = async (area) => {
//     //     setSaving(true);
//     //     setError(null);

//     //     try {
//     //         const currentDailyData = dailyData[area] || [];
//     //         const emptyDay = checkEmptyFieldsBeforeLastDay(currentDailyData);
//     //         if (emptyDay) {
//     //             throw new Error(`Hay campos vacíos en el día ${emptyDay} del área ${area}. Por favor complete todos los datos hasta el último día registrado.`);
//     //         }

//     //         const payload = {
//     //             area: area,
//     //             month: formData.month,
//     //             year: formData.year,
//     //             plan_mes: formData.plan_mes || areas.find(a => a.id === area)?.default_plan,
//     //             perdidas: formData.perdidas,
//     //             daily_data: currentDailyData
//     //                 .filter(item => item && (item.mad || item.dia || item.pico || item.react))
//     //                 .map(item => ({
//     //                     day: item.day,
//     //                     mad: item.mad,
//     //                     dia: item.dia,
//     //                     pico: item.pico,
//     //                     react: item.react,
//     //                     mad_cierre: cierreData[area]?.mad_cierre || '',
//     //                     dia_cierre: cierreData[area]?.dia_cierre || '',
//     //                     pico_cierre: cierreData[area]?.pico_cierre || '',
//     //                     total_cierre: cierreData[area]?.total_cierre || '',
//     //                     pico_diurno_11am_cierre: cierreData[area]?.pico_diurno_11am_cierre || '',
//     //                     pico_diurno_1pm_cierre: cierreData[area]?.pico_diurno_1pm_cierre || '',
//     //                     react_cierre: cierreData[area]?.react_cierre || ''
//     //                 }))
//     //         };

//     //         const existingData = await api.getEnergyData(area, formData.month, formData.year);
//     //         if (existingData) {
//     //             await api.updateEnergyConsumption(area, formData.month, formData.year, payload);
//     //         } else {
//     //             await api.createEnergyConsumption(payload);
//     //         }

//     //         setUnsavedChanges(prev => ({ ...prev, [area]: false }));
//     //         return true;
//     //     } catch (error) {
//     //         console.error(`Error al guardar datos del área ${area}:`, error);
//     //         setError(error.message || `Ocurrió un error al guardar los datos del área ${area}.`);
//     //         return false;
//     //     } finally {
//     //         setSaving(false);
//     //     }
//     // };


//     //Codigo de funcional 04/05/25
//     const saveAreaData = async (area) => {
//         setSaving(true);
//         setError(null);
//         try {
//             const currentDailyData = dailyData[area] || [];
//             const emptyDay = checkEmptyFieldsBeforeLastDay(currentDailyData);
//             if (emptyDay) {
//                 throw new Error(`Hay campos vacíos en el día ${emptyDay} del área ${area}. Por favor complete todos los datos hasta el último día registrado.`);
//             }

//             const payload = {
//                 area: area,
//                 month: formData.month,
//                 year: formData.year,
//                 plan_mes: formData.plan_mes || areas.find(a => a.id === area)?.default_plan,
//                 perdidas: formData.perdidas,
//                 daily_data: currentDailyData
//                     .filter(item => item && (item.mad || item.dia || item.pico || item.react))
//                     .map(item => ({
//                         day: item.day,
//                         mad: item.mad,
//                         dia: item.dia,
//                         pico: item.pico,
//                         react: item.react,
//                         mad_cierre: cierreData[area]?.mad_cierre || '',
//                         dia_cierre: cierreData[area]?.dia_cierre || '',
//                         pico_cierre: cierreData[area]?.pico_cierre || '',
//                         total_cierre: cierreData[area]?.total_cierre || '',
//                         pico_diurno_11am_cierre: cierreData[area]?.pico_diurno_11am_cierre || '',
//                         pico_diurno_1pm_cierre: cierreData[area]?.pico_diurno_1pm_cierre || '',
//                         react_cierre: cierreData[area]?.react_cierre || ''
//                     }))
//             };

//             const existingData = await api.getEnergyData(area, formData.month, formData.year);
//             if (existingData) {
//                 await api.updateEnergyConsumption(area, formData.month, formData.year, payload);
//             } else {
//                 await api.createEnergyConsumption(payload);
//             }

//             setUnsavedChanges(prev => ({ ...prev, [area]: false }));
//             return true;
//         } catch (error) {
//             console.error(`Error al guardar datos del área ${area}:`, error);
//             setError(error.message || `Ocurrió un error al guardar los datos del área ${area}.`);
//             return false;
//         } finally {
//             setSaving(false);
//         }
//     };

//     const saveAllData = async () => {
//         setSaving(true);
//         setError(null);

//         try {
//             for (const area of areas) {
//                 if (hasUnsavedChanges(area.id)) {
//                     const success = await saveAreaData(area.id);
//                     if (!success) return;
//                 }
//             }
//         } finally {
//             setSaving(false);
//         }
//     };

//     const generateExcelReport = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             await saveAllData();

//             const blob = await api.downloadExcel(
//                 formData.month,
//                 formData.year,
//                 formData.plan_mes || areas.find(a => a.id === activeTab)?.default_plan
//             );

//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `Tabla R 1A-Bitacora ${monthNames[formData.month]} ${formData.year}.xlsx`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(url);

//             // navigate('/success');
//             setShowSuccessModal(true);
//         } catch (error) {
//             console.error('Error al generar Excel:', error);
//             setError(error.message || 'Ocurrió un error al generar el reporte. Por favor intente nuevamente.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const daysInMonth = getDaysInMonth(formData.month, formData.year);

//     return (
//         <Container className="py-4">
//             <Card className="shadow-sm">
//                 <Card.Header className="bg-dark text-white">
//                     <h2 className="mb-0">Registro de Consumo de Energía</h2>
//                 </Card.Header>
//                 <Card.Body>
//                     {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

//                     <Form>
//                         <Row className="mb-4 g-3">
//                             <Col md={2}>
//                                 <Form.Group controlId="formMonth">
//                                     <Form.Label>Mes</Form.Label>
//                                     <Form.Select 
//                                         name="month" 
//                                         value={formData.month} 
//                                         onChange={handleChange} 
//                                         required 
//                                         disabled={loading || saving}
//                                     >
//                                         {Array.from({length: 12}, (_, i) => (
//                                             <option key={i+1} value={i+1}>
//                                                 {new Date(2000, i, 1).toLocaleString('default', {month: 'long'})}
//                                             </option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </Col>

//                             <Col md={2}>
//                                 <Form.Group controlId="formYear">
//                                     <Form.Label>Año</Form.Label>
//                                     <Form.Control 
//                                         type="number" 
//                                         name="year" 
//                                         value={formData.year} 
//                                         onChange={handleChange} 
//                                         min="2000" 
//                                         max="2100" 
//                                         required 
//                                         disabled={loading || saving}
//                                     />
//                                 </Form.Group>
//                             </Col>

//                             <Col md={2}>
//                                 <Form.Group controlId="formPerdidas">
//                                     <Form.Label>Pérdidas (kWh)</Form.Label>
//                                     <Form.Control 
//                                         type="number" 
//                                         name="perdidas" 
//                                         value={formData.perdidas} 
//                                         onChange={handleChange} 
//                                         step="0.01" 
//                                         required 
//                                         disabled={loading || saving}
//                                     />
//                                 </Form.Group>
//                             </Col>

//                             <Col md={3}>
//                                 <Form.Group controlId="formPlanMes">
//                                     <Form.Label>Plan del Mes (kWh)</Form.Label>
//                                     <Form.Control 
//                                         type="number" 
//                                         name="plan_mes" 
//                                         value={formData.plan_mes} 
//                                         onChange={handleChange} 
//                                         step="1" 
//                                         placeholder={`Valor por defecto: ${areas.find(a => a.id === activeTab)?.default_plan || ''}`}
//                                         disabled={loading || saving}
//                                     />
//                                 </Form.Group>
//                             </Col>

//                             <Col md={3} className="d-flex align-items-end">
//                                 <Button 
//                                     variant="outline-dark" 
//                                     onClick={() => setShowCierreModal(true)} 
//                                     disabled={loading || saving}
//                                 >
//                                     <i className="bi bi-calendar-check me-2"></i> 
//                                     Datos de Cierre
//                                 </Button>
//                             </Col>
//                         </Row>

//                         <Row className="mb-4 g-3">
//                             <Col md={3}>
//                                 <Button 
//                                     variant="dark" 
//                                     onClick={generateExcelReport}
//                                     disabled={loading || saving}
//                                     size="lg" 
//                                     className="mt-3"
//                                 >
//                                     {loading ? (
//                                         <>
//                                             <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
//                                             Generando Reporte...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <i className="bi bi-file-earmark-excel me-2"></i>
//                                             Generar Reporte Excel
//                                         </>
//                                     )}
//                                 </Button>
//                             </Col>

//                             <Col md={4}>
//                                 <Button 
//                                     variant="dark" 
//                                     onClick={() => navigate(`/energetico-transformacionElectrica`)} 
//                                     size="lg" 
//                                     className="mt-3"
//                                 >
//                                     <i className="bi bi-lightning-charge me-2"></i>
//                                     Generar Reporte de Pérdidas
//                                 </Button>
//                             </Col>
//                         </Row>

//                         <Tabs 
//                             activeKey={activeTab} 
//                             onSelect={handleTabChange} 
//                             className="mb-3" 
//                             id="area-tabs"
//                         >
//                             {areas.map(area => (
//                                 <Tab 
//                                     key={area.id} 
//                                     eventKey={area.id} 
//                                     title={
//                                         <div className="d-flex align-items-center">
//                                             <i className="bi bi-building me-1"></i>
//                                             <span className="me-2">{area.name}</span>
//                                             {hasUnsavedChanges(area.id) && (
//                                                 <Badge bg="warning" text="dark">!</Badge>
//                                             )}
//                                         </div>
//                                     }
//                                 >
//                                     <div className="mt-3">
//                                         <div className="d-flex justify-content-between align-items-center mb-3">
//                                             <h4>
//                                                 <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
//                                                 {area.name} - Datos Diarios ({daysInMonth} días)
//                                             </h4>
//                                             <Button 
//                                                 variant={hasUnsavedChanges(area.id) ? "warning" : "outline-dark"}
//                                                 onClick={() => saveAreaData(area.id)}
//                                                 disabled={saving || !hasUnsavedChanges(area.id)}
//                                                 size="sm"
//                                             >
//                                                 {saving ? (
//                                                     <Spinner as="span" animation="border" size="sm" />
//                                                 ) : (
//                                                     <>
//                                                         <i className="bi bi-save me-1"></i>
//                                                         Guardar Datos
//                                                     </>
//                                                 )}
//                                             </Button>
//                                         </div>

//                                         <p className="text-muted mb-3">
//                                             Plan del mes: <strong>{formData.plan_mes || area.default_plan} kWh</strong>
//                                         </p>

//                                         <div className="table-responsive">
//                                             <Table bordered hover className="align-middle">
//                                                 <thead className="table-dark">
//                                                     <tr>
//                                                         <th width="10%">Día</th>
//                                                         <th width="22.5%">MAD</th>
//                                                         <th width="22.5%">DIA</th>
//                                                         <th width="22.5%">PICO</th>
//                                                         <th width="22.5%">REACT</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {(dailyData[area.id] || []).slice(0, daysInMonth).map((dayData) => (
//                                                         <tr key={dayData.day}>
//                                                             <td className="fw-bold">{dayData.day}</td>
//                                                             <td>
//                                                                 <Form.Control 
//                                                                     type="number" 
//                                                                     value={dayData.mad} 
//                                                                     onChange={(e) => handleDailyDataChange(
//                                                                         area.id, 
//                                                                         dayData.day, 
//                                                                         'mad', 
//                                                                         e.target.value
//                                                                     )}
//                                                                     step="0.01" 
//                                                                     size="sm" 
//                                                                     disabled={loading || saving}
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <Form.Control 
//                                                                     type="number" 
//                                                                     value={dayData.dia} 
//                                                                     onChange={(e) => handleDailyDataChange(
//                                                                         area.id, 
//                                                                         dayData.day, 
//                                                                         'dia', 
//                                                                         e.target.value
//                                                                     )}
//                                                                     step="0.01" 
//                                                                     size="sm" 
//                                                                     disabled={loading || saving}
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <Form.Control 
//                                                                     type="number" 
//                                                                     value={dayData.pico} 
//                                                                     onChange={(e) => handleDailyDataChange(
//                                                                         area.id, 
//                                                                         dayData.day, 
//                                                                         'pico', 
//                                                                         e.target.value
//                                                                     )}
//                                                                     step="0.01" 
//                                                                     size="sm" 
//                                                                     disabled={loading || saving}
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <Form.Control 
//                                                                     type="number" 
//                                                                     value={dayData.react} 
//                                                                     onChange={(e) => handleDailyDataChange(
//                                                                         area.id, 
//                                                                         dayData.day, 
//                                                                         'react', 
//                                                                         e.target.value
//                                                                     )}
//                                                                     step="0.01" 
//                                                                     size="sm" 
//                                                                     disabled={loading || saving}
//                                                                 />
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </Table>
//                                         </div>
//                                     </div>
//                                 </Tab>
//                             ))}
//                         </Tabs>
//                     </Form>
//                 </Card.Body>
//             </Card>

//             {/* Modal para datos de cierre del mes anterior */}
//             <Modal show={showCierreModal} onHide={() => setShowCierreModal(false)} size="lg" centered>
//                 <Modal.Header closeButton className="bg-dark text-white">
//                     <Modal.Title>
//                         <i className="bi bi-calendar-check me-2"></i>
//                         Datos de Cierre del Mes Anterior
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3">
//                         {areas.map(area => (
//                             <Tab key={area.id} eventKey={area.id} title={area.name}>
//                                 <div className="mt-3">
//                                     <h5 className="mb-4">
//                                         <i className="bi bi-building me-2"></i>
//                                         {area.name}
//                                     </h5>
//                                     <Row className="g-3">
//                                         <Col md={3}>
//                                             <Form.Group controlId={`madCierre-${area.id}`}>
//                                                 <Form.Label>MAD Cierre</Form.Label>
//                                                 <Form.Control 
//                                                     type="number" 
//                                                     value={cierreData[area.id]?.mad_cierre || ''} 
//                                                     onChange={(e) => handleCierreDataChange(
//                                                         area.id, 
//                                                         'mad_cierre', 
//                                                         e.target.value
//                                                     )}
//                                                     step="0.01" 
//                                                     disabled={loading || saving}
//                                                 />
//                                             </Form.Group>
//                                         </Col>
//                                         <Col md={3}>
//                                             <Form.Group controlId={`diaCierre-${area.id}`}>
//                                                 <Form.Label>DIA Cierre</Form.Label>
//                                                 <Form.Control 
//                                                     type="number" 
//                                                     value={cierreData[area.id]?.dia_cierre || ''} 
//                                                     onChange={(e) => handleCierreDataChange(
//                                                         area.id, 
//                                                         'dia_cierre', 
//                                                         e.target.value
//                                                     )}
//                                                     step="0.01" 
//                                                     disabled={loading || saving}
//                                                 />
//                                             </Form.Group>
//                                         </Col>
//                                         <Col md={3}>
//                                             <Form.Group controlId={`picoCierre-${area.id}`}>
//                                                 <Form.Label>PICO Cierre</Form.Label>
//                                                 <Form.Control 
//                                                     type="number" 
//                                                     value={cierreData[area.id]?.pico_cierre || ''} 
//                                                     onChange={(e) => handleCierreDataChange(
//                                                         area.id, 
//                                                         'pico_cierre', 
//                                                         e.target.value
//                                                     )}
//                                                     step="0.01" 
//                                                     disabled={loading || saving}
//                                                 />
//                                             </Form.Group>
//                                         </Col>
//                                         <Col md={3}>
//                                             <Form.Group controlId={`totalCierre-${area.id}`}>
//                                                 <Form.Label>TOTAL Cierre</Form.Label>
//                                                 <Form.Control 
//                                                     type="number" 
//                                                     value={cierreData[area.id]?.total_cierre || ''} 
//                                                     onChange={(e) => handleCierreDataChange(
//                                                         area.id, 
//                                                         'total_cierre', 
//                                                         e.target.value
//                                                     )}
//                                                     step="0.01" 
//                                                     disabled={loading || saving}
//                                                 />
//                                             </Form.Group>
//                                         </Col>
//                                         <Col md={4}>
//                                             <Form.Group controlId={`pico11amCierre-${area.id}`}>
//                                                 <Form.Label>Pico Diurno 11 am</Form.Label>
//                                                 <Form.Control 
//                                                     type="number" 
//                                                     value={cierreData[area.id]?.pico_diurno_11am_cierre || ''} 
//                                                     onChange={(e) => handleCierreDataChange(
//                                                         area.id, 
//                                                         'pico_diurno_11am_cierre', 
//                                                         e.target.value
//                                                     )}
//                                                     step="0.01" 
//                                                     disabled={loading || saving}
//                                                 />
//                                             </Form.Group>
//                                         </Col>
//                                         <Col md={4}>
//                                             <Form.Group controlId={`pico1pmCierre-${area.id}`}>
//                                                 <Form.Label>Pico Diurno 1 pm</Form.Label>
//                                                 <Form.Control 
//                                                     type="number" 
//                                                     value={cierreData[area.id]?.pico_diurno_1pm_cierre || ''} 
//                                                     onChange={(e) => handleCierreDataChange(
//                                                         area.id, 
//                                                         'pico_diurno_1pm_cierre', 
//                                                         e.target.value
//                                                     )}
//                                                     step="0.01" 
//                                                     disabled={loading || saving}
//                                                 />
//                                             </Form.Group>
//                                         </Col>
//                                         <Col md={4}>
//                                             <Form.Group controlId={`reactCierre-${area.id}`}>
//                                                 <Form.Label>REACT Cierre</Form.Label>
//                                                 <Form.Control 
//                                                     type="number" 
//                                                     value={cierreData[area.id]?.react_cierre || ''} 
//                                                     onChange={(e) => handleCierreDataChange(
//                                                         area.id, 
//                                                         'react_cierre', 
//                                                         e.target.value
//                                                     )}
//                                                     step="0.01" 
//                                                     disabled={loading || saving}
//                                                 />
//                                             </Form.Group>
//                                         </Col>
//                                     </Row>
//                                 </div>
//                             </Tab>
//                         ))}
//                     </Tabs>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowCierreModal(false)}>
//                         Cerrar
//                     </Button>
//                     <Button 
//                         variant="dark" 
//                         onClick={() => {
//                             markUnsavedChanges(activeTab);
//                             setShowCierreModal(false);
//                         }}
//                     >
//                         Guardar Cambios
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Modal de advertencia para cambios no guardados */}
//             <Modal show={showUnsavedModal} onHide={() => setShowUnsavedModal(false)} centered>
//                 <Modal.Header closeButton className="bg-warning text-dark">
//                     <Modal.Title>¡Cambios no guardados!</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>Tienes cambios no guardados en esta área. ¿Deseas guardarlos antes de cambiar?</p>
//                     <div className="d-flex justify-content-between mt-4">
//                         <Button variant="outline-secondary" onClick={() => setShowUnsavedModal(false)}>
//                             Cancelar
//                         </Button>
//                         <Button 
//                             variant="danger" 
//                             onClick={() => {
//                                 setActiveTab(pendingTab);
//                                 setShowUnsavedModal(false);
//                             }}
//                         >
//                             Descartar cambios
//                         </Button>
//                         <Button 
//                             variant="dark" 
//                             onClick={async () => {
//                                 const success = await saveAreaData(activeTab);
//                                 if (success) {
//                                     setActiveTab(pendingTab);
//                                     setShowUnsavedModal(false);
//                                 }
//                             }} 
//                             disabled={saving}
//                         >
//                             {saving ? 'Guardando...' : 'Guardar y cambiar'}
//                         </Button>
//                     </div>
//                 </Modal.Body>
//             </Modal>

//             {/* Modal de satisfaccion para cambios guardados */}
//             <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
//                 <Modal.Header closeButton className="bg-success text-white">
//                     <Modal.Title>
//                     <i className="bi bi-check-circle me-2"></i> Reporte generado con éxito
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="text-center py-4">
//                     <i className="bi bi-file-earmark-excel text-success display-4 mb-3"></i>
//                     <h4 className="text-success mb-3">Reporte Excel generado</h4>
//                     <p>El archivo se ha descargado correctamente en tu dispositivo.</p>
//                 </Modal.Body>
//                 <Modal.Footer className="justify-content-center">
//                     <Button variant="success" onClick={() => setShowSuccessModal(false)}>
//                     Aceptar
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//         </Container>
//     );
// };

// export default TablaBitacora;


import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Tab, Tabs, Table, Alert, Modal, Card, Spinner, Container, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './service_api/bitacora_api';

const TablaBitacora = () => {
    // const areas = [
    //     { id: 'Cocina C', name: 'Cocina Comedor', default_plan: 21000 },
    //     { id: 'Ciencia A', name: 'Ciencia Animal', default_plan: 26000 },
    //     { id: 'Preparatoria', name: 'Preparatoria', default_plan: 10000 },
    //     { id: 'Sede Martí', name: 'José Martí', default_plan: 20000 },
    //     { id: 'A.Cultural', name: 'Área Cultural', default_plan: 26000 },
    //     { id: 'Laboratorios Tec.', name: 'Laboratorios Técnicos', default_plan: 10000 },
    //     { id: 'Sede Fajardo', name: 'Manuel Fajardo', default_plan: 5430 },
    // ];

    const [areas, setAreas] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [showAreaManager, setShowAreaManager] = useState(false);
    const [newArea, setNewArea] = useState({
        nombre: '',
        nombre_corto: '',
        plan_default: '',
        factor_pico: '',
        factor_react: '',
        provincia: '',
        municipio: '',
    });

    const [municipios, setMunicipios] = useState([]);

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

    // Cuando cambia la provincia, actualizar los municipios disponibles
    useEffect(() => {
    if (newArea.provincia) {
        setMunicipios(municipiosPorProvincia[newArea.provincia] || []);
    } else {
        setMunicipios([]);
    }
    }, [newArea.provincia]);

    const [formData, setFormData] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        perdidas: '',
        plan_mes: '',
    });

    const monthNames = {
        1: "ENERO", 2: "FEBRERO", 3: "MARZO", 4: "ABRIL", 5: "MAYO", 6: "JUNIO",
        7: "JULIO", 8: "AGOSTO", 9: "SEPTIEMBRE", 10: "OCTUBRE", 11: "NOVIEMBRE", 12: "DICIEMBRE"
    };

    const [activeTab, setActiveTab] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [showCierreModal, setShowCierreModal] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState({});
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [pendingTab, setPendingTab] = useState(null);
    const navigate = useNavigate();

    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const [dailyData, setDailyData] = useState(() => {
        const initialDailyData = {};
        const daysInMonth = getDaysInMonth(formData.month, formData.year);
        areas.forEach(area => {
            initialDailyData[area.id] = Array.from({ length: daysInMonth }, (_, i) => ({
                day: i + 1,
                mad: '',
                dia: '',
                pico: '',
                react: '',
            }));
        });
        return initialDailyData;
    });

    const [cierreData, setCierreData] = useState(() => {
        const initialCierreData = {};
        areas.forEach(area => {
            initialCierreData[area.id] = {
                mad_cierre: '',
                dia_cierre: '',
                pico_cierre: '',
                total_cierre: '',
                pico_diurno_11am_cierre: '',
                pico_diurno_1pm_cierre: '',
                react_cierre: ''
            };
        });
        return initialCierreData;
    });

    const hasUnsavedChanges = (area) => {
        return unsavedChanges[area] || false;
    };

    const markUnsavedChanges = (area) => {
        setUnsavedChanges(prev => ({ ...prev, [area]: true }));
    };

    const handleTabChange = (tab) => {
        if (hasUnsavedChanges(activeTab)) {
            setPendingTab(tab);
            setShowUnsavedModal(true);
        } else {
            setActiveTab(tab);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'month' || name === 'year') {
            const newMonth = name === 'month' ? parseInt(value) : formData.month;
            const newYear = name === 'year' ? parseInt(value) : formData.year;
            const daysInMonth = getDaysInMonth(newMonth, newYear);

            setDailyData(prev => {
                const newDailyData = {};
                areas.forEach(area => {
                    const currentData = prev[area.id] || [];
                    newDailyData[area.id] = Array.from({ length: daysInMonth }, (_, i) => {
                        return i < currentData.length ? currentData[i] : {
                            day: i + 1,
                            mad: '',
                            dia: '',
                            pico: '',
                            react: '',
                        };
                    });
                });
                return newDailyData;
            });
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        markUnsavedChanges(activeTab);
    };

    const handleDailyDataChange = (area, day, field, value) => {
        setDailyData(prev => ({
            ...prev,
            [area]: prev[area].map(item =>
                item.day === day ? { ...item, [field]: value } : item
            )
        }));
        markUnsavedChanges(area);
    };

    const handleCierreDataChange = (area, field, value) => {
        setCierreData(prev => ({
            ...prev,
            [area]: { ...prev[area], [field]: value }
        }));
        markUnsavedChanges(area);
    };

    const checkEmptyFieldsBeforeLastDay = (areaData) => {
        let lastDayWithData = 0;
        for (let i = 0; i < areaData.length; i++) {
            const dayData = areaData[i];
            if (dayData.mad || dayData.dia || dayData.pico || dayData.react) {
                lastDayWithData = dayData.day;
            }
        }

        for (let i = 0; i < areaData.length && areaData[i].day <= lastDayWithData; i++) {
            const dayData = areaData[i];
            if (!dayData.mad || !dayData.dia || !dayData.pico || !dayData.react) {
                return dayData.day;
            }
        }
        return null;
    };

    //Codigo de funcional 04/05/25
    const loadDataAutomatically = async () => {
        if (!activeTab) return;
        try {
            const data = await api.getEnergyData(activeTab, formData.month, formData.year);
            const daysInMonth = getDaysInMonth(formData.month, formData.year);

            if (data) {
                setFormData(prev => ({
                    ...prev,
                    perdidas: data.perdidas || '',
                    plan_mes: data.plan_mes || ''
                }));

                const newDailyData = Array.from({ length: daysInMonth }, (_, i) => {
                    const dayData = (data.daily_data || []).find(d => d.day === i + 1) || {};
                    return {
                        day: i + 1,
                        mad: dayData.mad || '',
                        dia: dayData.dia || '',
                        pico: dayData.pico || '',
                        react: dayData.react || ''
                    };
                });

                setDailyData(prev => ({ ...prev, [activeTab]: newDailyData }));
                setUnsavedChanges(prev => ({ ...prev, [activeTab]: false }));

                const firstDayData = data.daily_data?.[0] || {};
                setCierreData(prev => ({
                    ...prev,
                    [activeTab]: {
                        mad_cierre: firstDayData.mad_cierre || '',
                        dia_cierre: firstDayData.dia_cierre || '',
                        pico_cierre: firstDayData.pico_cierre || '',
                        total_cierre: firstDayData.total_cierre || '',
                        pico_diurno_11am_cierre: firstDayData.pico_diurno_11am_cierre || '',
                        pico_diurno_1pm_cierre: firstDayData.pico_diurno_1pm_cierre || '',
                        react_cierre: firstDayData.react_cierre || ''
                    }
                }));
            } else {
                setDailyData(prev => ({
                    ...prev,
                    [activeTab]: Array.from({ length: daysInMonth }, (_, i) => ({
                        day: i + 1,
                        mad: '',
                        dia: '',
                        pico: '',
                        react: ''
                    }))
                }));

                setCierreData(prev => ({
                    ...prev,
                    [activeTab]: {
                        mad_cierre: '',
                        dia_cierre: '',
                        pico_cierre: '',
                        total_cierre: '',
                        pico_diurno_11am_cierre: '',
                        pico_diurno_1pm_cierre: '',
                        react_cierre: ''
                    }
                }));
            }
        } catch (error) {
            console.error('Error al cargar datos automáticamente:', error);
            const daysInMonth = getDaysInMonth(formData.month, formData.year);

            setDailyData(prev => ({
                ...prev,
                [activeTab]: Array.from({ length: daysInMonth }, (_, i) => ({
                    day: i + 1,
                    mad: '',
                    dia: '',
                    pico: '',
                    react: ''
                }))
            }));

            setCierreData(prev => ({
                ...prev,
                [activeTab]: {
                    mad_cierre: '',
                    dia_cierre: '',
                    pico_cierre: '',
                    total_cierre: '',
                    pico_diurno_11am_cierre: '',
                    pico_diurno_1pm_cierre: '',
                    react_cierre: ''
                }
            }));
        }
    };

    useEffect(() => {
        loadDataAutomatically();
    }, [formData.month, formData.year, activeTab]);


    //Codigo de funcional 04/05/25
    const saveAreaData = async (area) => {
        setSaving(true);
        setError(null);
        try {
            const currentDailyData = dailyData[area] || [];
            const emptyDay = checkEmptyFieldsBeforeLastDay(currentDailyData);
            if (emptyDay) {
                throw new Error(`Hay campos vacíos en el día ${emptyDay} del área ${area}. Por favor complete todos los datos hasta el último día registrado.`);
            }

            //Codigo funcional 21/05/25
            // const payload = {
            //     area: area,
            //     month: formData.month,
            //     year: formData.year,
            //     plan_mes: formData.plan_mes || areas.find(a => a.id === area)?.default_plan,
            //     perdidas: formData.perdidas,
            //     daily_data: currentDailyData
            //         .filter(item => item && (item.mad || item.dia || item.pico || item.react))
            //         .map(item => ({
            //             day: item.day,
            //             mad: item.mad,
            //             dia: item.dia,
            //             pico: item.pico,
            //             react: item.react,
            //             mad_cierre: cierreData[area]?.mad_cierre || '',
            //             dia_cierre: cierreData[area]?.dia_cierre || '',
            //             pico_cierre: cierreData[area]?.pico_cierre || '',
            //             total_cierre: cierreData[area]?.total_cierre || '',
            //             pico_diurno_11am_cierre: cierreData[area]?.pico_diurno_11am_cierre || '',
            //             pico_diurno_1pm_cierre: cierreData[area]?.pico_diurno_1pm_cierre || '',
            //             react_cierre: cierreData[area]?.react_cierre || ''
            //         }))
            // };

            //Codigo de prueba 21/05/25
            const payload = {
                area_id: area,  // Asegúrate de que sea el ID numérico
                month: formData.month,
                year: formData.year,
                plan_mes: formData.plan_mes || areas.find(a => a.id === area)?.default_plan,
                perdidas: formData.perdidas,
                daily_data: currentDailyData
                    .filter(item => item && (item.mad || item.dia || item.pico || item.react))
                    .map(item => ({
                        day: item.day,
                        mad: item.mad,
                        dia: item.dia,
                        pico: item.pico,
                        react: item.react,
                        mad_cierre: cierreData[area]?.mad_cierre || '',
                        dia_cierre: cierreData[area]?.dia_cierre || '',
                        pico_cierre: cierreData[area]?.pico_cierre || '',
                        total_cierre: cierreData[area]?.total_cierre || '',
                        pico_diurno_11am_cierre: cierreData[area]?.pico_diurno_11am_cierre || '',
                        pico_diurno_1pm_cierre: cierreData[area]?.pico_diurno_1pm_cierre || '',
                        react_cierre: cierreData[area]?.react_cierre || ''
                    }))
            };


            const existingData = await api.getEnergyData(area, formData.month, formData.year);
            if (existingData) {
                await api.updateEnergyConsumption(area, formData.month, formData.year, payload);
            } else {
                await api.createEnergyConsumption(payload);
            }

            setUnsavedChanges(prev => ({ ...prev, [area]: false }));
            return true;
        } catch (error) {
            console.error(`Error al guardar datos del área ${area}:`, error);
            setError(error.message || `Ocurrió un error al guardar los datos del área ${area}.`);
            return false;
        } finally {
            setSaving(false);
        }
    };

    const saveAllData = async () => {
        setSaving(true);
        setError(null);

        try {
            for (const area of areas) {
                if (hasUnsavedChanges(area.id)) {
                    const success = await saveAreaData(area.id);
                    if (!success) return;
                }
            }
        } finally {
            setSaving(false);
        }
    };

    const generateExcelReport = async () => {
        setLoading(true);
        setError(null);

        try {
            await saveAllData();

            const blob = await api.downloadExcel(
                formData.month,
                formData.year,
                formData.plan_mes || areas.find(a => a.id === activeTab)?.default_plan
            );

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Tabla R 1A-Bitacora ${monthNames[formData.month]} ${formData.year}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            // navigate('/success');
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error al generar Excel:', error);
            setError(error.message || 'Ocurrió un error al generar el reporte. Por favor intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const daysInMonth = getDaysInMonth(formData.month, formData.year);

    // // Cargar áreas al iniciar
    // useEffect(() => {
    //     const loadAreas = async () => {
    //         try {
    //             const areasData = await api.getAreas();
    //             setAreas(areasData);
    //             // Seleccionar las primeras 3 áreas por defecto
    //             setSelectedAreas(areasData.slice(0, 3).map(a => a.id));
    //         } catch (error) {
    //             console.error('Error al cargar áreas:', error);
    //         }
    //     };
    //     loadAreas();
    // }, []);

    // En el método para cargar áreas:
    useEffect(() => {
        // const loadAreas = async () => {
        //     try {
        //         const areasData = await api.getAreas();
        //         // Mostrar solo áreas activas en las pestañas
        //         const activeAreas = areasData.filter(area => area.activo);
        //         setAreas(areasData); // Guardar TODAS las áreas (para gestión)

        //         // Seleccionar las primeras 3 áreas activas por defecto
        //         setSelectedAreas(activeAreas.slice(0, 3).map(a => a.id));

        //         // Establecer la primera área activa como pestaña activa
        //         if (activeAreas.length > 0 && !activeTab) {
        //             setActiveTab(activeAreas[0].id.toString());
        //         }
        //     } catch (error) {
        //         console.error('Error al cargar áreas:', error);
        //     }
        // };

        const loadAreas = async () => {
            try {
                const areasData = await api.getAreas();
                setAreas(areasData);

                // Seleccionar las primeras 3 áreas activas por defecto
                const activeAreas = areasData.filter(area => area.activo);
                setSelectedAreas(activeAreas.slice(0, 3).map(a => a.id));

                // Establecer la primera área activa como pestaña activa si no hay ninguna
                if (activeAreas.length > 0 && !activeTab) {
                    setActiveTab(activeAreas[0].id.toString());
                }
            } catch (error) {
                console.error('Error al cargar áreas:', error);
            }
        };

        loadAreas();
    }, []);

    // Manejar creación de nueva área
    const handleCreateArea = async () => {
        try {
            const createdArea = await api.createArea(newArea);
            setAreas([...areas, createdArea]);
            setNewArea({
                nombre: '',
                nombre_corto: '',
                plan_default: '',
                factor_pico: '',
                factor_react: '',
                provincia: '',
                municipio: '',
            });
            setShowAreaManager(false);
        } catch (error) {
            console.error('Error al crear área:', error);
        }
        // try {
        //     // Convertir los valores numéricos a números
        //     const areaData = {
        //         ...newArea,
        //         plan_default: parseFloat(newArea.plan_default),
        //         factor_pico: parseFloat(newArea.factor_pico),
        //         factor_react: parseFloat(newArea.factor_react)
        //     };

        //     const createdArea = await api.createArea(areaData);
        //     setAreas([...areas, createdArea]);
        //     setNewArea({
        //         nombre: '',
        //         nombre_corto: '',
        //         plan_default: '',
        //         factor_pico: '',
        //         factor_react: ''
        //     });
        //     setShowAreaManager(false);
        // } catch (error) {
        //     console.error('Error al crear área:', error);
        //     setError(`Error al crear área: ${error.message}`);
        // }
    };

    // Manejar selección/deselección de áreas
    const toggleAreaSelection = (areaId) => {
        if (selectedAreas.includes(areaId)) {
            setSelectedAreas(selectedAreas.filter(id => id !== areaId));
            if (activeTab === areaId.toString()) {
                setActiveTab(selectedAreas[0]?.toString() || '');
            }
        } else {
            setSelectedAreas([...selectedAreas, areaId]);
        }
    };

    // Nuevo método para desactivar/activar áreas
    // const toggleAreaStatus = async (areaId) => {
    //     try {
    //         const response = await api.deleteArea(areaId);

    //         if (response) {
    //             // Actualizar la lista de áreas
    //             const updatedAreas = areas.map(area =>
    //                 area.id === areaId ? { ...area, activo: !area.activo } : area
    //             );

    //             setAreas(updatedAreas);

    //             // Si el área estaba seleccionada, quitarla
    //             if (selectedAreas.includes(areaId)) {
    //                 const newSelected = selectedAreas.filter(id => id !== areaId);
    //                 setSelectedAreas(newSelected);

    //                 // Si era la pestaña activa, cambiar a otra
    //                 if (activeTab === areaId.toString()) {
    //                     const activeAreas = updatedAreas.filter(a => a.activo);
    //                     setActiveTab(activeAreas[0]?.id.toString() || '');
    //                 }
    //             }

    //             return true;
    //         }
    //     } catch (error) {
    //         console.error('Error al cambiar estado del área:', error);
    //         return false;
    //     }
    // };

    // const deleteAreaPermanently = async (areaId) => {
    //     try {
    //         await api.deleteArea(areaId);
    //         // Actualizar la lista de áreas
    //         const updatedAreas = areas.filter(area => area.id !== areaId);
    //         setAreas(updatedAreas);

    //         // Si el área estaba seleccionada, quitarla
    //         if (selectedAreas.includes(areaId)) {
    //             const newSelected = selectedAreas.filter(id => id !== areaId);
    //             setSelectedAreas(newSelected);

    //             // Si era la pestaña activa, cambiar a otra
    //             if (activeTab === areaId.toString()) {
    //                 const activeAreas = updatedAreas.filter(a => a.activo);
    //                 setActiveTab(activeAreas[0]?.id.toString() || '');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error al eliminar área:', error);
    //     }
    // };

    // const toggleAreaStatus = async (areaId) => {
    //     try {
    //         const response = await api.updateArea(areaId);
    //         if (response) {
    //             // Actualizar la lista de áreas
    //             const updatedAreas = areas.map(area =>
    //                 area.id === areaId ? { ...area, activo: response.activo } : area
    //             );
    //             setAreas(updatedAreas);

    //             // Si el área estaba seleccionada y se desactivó, quitarla
    //             if (selectedAreas.includes(areaId) && !response.activo) {
    //                 const newSelected = selectedAreas.filter(id => id !== areaId);
    //                 setSelectedAreas(newSelected);

    //                 // Si era la pestaña activa, cambiar a otra
    //                 if (activeTab === areaId.toString()) {
    //                     const activeAreas = updatedAreas.filter(a => a.activo);
    //                     setActiveTab(activeAreas[0]?.id.toString() || '');
    //                 }
    //             }
    //             return true;
    //         }
    //     } catch (error) {
    //         console.error('Error al cambiar estado del área:', error);
    //         return false;
    //     }
    // };

    // const toggleAreaStatus = async (areaId) => {
    //     try {
    //         const response = await api.updateArea(areaId);
    //         if (response) {
    //             // Actualizar la lista de áreas
    //             const updatedAreas = areas.map(area =>
    //                 area.id === areaId ? { ...area, activo: response.activo } : area
    //             );
    //             setAreas(updatedAreas);

    //             // Si el área estaba seleccionada y se desactivó, quitarla
    //             if (selectedAreas.includes(areaId) && !response.activo) {
    //                 const newSelected = selectedAreas.filter(id => id !== areaId);
    //                 setSelectedAreas(newSelected);

    //                 // Si era la pestaña activa, cambiar a otra
    //                 if (activeTab === areaId.toString()) {
    //                     const activeAreas = updatedAreas.filter(a => a.activo);
    //                     setActiveTab(activeAreas[0]?.id.toString() || '');
    //                 }
    //             }
    //             return true;
    //         }
    //     } catch (error) {
    //         console.error('Error al cambiar estado del área:', error);
    //         return false;
    //     }
    // };

    const toggleAreaStatus = async (areaId) => {
        try {
            const response = await api.updateArea(areaId);
            if (response) {
                // Actualizar la lista de áreas
                const updatedAreas = areas.map(area =>
                    area.id === areaId ? { ...area, activo: response.activo } : area
                );
                setAreas(updatedAreas);

                // Si el área estaba seleccionada y se desactivó, quitarla de seleccionadas
                if (selectedAreas.includes(areaId) && !response.activo) {
                    const newSelected = selectedAreas.filter(id => id !== areaId);
                    setSelectedAreas(newSelected);

                    // Si era la pestaña activa, cambiar a otra
                    if (activeTab === areaId.toString()) {
                        const activeAreas = updatedAreas.filter(a => a.activo);
                        setActiveTab(activeAreas[0]?.id.toString() || '');
                    }
                }

                return true;
            }
        } catch (error) {
            console.error('Error al cambiar estado del área:', error);
            return false;
        }
    };

    const deleteAreaPermanently = async (areaId) => {
        try {
            await api.deleteArea(areaId);
            // Actualizar la lista de áreas
            const updatedAreas = areas.filter(area => area.id !== areaId);
            setAreas(updatedAreas);

            // Si el área estaba seleccionada, quitarla
            if (selectedAreas.includes(areaId)) {
                const newSelected = selectedAreas.filter(id => id !== areaId);
                setSelectedAreas(newSelected);

                // Si era la pestaña activa, cambiar a otra
                if (activeTab === areaId.toString()) {
                    const activeAreas = updatedAreas.filter(a => a.activo);
                    setActiveTab(activeAreas[0]?.id.toString() || '');
                }
            }
        } catch (error) {
            console.error('Error al eliminar área:', error);
        }
    };

    // const handleGenerateLossReport = async () => {
    //     try {
    //         setLoading(true);

    //         // First process the bitacora file
    //         const processResult = await api.processBitacoraFile(formData.month, formData.year);
    //         console.log('Processing result:', processResult);

    //         // Then navigate to the loss report page
    //         navigate(`/energetico-transformacionElectrica`);
    //     } catch (error) {
    //         console.error('Error generating loss report:', error);
    //         setError(error.message || 'Error al procesar el archivo de bitácora');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const handleGenerateLossReport = async () => {
        try {
            setLoading(true);

            // First save all data
            await saveAllData();

            // Then process the bitacora file
            const processResult = await api.processBitacoraFile(formData.month, formData.year);
            console.log('Processing result:', processResult);

            // Check if there were any errors
            const hasErrors = processResult.results.some(result => result.status !== 'success');
            if (hasErrors) {
                const errorMessages = processResult.results
                    .filter(result => result.status === 'error')
                    .map(result => `${result.area}: ${result.error}`)
                    .join('\n');

                setError(`Hubo errores al procesar algunas áreas:\n${errorMessages}`);
                return;
            }

            // Then navigate to the loss report page
            navigate(`/energetico-transformacionElectrica`);
        } catch (error) {
            console.error('Error generating loss report:', error);
            setError(error.message || 'Error al procesar el archivo de bitácora');
        } finally {
            setLoading(false);
        }
    };




    return (
        <Container className="py-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-dark text-white">
                    <h2 className="mb-0">Registro de Consumo de Energía</h2>
                    <Button
                        variant="outline-light"
                        size="sm"
                        onClick={() => setShowAreaManager(true)}
                        className="mt-2"
                    >
                        <i className="bi bi-gear me-1"></i> Gestionar Áreas
                    </Button>
                </Card.Header>

                {/* Modal para gestión de áreas */}
                <Modal show={showAreaManager} onHide={() => setShowAreaManager(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Gestión de Áreas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs defaultActiveKey="select" className="mb-3">
                            <Tab eventKey="select" title="Seleccionar Áreas">
                                <div className="mt-3">
                                    <h5>Áreas Disponibles</h5>
                                    <div className="list-group">
                                        {areas.filter(area => area.activo).map(area => (
                                            <div key={area.id} className="list-group-item list-group-item-action">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>{area.nombre}</span>
                                                    <div>
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={() => toggleAreaStatus(area.id)}
                                                            className="me-2"
                                                        >
                                                            Desactivar
                                                        </Button>
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={() => {
                                                                if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el área "${area.nombre}"?`)) {
                                                                    deleteAreaPermanently(area.id);
                                                                }
                                                            }}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Tab>

                            {/* <Tab eventKey="select" title="Gestionar Áreas">
                                <div className="mt-3">
                                    <h5>Todas las Áreas</h5>
                                    <div className="list-group">
                                        {areas.map(area => (
                                            <div key={area.id} className={`list-group-item list-group-item-action ${!area.activo ? 'list-group-item-secondary' : ''}`}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>
                                                        {area.nombre}
                                                        {!area.activo && <small className="text-muted ms-2">(desactivada)</small>}
                                                    </span>
                                                    <div>
                                                        <Button
                                                            variant={area.activo ? "outline-danger" : "outline-success"}
                                                            size="sm"
                                                            onClick={() => toggleAreaStatus(area.id)}
                                                            className="me-2"
                                                        >
                                                            {area.activo ? "Desactivar" : "Activar"}
                                                        </Button>
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={() => {
                                                                if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el área "${area.nombre}"?`)) {
                                                                    deleteAreaPermanently(area.id);
                                                                }
                                                            }}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Tab> */}

                            <Tab eventKey="inactive" title="Áreas Desactivadas">
                                <div className="mt-3">
                                    <h5>Áreas Desactivadas</h5>
                                    {areas.filter(area => !area.activo).length === 0 ? (
                                        <Alert variant="info">No hay áreas desactivadas</Alert>
                                    ) : (
                                        <div className="list-group">
                                            {areas.filter(area => !area.activo).map(area => (
                                                <div key={area.id} className="list-group-item list-group-item-secondary">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span>{area.nombre}</span>
                                                        <div>
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                onClick={() => toggleAreaStatus(area.id)}
                                                                className="me-2"
                                                            >
                                                                Activar
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el área "${area.nombre}"?`)) {
                                                                        deleteAreaPermanently(area.id);
                                                                    }
                                                                }}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Tab>
                            <Tab eventKey="create" title="Crear Nueva Área">
                                <div className="mt-3">
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre Completo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newArea.nombre}
                                                onChange={(e) => setNewArea({ ...newArea, nombre: e.target.value })}
                                            />
                                        </Form.Group>
                                        {/* <Form.Group className="mb-3">
                                            <Form.Label>Nombre Corto (para Excel)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newArea.nombre_corto}
                                                onChange={(e) => setNewArea({ ...newArea, nombre_corto: e.target.value })}
                                            />
                                        </Form.Group> */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Plan Default (kWh)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={newArea.plan_default}
                                                onChange={(e) => setNewArea({ ...newArea, plan_default: e.target.value })}
                                            />
                                            {/* <Form.Control
                                                type="number"
                                                value={newArea.plan_default}
                                                onChange={(e) => setNewArea({ ...newArea, plan_default: e.target.value })}
                                                step="0.01"
                                                required
                                            /> */}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Factor Pico</Form.Label>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                value={newArea.factor_pico}
                                                onChange={(e) => setNewArea({ ...newArea, factor_pico: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Factor React</Form.Label>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                value={newArea.factor_react}
                                                onChange={(e) => setNewArea({ ...newArea, factor_react: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Provincia</Form.Label>
                                                <Form.Select
                                                value={newArea.provincia}
                                                onChange={(e) => setNewArea({ ...newArea, provincia: e.target.value, municipio: '' })}
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
                                                value={newArea.municipio}
                                                onChange={(e) => setNewArea({ ...newArea, municipio: e.target.value })}
                                                disabled={!newArea.provincia}
                                                >
                                                <option value="">Seleccione un municipio</option>
                                                {municipios.map(municipio => (
                                                    <option key={municipio} value={municipio}>{municipio}</option>
                                                ))}
                                                </Form.Select>
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAreaManager(false)}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleCreateArea}>
                            Crear Nueva Área
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

                    <Form>
                        <Row className="mb-4 g-3">
                            <Col md={2}>
                                <Form.Group controlId="formMonth">
                                    <Form.Label>Mes</Form.Label>
                                    <Form.Select
                                        name="month"
                                        value={formData.month}
                                        onChange={handleChange}
                                        required
                                        disabled={loading || saving}
                                    >
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group controlId="formYear">
                                    <Form.Label>Año</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        min="2000"
                                        max="2100"
                                        required
                                        disabled={loading || saving}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group controlId="formPerdidas">
                                    <Form.Label>Pérdidas (kWh)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="perdidas"
                                        value={formData.perdidas}
                                        onChange={handleChange}
                                        step="0.01"
                                        required
                                        disabled={loading || saving}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group controlId="formPlanMes">
                                    <Form.Label>Plan del Mes (kWh)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="plan_mes"
                                        value={formData.plan_mes}
                                        onChange={handleChange}
                                        step="1"
                                        placeholder={`Valor por defecto: ${areas.find(a => a.id === activeTab)?.default_plan || ''}`}
                                        disabled={loading || saving}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3} className="d-flex align-items-end">
                                <Button
                                    variant="outline-dark"
                                    onClick={() => setShowCierreModal(true)}
                                    disabled={loading || saving}
                                >
                                    <i className="bi bi-calendar-check me-2"></i>
                                    Datos de Cierre
                                </Button>
                            </Col>
                        </Row>

                        <Row className="mb-4 g-3">
                            <Col md={3}>
                                <Button
                                    variant="dark"
                                    onClick={generateExcelReport}
                                    disabled={loading || saving}
                                    size="lg"
                                    className="mt-3"
                                >
                                    {loading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                            Generando Reporte...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-file-earmark-excel me-2"></i>
                                            Generar Reporte Excel
                                        </>
                                    )}
                                </Button>
                            </Col>

                            <Col md={4}>
                                {/* <Button
                                    variant="dark"
                                    onClick={handleGenerateLossReport}
                                    size="lg"
                                    className="mt-3"
                                    disabled={loading}
                                >
                                    <i className="bi bi-lightning-charge me-2"></i>
                                    Generar Reporte de Pérdidas
                                </Button> */}

                                <Button
                                    variant="dark"
                                    onClick={() => navigate(`/energetico-reporteDiarios`)}
                                    size="lg"
                                    className="mt-3"
                                >
                                    <i className="bi bi-lightning-charge me-2"></i>
                                    Generar Reporte de Diarios
                                </Button>

                                <Button
                                    variant="dark"
                                    onClick={() => navigate(`/energetico-transformacionElectrica`)}
                                    size="lg"
                                    className="mt-3"
                                >
                                    <i className="bi bi-lightning-charge me-2"></i>
                                    Generar Reporte de Pérdidas
                                </Button>
                            </Col>
                        </Row>

                        {/* <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3" id="area-tabs">
                            {selectedAreas.map(areaId => {
                                const area = areas.find(a => a.id === areaId);
                                if (!area) return null;

                                return (
                                    <Tab key={area.id} eventKey={area.id.toString()} title={
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-building me-1"></i>
                                            <span className="me-2">{area.nombre}</span>
                                            {hasUnsavedChanges(area.id) && (
                                                <Badge bg="warning" text="dark">!</Badge>
                                            )}
                                        </div>
                                    }> */}
                        {/* <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3" id="area-tabs">
                            {selectedAreas.map(areaId => {
                                const area = areas.find(a => a.id === areaId);
                                if (!area) return null;
                                return (
                                    <Tab
                                        key={area.id}
                                        eventKey={area.id.toString()}
                                        title={
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-building me-1"></i>
                                                <span className="me-2">{area.nombre}</span>
                                                {hasUnsavedChanges(area.id) && (
                                                    <Badge bg="warning" text="dark">!</Badge>
                                                )}
                                            </div>
                                        }
                                        tabClassName={!area.activo ? "text-muted" : ""}
                                    > */}
                        <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3" id="area-tabs">
                            {areas
                                .filter(area => area.activo) // Solo mostrar áreas activas
                                .map(area => (
                                    <Tab
                                        key={area.id}
                                        eventKey={area.id.toString()}
                                        title={
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-building me-1"></i>
                                                <span className="me-2">{area.nombre}</span>
                                                {hasUnsavedChanges(area.id) && (
                                                    <Badge bg="warning" text="dark">!</Badge>
                                                )}
                                            </div>
                                        }
                                    >
                                        <div className="mt-3">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>
                                                    <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
                                                    {area.name} - Datos Diarios ({daysInMonth} días)
                                                </h4>
                                                <Button
                                                    variant={hasUnsavedChanges(area.id) ? "warning" : "outline-dark"}
                                                    onClick={() => saveAreaData(area.id)}
                                                    disabled={saving || !hasUnsavedChanges(area.id)}
                                                    size="sm"
                                                >
                                                    {saving ? (
                                                        <Spinner as="span" animation="border" size="sm" />
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-save me-1"></i>
                                                            Guardar Datos
                                                        </>
                                                    )}
                                                </Button>
                                            </div>

                                            <p className="text-muted mb-3">
                                                Plan del mes: <strong>{formData.plan_mes || area.default_plan} kWh</strong>
                                            </p>

                                            <div className="table-responsive">
                                                <Table bordered hover className="align-middle">
                                                    <thead className="table-dark">
                                                        <tr>
                                                            <th width="10%">Día</th>
                                                            <th width="22.5%">MAD</th>
                                                            <th width="22.5%">DIA</th>
                                                            <th width="22.5%">PICO</th>
                                                            <th width="22.5%">REACT</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(dailyData[area.id] || []).slice(0, daysInMonth).map((dayData) => (
                                                            <tr key={dayData.day}>
                                                                <td className="fw-bold">{dayData.day}</td>
                                                                <td>
                                                                    <Form.Control
                                                                        type="number"
                                                                        value={dayData.mad}
                                                                        onChange={(e) => handleDailyDataChange(
                                                                            area.id,
                                                                            dayData.day,
                                                                            'mad',
                                                                            e.target.value
                                                                        )}
                                                                        step="0.01"
                                                                        size="sm"
                                                                        disabled={loading || saving}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Form.Control
                                                                        type="number"
                                                                        value={dayData.dia}
                                                                        onChange={(e) => handleDailyDataChange(
                                                                            area.id,
                                                                            dayData.day,
                                                                            'dia',
                                                                            e.target.value
                                                                        )}
                                                                        step="0.01"
                                                                        size="sm"
                                                                        disabled={loading || saving}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Form.Control
                                                                        type="number"
                                                                        value={dayData.pico}
                                                                        onChange={(e) => handleDailyDataChange(
                                                                            area.id,
                                                                            dayData.day,
                                                                            'pico',
                                                                            e.target.value
                                                                        )}
                                                                        step="0.01"
                                                                        size="sm"
                                                                        disabled={loading || saving}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Form.Control
                                                                        type="number"
                                                                        value={dayData.react}
                                                                        onChange={(e) => handleDailyDataChange(
                                                                            area.id,
                                                                            dayData.day,
                                                                            'react',
                                                                            e.target.value
                                                                        )}
                                                                        step="0.01"
                                                                        size="sm"
                                                                        disabled={loading || saving}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </Tab>

                                ))}
                        </Tabs>
                    </Form>
                </Card.Body>
            </Card>

            {/* Modal para datos de cierre del mes anterior */}
            <Modal show={showCierreModal} onHide={() => setShowCierreModal(false)} size="lg" centered>
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>
                        <i className="bi bi-calendar-check me-2"></i>
                        Datos de Cierre del Mes Anterior
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3">
                        {areas.map(area => (
                            <Tab key={area.id} eventKey={area.id} title={area.name}>
                                <div className="mt-3">
                                    <h5 className="mb-4">
                                        <i className="bi bi-building me-2"></i>
                                        {area.name}
                                    </h5>
                                    <Row className="g-3">
                                        <Col md={3}>
                                            <Form.Group controlId={`madCierre-${area.id}`}>
                                                <Form.Label>MAD Cierre</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={cierreData[area.id]?.mad_cierre || ''}
                                                    onChange={(e) => handleCierreDataChange(
                                                        area.id,
                                                        'mad_cierre',
                                                        e.target.value
                                                    )}
                                                    step="0.01"
                                                    disabled={loading || saving}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group controlId={`diaCierre-${area.id}`}>
                                                <Form.Label>DIA Cierre</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={cierreData[area.id]?.dia_cierre || ''}
                                                    onChange={(e) => handleCierreDataChange(
                                                        area.id,
                                                        'dia_cierre',
                                                        e.target.value
                                                    )}
                                                    step="0.01"
                                                    disabled={loading || saving}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group controlId={`picoCierre-${area.id}`}>
                                                <Form.Label>PICO Cierre</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={cierreData[area.id]?.pico_cierre || ''}
                                                    onChange={(e) => handleCierreDataChange(
                                                        area.id,
                                                        'pico_cierre',
                                                        e.target.value
                                                    )}
                                                    step="0.01"
                                                    disabled={loading || saving}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group controlId={`totalCierre-${area.id}`}>
                                                <Form.Label>TOTAL Cierre</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={cierreData[area.id]?.total_cierre || ''}
                                                    onChange={(e) => handleCierreDataChange(
                                                        area.id,
                                                        'total_cierre',
                                                        e.target.value
                                                    )}
                                                    step="0.01"
                                                    disabled={loading || saving}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId={`pico11amCierre-${area.id}`}>
                                                <Form.Label>Pico Diurno 11 am</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={cierreData[area.id]?.pico_diurno_11am_cierre || ''}
                                                    onChange={(e) => handleCierreDataChange(
                                                        area.id,
                                                        'pico_diurno_11am_cierre',
                                                        e.target.value
                                                    )}
                                                    step="0.01"
                                                    disabled={loading || saving}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId={`pico1pmCierre-${area.id}`}>
                                                <Form.Label>Pico Diurno 1 pm</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={cierreData[area.id]?.pico_diurno_1pm_cierre || ''}
                                                    onChange={(e) => handleCierreDataChange(
                                                        area.id,
                                                        'pico_diurno_1pm_cierre',
                                                        e.target.value
                                                    )}
                                                    step="0.01"
                                                    disabled={loading || saving}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId={`reactCierre-${area.id}`}>
                                                <Form.Label>REACT Cierre</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={cierreData[area.id]?.react_cierre || ''}
                                                    onChange={(e) => handleCierreDataChange(
                                                        area.id,
                                                        'react_cierre',
                                                        e.target.value
                                                    )}
                                                    step="0.01"
                                                    disabled={loading || saving}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Tab>
                        ))}
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCierreModal(false)}>
                        Cerrar
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => {
                            markUnsavedChanges(activeTab);
                            setShowCierreModal(false);
                        }}
                    >
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de advertencia para cambios no guardados */}
            <Modal show={showUnsavedModal} onHide={() => setShowUnsavedModal(false)} centered>
                <Modal.Header closeButton className="bg-warning text-dark">
                    <Modal.Title>¡Cambios no guardados!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tienes cambios no guardados en esta área. ¿Deseas guardarlos antes de cambiar?</p>
                    <div className="d-flex justify-content-between mt-4">
                        <Button variant="outline-secondary" onClick={() => setShowUnsavedModal(false)}>
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                setActiveTab(pendingTab);
                                setShowUnsavedModal(false);
                            }}
                        >
                            Descartar cambios
                        </Button>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                const success = await saveAreaData(activeTab);
                                if (success) {
                                    setActiveTab(pendingTab);
                                    setShowUnsavedModal(false);
                                }
                            }}
                            disabled={saving}
                        >
                            {saving ? 'Guardando...' : 'Guardar y cambiar'}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Modal de satisfaccion para cambios guardados */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton className="bg-success text-white">
                    <Modal.Title>
                        <i className="bi bi-check-circle me-2"></i> Reporte generado con éxito
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <i className="bi bi-file-earmark-excel text-success display-4 mb-3"></i>
                    <h4 className="text-success mb-3">Reporte Excel generado</h4>
                    <p>El archivo se ha descargado correctamente en tu dispositivo.</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success" onClick={() => setShowSuccessModal(false)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default TablaBitacora;
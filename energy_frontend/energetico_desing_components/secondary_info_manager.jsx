import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Modal, Card, Container, Table } from 'react-bootstrap';
import api from './service_api/secondary_info_api';

const SecondaryInfoManager = () => {
    const [infos, setInfos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingInfo, setEditingInfo] = useState(null);
    const [formData, setFormData] = useState({
        municipio: '',
        nombre_servicio: '',
        oace: 'MES',
        osde: 'MES',
        codcli: '',
        control: '',
        ruta: '',
        folio: '',
        nombre_empresa: 'Universidad de Camaguey',
        codigo_reeup: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSecondaryInfos();
    }, []);

    const loadSecondaryInfos = async () => {
        try {
            const data = await api.getSecondaryInfos();
            setInfos(data);
        } catch (error) {
            console.error('Error al cargar información secundaria:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            if (editingInfo) {
                await api.updateSecondaryInfo(editingInfo.id, formData);
            } else {
                await api.createSecondaryInfo(formData);
            }
            
            setShowModal(false);
            setEditingInfo(null);
            setFormData({
                municipio: '',
                nombre_servicio: '',
                oace: 'MES',
                osde: 'MES',
                codcli: '',
                control: '',
                ruta: '',
                folio: '',
                nombre_empresa: 'Universidad de Camaguey',
                codigo_reeup: ''
            });
            
            loadSecondaryInfos();
        } catch (error) {
            setError(error.message || 'Error al guardar la información');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (info) => {
        setEditingInfo(info);
        setFormData({
            municipio: info.municipio,
            nombre_servicio: info.nombre_servicio,
            oace: info.oace,
            osde: info.osde,
            codcli: info.codcli,
            control: info.control,
            ruta: info.ruta,
            folio: info.folio,
            nombre_empresa: info.nombre_empresa,
            codigo_reeup: info.codigo_reeup
        });
        setShowModal(true);
    };

    return (
        <Container className="py-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-dark text-white">
                    <h2 className="mb-0">Gestión de Información Secundaria</h2>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                    
                    <Button 
                        variant="dark" 
                        onClick={() => setShowModal(true)}
                        className="mb-3"
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Agregar Información
                    </Button>
                    
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Municipio</th>
                                <th>Nombre del Servicio</th>
                                <th>OACE</th>
                                <th>OSDE</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infos.map(info => (
                                <tr key={info.id}>
                                    <td>{info.municipio}</td>
                                    <td>{info.nombre_servicio}</td>
                                    <td>{info.oace}</td>
                                    <td>{info.osde}</td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleEdit(info)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingInfo ? 'Editar Información' : 'Agregar Información'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Municipio</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.municipio}
                                        onChange={(e) => setFormData({...formData, municipio: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre del Servicio</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.nombre_servicio}
                                        onChange={(e) => setFormData({...formData, nombre_servicio: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>OACE</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.oace}
                                        onChange={(e) => setFormData({...formData, oace: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>OSDE</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.osde}
                                        onChange={(e) => setFormData({...formData, osde: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CODCLI</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.codcli}
                                        onChange={(e) => setFormData({...formData, codcli: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CONTROL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.control}
                                        onChange={(e) => setFormData({...formData, control: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>RUTA</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.ruta}
                                        onChange={(e) => setFormData({...formData, ruta: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>FOLIO</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.folio}
                                        onChange={(e) => setFormData({...formData, folio: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre de la Empresa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.nombre_empresa}
                                        onChange={(e) => setFormData({...formData, nombre_empresa: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Código REEUP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.codigo_reeup}
                                        onChange={(e) => setFormData({...formData, codigo_reeup: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="dark" 
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default SecondaryInfoManager;
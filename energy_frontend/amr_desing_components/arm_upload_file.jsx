import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner, Col, Container, Row } from 'react-bootstrap';

const UploadXLSX = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const API_URL = 'http://127.0.0.1:8000/amr_api/upload-xlsx/';

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        if (!file) {
            setMessage('Por favor, selecciona un archivo.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ text: data.message, variant: 'success' });
            } else {
                setMessage({ text: `Error: ${data.error}`, variant: 'danger' });
            }
        } catch (error) {
            setMessage({ text: `Error de red: ${error.message}`, variant: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-dark text-white">
                            <h4 className="mb-0">
                                <i className="bi bi-upload me-2"></i>
                                Cargar Datos de Consumo
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <div 
                                    className={`border-2 rounded-3 p-4 text-center ${isDragging ? 'border-dark bg-light' : 'border-dashed'}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className="mb-3">
                                        <i className="bi bi-file-earmark-excel text-dark" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                    <p className="mb-3">Arrastra y suelta tu archivo XLSX aquí o</p>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control 
                                            type="file" 
                                            accept=".xlsx, .xls"
                                            onChange={handleFileChange}
                                        />
                                    </Form.Group>
                                    <small className="text-muted">
                                        Solo se aceptan archivos Excel (.xlsx, .xls)
                                    </small>
                                </div>
                                
                                <div className="d-grid mt-4">
                                    <Button 
                                        variant="dark" 
                                        type="submit" 
                                        disabled={loading || !file}
                                        size="lg"
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-cloud-upload me-2"></i>
                                                Subir Archivo
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                            
                            {message && (
                                <Alert variant={message.variant} className="mt-4">
                                    {message.text}
                                </Alert>
                            )}
                        </Card.Body>
                        <Card.Footer className="text-muted small">
                            <i className="bi bi-info-circle me-2"></i>
                            Los datos serán procesados y actualizados en el sistema.
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UploadXLSX;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import GenericGraph from './arm_generic_graph';

const GraphPaginatedView = () => {
    const [contadores, setContadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const graphsPerPage = 2;

    useEffect(() => {
        const fetchContadores = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/amr_api/contadores/');
                const data = await response.json();
                setContadores(data);
            } catch (error) {
                console.error('Error fetching contadores:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContadores();
    }, []);

    // Calculate current graphs to display
    const indexOfLastGraph = currentPage * graphsPerPage;
    const indexOfFirstGraph = indexOfLastGraph - graphsPerPage;
    const currentGraphs = contadores.slice(indexOfFirstGraph, indexOfLastGraph);
    const totalPages = Math.ceil(contadores.length / graphsPerPage);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="py-2">
            <Row>
                <Col>
                    <h2 className="text-center mb-2">Panel de Monitoreo Energético</h2>
                    <p className="text-center text-muted">
                        Visualización en tiempo real del consumo energético de las instalaciones
                    </p>
                </Col>
            </Row>

            <Row className="g-4 mb-2">
                {currentGraphs.length > 0 ? (
                    currentGraphs.map(contador => (
                        <Col lg={6} key={contador.id}>
                            <GenericGraph contador={contador} />
                        </Col>
                    ))
                ) : (
                    <Col className="text-center py-5">
                        <p>No hay contadores disponibles</p>
                    </Col>
                )}
            </Row>

            {contadores.length > graphsPerPage && (
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <Button
                            variant="outline-dark"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <i className="bi bi-arrow-left me-2"></i>Anterior
                        </Button>
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                        <span>Página {currentPage} de {totalPages}</span>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="dark"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente <i className="bi bi-arrow-right ms-2"></i>
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default GraphPaginatedView;
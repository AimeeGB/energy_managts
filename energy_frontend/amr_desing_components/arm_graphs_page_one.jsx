import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import InstitutoGraph from './arm_components/arm_inst_superior_pedagogico';
import LaboratorioGraph from './arm_components/arm_laboratorio_tec';

const Graph_PageOne = () => {

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
                <Col lg={6}>
                    <InstitutoGraph />
                </Col>
                <Col lg={6}>
                    <LaboratorioGraph />
                </Col>
            </Row>

            <Row className="justify-content-between">
                <Col xs="auto">
                    {/* <Link to='/graficos/views-filter' className="btn btn-outline-dark">
                        <i className="bi bi-arrow-left me-2"></i>Anterior
                    </Link> */}
                </Col>
                <Col xs="auto">
                    <Link to='/graph-page-two' className="btn btn-dark">
                        Siguiente <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Graph_PageOne;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CienciaAnimalGraph = () => {
    const [data, setData] = useState([]);
    const [intervalo, setIntervalo] = useState(1);
    const [ultimas24Horas, setUltimas24Horas] = useState(false);
    const [fechaEspecifica, setFechaEspecifica] = useState('');
    const [fechaGrafico, setFechaGrafico] = useState('');
    const [loading, setLoading] = useState(false);
    const API_URL = 'http://127.0.0.1:8000/amr_api/data-views-ciencia-animal/';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const urlParams = new URLSearchParams({
                    intervalo,
                    ultimas_24_horas: ultimas24Horas,
                    fecha_especifica: fechaEspecifica || '',
                });
                const response = await fetch(`${API_URL}?${urlParams.toString()}`);
                const jsonData = await response.json();
                setData(jsonData.diferencias || []);
                setFechaGrafico(jsonData.fecha_grafico || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [intervalo, ultimas24Horas, fechaEspecifica]);

    const chartData = {
        labels: data.map(item => item.fecha_lectura),
        datasets: [
            {
                label: 'Diferencia de Importe de Energía (kWh)',
                data: data.map(item => item.diferencia_importe),
                borderColor: 'rgb(24, 145, 145)',
                backgroundColor: 'rgba(39, 117, 117, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: `Consumo Energético - ${fechaGrafico || 'Últimos datos'}`,
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: {
                    size: 14
                },
                bodyFont: {
                    size: 12
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-dark text-white">
                <h5 className="mb-0">Facultad Ciencia Animal - Monitoreo Energético</h5>
            </Card.Header>
            <Card.Body>
                <Row className="mb-4 g-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Intervalo de tiempo</Form.Label>
                            <Form.Select 
                                value={intervalo} 
                                onChange={(e) => setIntervalo(Number(e.target.value))}
                                disabled={loading}
                            >
                                <option value="1">15 minutos</option>
                                <option value="2">30 minutos</option>
                                <option value="3">45 minutos</option>
                                <option value="4">1 hora</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Rango de fecha</Form.Label>
                            <Form.Control
                                type="date"
                                value={fechaEspecifica}
                                onChange={(e) => {
                                    setFechaEspecifica(e.target.value);
                                    setUltimas24Horas(false);
                                }}
                                disabled={loading || ultimas24Horas}
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col md={4} className="d-flex align-items-end">
                        <Form.Check
                            type="switch"
                            id="24h-switch"
                            label="Últimas 24hs"
                            checked={ultimas24Horas}
                            onChange={(e) => {
                                setUltimas24Horas(e.target.checked);
                                setFechaEspecifica('');
                            }}
                            disabled={loading}
                        />
                    </Col>
                </Row>
                
                <div style={{ height: '225px', position: 'relative' }}>
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '40%' }}>
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : (
                        <Line data={chartData} options={options} />
                    )}
                </div>
            </Card.Body>
            <Card.Footer className="text-muted small">
                Actualizado: {new Date().toLocaleString()}
            </Card.Footer>
        </Card>
    );
};

export default CienciaAnimalGraph;
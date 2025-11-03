import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Alert, Spinner, Badge, Col, Row } from 'react-bootstrap';
import api from './service_api/bitacora_api';

const AddAreaForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name_area: '',
        factor_pico: 0,
        factor_react: 0,
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
    if (formData.provincia) {
        setMunicipios(municipiosPorProvincia[formData.provincia] || []);
    } else {
        setMunicipios([]);
    }
    }, [formData.provincia]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Generate sheet_name
        const sheet_name = formData.name_area
            .toLowerCase()
            .replace(/\s+/g, '_');
        
        onAdd({
            ...formData,
            sheet_name,
            is_active: true
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre del Área</Form.Label>
                <Form.Control 
                    type="text" 
                    value={formData.name_area}
                    onChange={(e) => setFormData({...formData, name_area: e.target.value})}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Factor Pico</Form.Label>
                <Form.Control 
                    type="number" 
                    step="0.01"
                    value={formData.factor_pico}
                    onChange={(e) => setFormData({...formData, factor_pico: parseFloat(e.target.value)})}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Factor React</Form.Label>
                <Form.Control 
                    type="number" 
                    step="0.01"
                    value={formData.factor_react}
                    onChange={(e) => setFormData({...formData, factor_react: parseFloat(e.target.value)})}
                    required
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
            <Button variant="primary" type="submit">
                Agregar Área
            </Button>
        </Form>
    );
};  

export default AddAreaForm
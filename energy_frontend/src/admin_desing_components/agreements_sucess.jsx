import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const AgreementsSuccess = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>¡Operación exitosa!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <i className="bi bi-check-circle-fill text-success display-4 mb-3"></i>
        <h4 className="text-success mb-3">Gracias por su solicitud</h4>
        <p>El acuerdo ha sido agregado correctamente.</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        {/* <Button variant="outline-secondary" onClick={onHide} className="me-2">
          Cerrar
        </Button> */}
        <Link to="/admin/dashboard/agreements" className="btn btn-dark">
          Regresar
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default AgreementsSuccess;

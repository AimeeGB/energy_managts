import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
    const navigate = useNavigate();

    const fecthToken = (token) => {
        return localStorage.getItem("token")
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/admin/to_begin_section');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="bi bi-lightning-charge-fill me-2"></i>
                    <span>Gestión Energética</span>
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="bi bi-house-door me-1"></i> Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categorias">
                                <i className="bi bi-grid me-1"></i> Categorías
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="graficosDropdown" role="button" data-bs-toggle="dropdown">
                                <i className="bi bi-bar-chart-line me-1"></i> Gráficos
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/graph-monitoring">
                                        <i className="bi bi-filter-square me-2"></i>Por Áreas
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/amr-upload-file">
                                        <i className="bi bi-upload me-2"></i>Agregar Datos
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/energetico-tablaBitacora">
                                <i className="bi bi-file-earmark-text me-1"></i> Reportes
                            </Link>
                        </li> */}

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="graficosDropdown" role="button" data-bs-toggle="dropdown">
                                <i className="bi bi-bar-chart-line me-1"></i> Reportes
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/energetico-tablaBitacora">
                                        <i className="bi bi-filter-square me-2"></i>Reportes Bitacora
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/energetico-reporte-diario">
                                        <i className="bi bi-upload me-2"></i>Reporte Diario
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                                <i className="bi bi-person-circle me-1"></i> Mi Cuenta
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link className="dropdown-item" to="/admin/dashboard">
                                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/admin/to_create_bill">
                                        <i className="bi bi-person-plus me-2"></i>Registrarse
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/admin/to_begin_section">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li>
                                    <Link className="dropdown-item" to="/admin/dashboard/agreements">
                                        <i className="bi bi-list-check me-2"></i>Acuerdos
                                    </Link>
                                </li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
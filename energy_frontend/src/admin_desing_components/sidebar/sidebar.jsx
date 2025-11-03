import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("auth_token")
    navigate('/cliente/login')
  }

    return (
        <div className="card shadow-sm">
            <div className="card-body p-0">
                <div className="list-group list-group-flush rounded">
                    <Link to="/admin/dashboard" className="list-group-item list-group-item-action d-flex align-items-center">
                        <i className="bi bi-speedometer2 me-3"></i>
                        Dashboard
                    </Link>
                    <Link to="/admin/dashboard/agreements" className="list-group-item list-group-item-action d-flex align-items-center">
                        <i className="bi bi-list-check me-3"></i>
                        Acuerdos
                    </Link>
                    <Link to="/admin/to_upgrade_profile" className="list-group-item list-group-item-action d-flex align-items-center">
                        <i className="bi bi-person me-3"></i>
                        Perfil
                    </Link>
                    <Link to="/admin/dashboard/inspect" className="list-group-item list-group-item-action d-flex align-items-center">
                        <i className="bi bi-clipboard-check me-3"></i>
                        Inspecciones
                    </Link>
                    <Link to="/cliente/portadores_indicadores" className="list-group-item list-group-item-action d-flex align-items-center">
                        <i className="bi bi-graph-up me-3"></i>
                        Portadores e Indicadores
                    </Link>
                    <Link to="/admin/to_begin_section" className="list-group-item list-group-item-action text-danger d-flex align-items-center">
                        <i className="bi bi-box-arrow-right me-3"></i>
                        Cerrar Sesión
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Sidebar
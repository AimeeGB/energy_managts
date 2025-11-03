import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import Upgrade_Profile from './to_upgrade_profile'

const Profile = () => {

    const [perfil, setPerfil] = useState({
        nombre: '',
        apellido: '',
        email: '',
        area:'',
    })

    const baseUrl = 'http://127.0.0.1:8000/api';
    const API_URL = `${baseUrl}/client-profile/`

    const listProfile = async () => {
        const token = localStorage.getItem('token');
        try {
            // const token = localStorage.getItem('token') // Obtén el token del almacenamiento local
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            setPerfil(data.cliente)
          } catch (error) {
            console.error(error)
          }
    };
    
    useEffect(() => {
        listProfile();
    }, []);

    return (
        <>
            <div className='container-fluid py-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-4'>
                        <Sidebar/>
                    </div>
                    <div className='col-md-4 col-12 mb-2'>
                        <div className='card'>
                            <div className='text-center'>

                                <div className="card shadow-sm h-100">
                                    <div className="card-header bg-dark text-white">
                                        <h4 className="mb-0"><i className="bi bi-person-circle me-2"></i>Mi Perfil</h4>
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="mb-4">
                                            <div className="avatar bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                                {perfil.nombre.charAt(0)}{perfil.apellido.charAt(0)}
                                            </div>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <h5 className="card-title">{perfil.nombre} {perfil.apellido}</h5>
                                            <span className="badge bg-secondary">{perfil.area}</span>
                                        </div>
                                        
                                        <ul className="list-group list-group-flush text-start">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <span><i className="bi bi-envelope me-2"></i>Email</span>
                                                <span className="text-muted">{perfil.email}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <span><i className="bi bi-building me-2"></i>Área</span>
                                                <span className="text-muted">{perfil.area}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Upgrade_Profile/>
                </div>
            </div>
        </>
    )
}

export default Profile



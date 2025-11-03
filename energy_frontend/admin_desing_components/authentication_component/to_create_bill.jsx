import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//import 'bootstrap-icons/font/bootstrap-icons.css';

const Create_Account = () => {
    const [register, setRegister] = useState({
        'username': '',
        'password': '',
        'nombre': '',
        'apellido': '',
        'email': '',
        'area': '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();

    const API_URL = 'http://127.0.0.1:8000/api/admin/register/';

    const handleInputChange = (event) => {
        setRegister({...register, [event.target.name]: event.target.value});
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register)
            });
            const data = await response.json();
            if (response.ok){
                history('/admin/to_begin_section');
            } else {
                alert(data.message || 'Error al registrarse');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center min-vh-100 align-items-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-dark text-white text-center py-4">
                            <h3><i className="bi bi-person-plus me-2"></i>Registro de Usuario</h3>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleRegister}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="nombre" 
                                                value={register.nombre} 
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellidos</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="apellido" 
                                                value={register.apellido} 
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-at"></i></span>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="username" 
                                            value={register.username} 
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            name="email" 
                                            value={register.email} 
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="pwd" className="form-label">Contraseña</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-key"></i></span>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            name="password" 
                                            value={register.password} 
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="area" className="form-label">Área</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-building"></i></span>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="area" 
                                            value={register.area} 
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-dark"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Registrando...
                                            </>
                                        ) : (
                                            'Registrarse'
                                        )}
                                    </button>
                                </div>
                            </form>
                            
                            <div className="text-center mt-3">
                                <p className="mb-0">¿Ya tienes una cuenta? <Link to="/admin/to_begin_section" className="text-primary">Inicia sesión</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create_Account;
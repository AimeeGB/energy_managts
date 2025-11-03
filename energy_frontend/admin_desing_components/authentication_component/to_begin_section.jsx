import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';

const Init_Section = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate();

    const API_URL = 'http://127.0.0.1:8000/api/admin/login/';
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            const data = await response.json()
            if (response.ok){
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                history('/');
            } else {
                alert(data.message || 'Error al iniciar sesión');
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
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-dark text-white text-center py-4">
                            <h3><i className="bi bi-lightning-charge-fill me-2"></i>Gestión Energética</h3>
                            <p className="mb-0">Inicio de sesión</p>
                        </div>
                        <div className="card-body p-5">
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">Usuario</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="username" 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="pwd" className="form-label">Contraseña</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="pwd" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
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
                                                Iniciando...
                                            </>
                                        ) : (
                                            'Iniciar Sesión'
                                        )}
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-4">
                                <p className="mb-0">¿No tienes una cuenta? <Link to="/admin/to_create_bill" className="text-primary">Regístrate</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Init_Section;
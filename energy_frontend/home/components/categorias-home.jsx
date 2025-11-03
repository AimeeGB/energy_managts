import React from 'react'
import { Link } from 'react-router-dom'

const CategoriasHome = () => {
  return (
    <>
        <main className='mt-5'>
            <div className='container'>
                <h3 className='mb-4'>Categorias mas Utilizadas 
                    <Link to='/categorias' className='float-end btn btn-sm btn-dark m-2'>Ver Todos</Link>
                </h3>
                <div className='row mb-4'>
                    {/* Categoria Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className='card'>
                            <img src='/imagen/imagen-no-disponible.jpg' className='card-img-top' alt='...'/>
                            <div className='card-body'>
                                <h4 className='cart-title'>Medios de Oficina</h4>
                            </div>
                            <div className='card-footer'>
                                Articulos extraidos: 2356
                            </div>
                        </div>
                    </div>
                    {/* Categoria Box End */}
                    {/* Categoria Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className='card'>
                            <img src='/imagen/imagen-no-disponible.jpg' className='card-img-top' alt='...'/>
                            <div className='card-body'>
                                <h4 className='cart-title'>Maquetas</h4>
                            </div>
                            <div className='card-footer'>
                                Articulos extraidos: 2356
                            </div>
                        </div>
                    </div>
                    {/* Categoria Box End */}
                    {/* Categoria Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className='card'>
                            <img src='/imagen/imagen-no-disponible.jpg' className='card-img-top' alt='...'/>
                            <div className='card-body'>
                                <h4 className='cart-title'>Libros</h4>
                            </div>
                            <div className='card-footer'>
                                Articulos extraidos: 2356
                            </div>
                        </div>
                    </div>
                    {/* Categoria Box End */}
                    {/* Categoria Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className='card'>
                            <img src='/imagen/imagen-no-disponible.jpg' className='card-img-top' alt='...'/>
                            <div className='card-body'>
                                <h4 className='cart-title'>Informes</h4>
                            </div>
                            <div className='card-footer'>
                                Articulos extraidos: 2356
                            </div>
                        </div>
                    </div>
                    {/* Categoria Box End */}
                </div>
            </div>
        </main>
    </>
  )
}

export default CategoriasHome
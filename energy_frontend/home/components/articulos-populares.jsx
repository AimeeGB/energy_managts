import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'

const ArticulosPopulares = () => {
    return (
      <>
          <main className='mt-5'>
                  <div className='container'>
                      <h3 className='mb-4'>Articulos mas Utilizados 
                          <a href='#' className='float-end btn btn-sm btn-dark m-2'>Ver Todos</a>
                      </h3>
                      <div className='row mb-4'>
                          {/* Articulo Box */}
                          <div className='col-12 col-md-3 mb-4'>
                              <div className='card'>
                                  <img src='/imagen/imagen-no-disponible.jpg' className='card-img-top' alt='...'/>
                                  <div className='card-body'>
                                      <h4 className='cart-title'>Articulo 1</h4>
                                      <h6 className='cart-title text-muted'>Precio: $5</h6>
                                  </div>
                                  <div className='card-footer'>
                                      <button title='Agregar' className='btn btn-dark btn btn-sm'>Ordenar ahora</button>
                                      <button title='Agregar' className='btn btn-dark btn btn-sm ms-1'>Agregar a lista</button>
                                  </div>
                              </div>
                          </div>
                          {/* Articulo Box End */}
                          {/* Articulo Box */}
                          <div className='col-12 col-md-3 mb-4'>
                              <div className='card'>
                                  <img src='/imagen/imagen-no-disponible.jpg' className='card-img-top' alt='...'/>
                                  <div className='card-body'>
                                      <h4 className='cart-title'>Articulo 1</h4>
                                      <h6 className='cart-title text-muted'>Precio: $5</h6>
                                  </div>
                                  <div className='card-footer'>
                                      <button title='Agregar' className='btn btn-dark btn btn-sm'>Ordenar ahora</button>
                                      <button title='Agregar' className='btn btn-dark btn btn-sm ms-1'>Agregar a lista</button>
                                  </div>
                              </div>
                          </div>
                          {/* Articulo Box End */}
                          {/* Articulo Box */}
                          <div className='col-12 col-md-3 mb-4'>
                              <div className='card'>
                                  <img src='/imagen/imagen-no-disponible.jpg' className='card-img-top' alt='...'/>
                                  <div className='card-body'>
                                      <h4 className='cart-title'>Articulo 1</h4>
                                      <h6 className='cart-title text-muted'>Precio: $5</h6>
                                  </div>
                                  <div className='card-footer'>
                                      <button title='Agregar' className='btn btn-dark btn btn-sm'>Ordenar ahora</button>
                                      <button title='Agregar' className='btn btn-dark btn btn-sm ms-1'>Agregar a lista</button>
                                  </div>
                              </div>
                          </div>
                          {/* Articulo Box End */}
                          {/* Articulo Box */}
                          <div className='col-12 col-md-3 mb-4'>
                              <div className='card'>
                                  <img src='/imagen/imagen-no-disponible.jpg' className='card-img-top' alt='...'/>
                                  <div className='card-body'>
                                      <h4 className='cart-title'>Articulo 1</h4>
                                      <h6 className='cart-title text-muted'>Precio: $5</h6>
                                  </div>
                                  <div className='card-footer'>
                                      <button title='Agregar' className='btn btn-dark btn btn-sm'>Ordenar ahora</button>
                                      <button title='Agregar' className='btn btn-dark btn btn-sm ms-1'>Agregar a lista</button>
                                  </div>
                              </div>
                          </div>
                          {/* Articulo Box End */}
                      </div>
                  </div>
          </main>
      </>
    )
  }


export default ArticulosPopulares;
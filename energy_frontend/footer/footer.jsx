import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'

const Footer = () => {

  return (
    <>
      <main className='mt-5'>
          <div className='container'>
            <footer className='d-flex flex-wrap justify-content-between container align-items-center my-4 border-top'>
              <div className='col-md-8 d-flex align-items-center'>
                <a href='/' className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'>
                  Gestion Energetica
                </a>
                <span className='mb-3 mb-md-0 text-muted'> 2025 Universidad de Camaguey</span>
              </div>
            </footer>
          </div>
      </main>
  </>
  )
}

export default Footer
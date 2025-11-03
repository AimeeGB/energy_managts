import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
// import ArticuloSingle from '../../components/articulos-single';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ArticulosHome = () => {

    // const baseUrl = 'http://127.0.0.1:8000/api';
    // const [articulos,setArticulos] = useState([])

    // useEffect(() => {
    //     fetchData(baseUrl +'/articulos');
    // },[]);

    // function fetchData(baseurl){
    //     fetch(baseurl)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setArticulos(data.results);
    //     });
    // }

    // const articulos=[
    //     {
    //         'title':'Lapiz',
    //         'price':'5'
    //     },
    //     {
    //         'title':'Goma',
    //         'price':'15'
    //     },
    //     {
    //         'title':'Carpeta',
    //         'price':'9'
    //     },
    //     {
    //         'title':'Folios',
    //         'price':'5'
    //     },
    // ]

    return (
        <>
            <main className='mt-5'>
                <div className='container'>
                    <h3 className='mb-4'>Ultimos Articulos 
                        <Link to='/articulos' className='float-end btn btn-sm btn-dark m-2'>Ver Todos</Link>
                    </h3>
                    <div className='row mb-4'>
                        {/* {
                            articulos.map((articulo)=> <ArticuloSingle articulo={articulo}/>)
                        } */}
                        
                    </div>
                </div>
            </main>
        </>
    )
}
export default ArticulosHome; 

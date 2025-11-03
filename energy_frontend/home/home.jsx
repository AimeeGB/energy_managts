import React from 'react'
import ArticulosPopulares from './components/articulos-populares';
import MayoresExtracciones from './components/extracciones-populares';
import CategoriasHome from './components/categorias-home';
import ArticulosHome from './components/articulos-home';
import SlideInfo from './components/slide-info';

const Home = () => {
  return (
    <div>
        <ArticulosHome/>
        <CategoriasHome/>
        <ArticulosPopulares/>
        <MayoresExtracciones/>
        <SlideInfo/>
    </div>
  )
}

export default Home
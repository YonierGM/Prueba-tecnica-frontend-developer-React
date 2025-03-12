
import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

import List from './features/employees/pages/List';
import Detail from './features/employees/pages/Detail';

import Home from './features/employees/pages/Home';
import Header from './componentes/header/header';

import "./App.css";

function App() {
  return (
    <>
    <section className="layout">
      <BrowserRouter>
      <Header></Header>
        <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path='/empleados' element={<List/>}></Route> 
            <Route path='/empleados/:id' element={<Detail/>}></Route> 
        </Routes>
  
      </BrowserRouter>
    </section>
    </>
        
  );
}

export default App

import './App.css';
import AppNavbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import Add from './pages/add'
import React  from 'react';

function App() {
  return (
    <>
    <AppNavbar />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/add" element={<Add/>}></Route>
    </Routes>
    </>
  );
}

export default App;

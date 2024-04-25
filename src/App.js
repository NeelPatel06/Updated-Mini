import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About'
import Signin from './components/Signin';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/add' Component={AddEdit}/>
        <Route exact path='/update/:id' Component={AddEdit}/>
        <Route exact path='/view/:id' Component={View}/>
        <Route exact path='/about' Component={About}/>
        <Route exact path='/signin' Component={Signin}/>
        <Route exact path='/main' Component={Main}/>
        <Route exact path='/navbar' Component={Navbar}/>
        <Route exact path='/sidebar' Component={Sidebar}/>
        <Route exact path='/chat' Component={Chat}/>
        <Route exact path='/search' Component={Search}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

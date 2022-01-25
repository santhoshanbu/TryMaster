import React from 'react'
import Form from './login/login';
import Header from './header/header';
import Menu from './menu/menu';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div  style={{width:'100%',height:'100%',backgroundColor:'#f0f8ff'}}>
      <div class='sticky-top' style={{backgroundColor:'#f0f8ff',zIndex:'1090',width:'100%',height:'9%',boxShadow: "rgb(201 194 194) 0px 6px 10px"}}>
        <Header />
      </div>
      <div style={{width:'100%',height:'91%'}}>
        <Routes>
            <Route exact path='/' element={<Form/>}/>
            <Route path='menu/*' element={<Menu/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;

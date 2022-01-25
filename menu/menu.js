import React from "react";
import Content from "./content/createEventForm";
import {Routes,Route} from 'react-router-dom'
import Navbar from "./navbar/navbar";
import ClientForm from './content/clientForm/clientForm'
import Promoter from "./content/promoter/promoter";
// import Modify from "./content/eventModifier";
import { DummyForm } from "./content/eventModifier";


export default function Menu() {
    return (
        <div class='d-flex' style={{ height: '100%', width: '100%'}}>
            <div style={{position:'fixed',boxShadow: "rgb(201 194 194) 0px 6px 10px", height: '100%', width: '20%'}}>
                <Navbar />
            </div>
            <div style={{marginLeft:'20%',width: '80%'}}>
                {/* <div className="text-center">Client Details</div> */}
                <Routes>
                    <Route exact  path='/' element={ <Content /> } />
                    <Route exact  path='content' element={ <Content /> } />
                    <Route path='clientform' element={ <ClientForm /> } />
                    <Route path='promoter' element={ <Promoter /> } />
                    <Route path='dummyform' element={ <DummyForm /> } />
                    
                </Routes>
            </div>
        </div>
    )
}
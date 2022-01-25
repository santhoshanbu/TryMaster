import React from "react";
// import { Nav} from 'react-bootstrap'
import './style.css'
import {useNavigate,NavLink} from 'react-router-dom'


export default function Navbars() {
const navigate=useNavigate();
    const nav = [{ title: 'Event Handling', path: 'content' ,padding:'3% 37% 3% 20%'},
                 { title: 'Client Details', path: 'dummyform' ,padding:'3% 42% 3% 20%'},
                 { title: 'Promoter Details', path: 'promoter' ,padding:'3% 33% 3% 20%'},
                 { title: 'Registeration Details', path: 'clientform',padding:'3% 23% 3% 20%' }
                ];

    const route=(item,order)=>{
        navigate(item)
    }

    return (
        <div style={{display:'flex',flexDirection:'column',marginTop:'3%'}}>
                {
                    nav.map((item,index)=><div activeClassName="active" onClick={()=>route(item.path,index)} style={{marginLeft:'1%',color:'black',padding:'3% 2%'}}><NavLink className='nav_link' style={{fontSize:'99%',textDecoration:'none',color:'#484646',padding:item.padding}}  exact  to={item.path}>{item.title}</NavLink></div>)
                }
        </div>
    )
}




// bootstrap nnavigation

{/* <Nav data-toggle="tab"  style={{borderBottom:'none',marginTop:'5%'}} variant="tabs" defaultActiveKey="/home" className=" flex-column">
                    
                            {
                                nav.map((item, index) =>
                                <Nav.Item class={index} onClick={()=>route(item.path,index)}>
                                    <Nav.Link style={{color:'white'}} >{item.title}</Nav.Link>
                                </Nav.Item>
                                )
                            }
                </Nav> */}
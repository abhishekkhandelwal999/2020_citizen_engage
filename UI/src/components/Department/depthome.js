import React, { Component } from "react";
import logo from '../images/userhome.jpg';
import '../images/bgimage.css';
import './depthome.css'
import Nav from './nav.js';
//import SignUp from "../components/signup.component";
//import User from "./components/user"
/*function Login(prop){
    const onSubmit =() => {
        
        prop.history.push('/User');
    }*/
    export default class wardhome extends Component{
    render() {
        var category=sessionStorage.getItem("category");
        
        console.log("session storage:"+category);
        return (

            <div className = "adminhomebg">
                <div className="wrapper">
                    <Nav/>             
                    <div className="main_content">
                        <div className="header">Ward Home</div>    
                        {/* <center>This is {sessionStorage.getItem("category")} Home</center>                      */}
                    </div>                      
                </div>      
             
                
           </div>                  
        );
}
}
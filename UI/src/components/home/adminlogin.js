import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import './home.css';
import Navigation from './Nav.js';
import img from '../images/adminlogin.jpeg';
import {createBrowserHistory} from 'history';

const image = {
    backgroundImage: 'url(' + img + ')',
    width: "100%",
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
}
var body;
let token="";

class Adminlogin extends Component{
    render() {
        return (
        <div style={image}>
            <Navigation/>
            <br></br><br/><br/>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Admin Login</h3>
                        <div className="form-group">
                            <label>Admin Name</label>
                            <input type="text" name="name" id="examplename" className="form-control" placeholder="Enter name"/>
                        </div>
                        <div className="form-group">
                             <label>Password</label>
                            <input type="password" name="password" id="examplePassword" className="form-control" placeholder="Enter password" />
                        </div>
                        <a type="submit" className="btn btn-primary btn-block" href="/adminhome" >Login</a>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                         </p>
                    </form>
                </div>
            </div> 
            <br/> <br/> <br/> <br/> <br/> <br/>          
        </div>
        );
    }
}
export default withRouter(Adminlogin);
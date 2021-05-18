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

const span1 = {
  color: "red"
}

const validPasswordRegex = RegExp( /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/);
const validNameRegex = RegExp(/^[a-z A-Z,.'-]+$/i);

var body;
let token="";

class deptlogin extends Component{

    constructor(props) {
        super(props);
        this.state={
          name : '',
          password : '',
          errors : {
            name : '',
            password : ''
          }
        }
        //onsole.log(this.props.name)  
        this.handlelogin = this.handlelogin.bind(this);
        this.handlename = this.handlename.bind(this);
        this.handlepass = this.handlepass.bind(this);
      }
      handlename(event){
        const { name, value } = event.target;
        let errors = this.state.errors;
        errors.name = 
        validNameRegex.test(value)
                ? ''
                : 'Username is not valid';
        if(errors.name ===  '')
        {
              this.setState({n : true});
       }
        this.setState({errors, [name]: value});
      }
      handlepass(event){
        const { name, value } = event.target;
    let errors = this.state.errors;
    errors.password = 
          validPasswordRegex.test(value)
            ? ''
            : 'Password is not valid';
    if(errors.password ===  '')
      {
         this.setState({p : true});
     }
    this.setState({errors, [name]: value});
    }

    handlelogin(event) {

        event.preventDefault();
          console.log(this.state)
           var body = {
            Name : this.state.name,
            Password : this.state.password,
          }
          console.log(body);
          console.log(body.Name);
          console.log(body.Password);
          if(this.state.name===""){
            alert('Please enter the name')
      
          }
          else if(this.state.password===""){
            alert('Please enter the password')
          }
          
          else{
              const url = "http://localhost:9000/deptlogin";
                let headers = new Headers();
            
                headers.append('Content-Type','application/json');
                headers.append('Accept','application/json');
            
                headers.append('Access-Control-Allow-origin',url);
                headers.append('Access-Control-Allow-Credentials','true');
            
                headers.append('POST','GET');
            
                fetch(url, {
                  headers:headers,
                  method: 'POST',
                  body: JSON.stringify(body)
                })
          
                .then(response => {if(response.ok){
                  // UserProfile.setEmail(this.state.email);
                  response.json()
                  .then(res=> {
                    console.log(res.id)
                    sessionStorage.setItem("DeptIdentity",res.id);
                    
                    console.log(res.Name)
                    sessionStorage.setItem("DeptHeadName",res.Name);
                    console.log(res.Category)
                    sessionStorage.setItem("DeptCategory",res.Category);

                    window.location.href="/depthome";
                  })
                }
                else if(!response.ok){
                  console.log("Wrong name or password")
                  alert("Wrong name or password")
                }
                })
                {/*}.catch((error)=> {console.log("can't access" + url + "response. " +error )},
                  alert("Wrong email or password"))*/}
      
                }
            
          } 

    render() {
      const {errors} = this.state;
        return (
        <div style={image}>
            <Navigation/>
            <br></br><br/><br/>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Department Login</h3>
                        <div className="form-group">
                            <label>Department Name</label>
                            <input type="text" name="name" id="examplename" onChange={this.handlename} className="form-control" placeholder="Enter name"/>
                            <span style={span1} className='error'>{errors.name}</span>
                        </div>
                        <div className="form-group">
                             <label>Password</label>
                            <input type="password" name="password" id="examplePassword"   onChange={this.handlepass} className="form-control" placeholder="Enter password" />
                            <span style={span1} className='error'>{errors.password}</span>
                        </div>
                        <a type="submit" className="btn btn-primary btn-block" onClick={this.handlelogin} >Login</a>
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
export default withRouter(deptlogin);
import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import './depthome.css';
import Navigation  from './nav.js';
import './view.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import img from '../images/userlogin.jpeg';
import UserProfile from '../User/UserProfile';
import {createBrowserHistory} from 'history';


var body;
let token="";
var result;

class Viewusers extends Component{
  constructor(props) {
    super(props);
    this.state={
      users :[]
    }
    

  
    console.log(body);
    
   
        const url = "http://localhost:9000/getUsers";
          let headers = new Headers();
      
          headers.append('Content-Type','application/json');
          headers.append('Accept','application/json');
      
          headers.append('Access-Control-Allow-origin',url);
          headers.append('Access-Control-Allow-Credentials','true');
      
          headers.append('POST','GET');
      
          fetch(url, {
            headers:headers,
            method: 'GET',
            body: JSON.stringify(body)
          })
          .then(response => {if(response.ok){
            // UserProfile.setEmail(this.state.email);
            response.json()
            .then(res=> {
              console.log(res)
              this.setState({
                  users : res
              })          
            })
          }
          else if(!response.ok){
            console.log("Wrong email or password")
            alert("Wrong email or password")
          }
          })    
      
    } 

    indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>) 
    }

    render() {
        return (
        <div>
       <div className="wrapper">
            <Navigation/>
            <br></br><br/>
            <br/>
           <div className="main_content">
                        <div className="header"><h2><u>Users</u></h2></div>
          <BootstrapTable data={ this.state.users } striped hover condensed height='120' scrollTop={ 'Bottom' }>
          <TableHeaderColumn width='250' dataField="any" dataFormat={this.indexN} isKey>S.No</TableHeaderColumn>
          {/* <TableHeaderColumn width='200' dataField='id' isKey>ID</TableHeaderColumn> */}
          <TableHeaderColumn  width='250' dataField='Name'>NAME</TableHeaderColumn>
          <TableHeaderColumn  width='150' dataField='Email'>EMAIL</TableHeaderColumn>
          <TableHeaderColumn  width='150' dataField='Mobile'>MOBILE</TableHeaderColumn>
         
          
      </BootstrapTable>
            
          </div></div>
          </div>
        );
    }
}
export default withRouter(Viewusers);
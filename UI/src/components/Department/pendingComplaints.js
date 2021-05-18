import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import './depthome.css';
import {Dropdown,DropdownButton}  from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Container,Row,Col} from 'react-bootstrap';
import { createBrowserHistory as history} from 'history';

import Nav  from './nav.js';
import img from '../images/userlogin.jpeg';
import UserProfile from '../User/UserProfile';
import {createBrowserHistory} from 'history';


var body;
let token="";
var result;

class pendingComplaints extends Component{
  constructor(props) {
    super(props);
    this.state={
      complaints :[]
    }
  }
    indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>) 
  }

  // view(cell,row){
  //   return (<div><a href={"/viewandclose/"+row.Cid}>View Details</a></div>)
  // }

  // CellFormatter(cell, row) {
  //   return (<div><a href={"/"+row.Cid}>{cell}</a></div>);
  // }

  componentDidMount() {
    console.log(body);
    var body = {
      Category: sessionStorage.getItem("category")
    }
   
        const url = "http://localhost:9000/wardpending";
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
              console.log(res)
              this.setState({
                  complaints : res
              })          
            })
          }
          
          })
             
    } 
    
    expandComponent(row) {
      var route= "/viewandclose/"+row.Cid;
      var createdimg="/images/"+row.CreatedImage;
      return (
        <div>
          <Container border="5px">
            <Row>
              <Col>Cid : {row.Cid}</Col>
              <Col>Created Time : {row.CreatedAt}</Col>
            </Row>
           <Row>
              <Col>Image : <img src={createdimg}/></Col>
          </Row>
          <Row>
      <Col>Description:{row.CreatedDescription}</Col>
      </Row>
          <Row>
            <Col><button onClick={event =>  window.location.href= "/viewandclose/"+row.Cid}>Take Action</button></Col>
  </Row>
</Container>
        </div>
      );
    }

    isExpandableRow(row) {    
        return true;      
    }


    render() {
        return (
          <div>
          <div className="wrapper">
          <Nav/>
          <br></br><br/>
          <br/>
          <div className="main_content">
                <div className="header"><h2><u>Pending Complaints</u></h2></div>
        <BootstrapTable data={ this.state.complaints }  expandComponent={ this.expandComponent } expandableRow={ this.isExpandableRow } striped hover condensed keyBoardNav>
        <TableHeaderColumn width="70" dataField="any" dataFormat={this.indexN} >S.No</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField='Cid' isKey ={true} hidden>CID</TableHeaderColumn>
        <TableHeaderColumn  width='150' dataField='Email' >EMAIL</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField='Category'>CATEGORY</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField= 'Location'>LOCATION</TableHeaderColumn>
        {/* <TableHeaderColumn width='150' dataField= 'Details' dataFormat={this.view}>Details</TableHeaderColumn> */}
    </BootstrapTable>
          
        </div></div></div>
        );
    }
}
export default withRouter(pendingComplaints);
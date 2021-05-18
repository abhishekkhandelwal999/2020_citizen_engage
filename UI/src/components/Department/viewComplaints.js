import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import './view.css';
import './depthome.css'
import Nav  from './nav.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import img from '../images/userlogin.jpeg';
import UserProfile from '../User/UserProfile';
import {createBrowserHistory} from 'history';
import {Container,Row,Col} from 'react-bootstrap';

var body;
let token="";
var result;
var ReactBsTable = require('react-bootstrap-table');


const Status = {
  'Pending': 'Pending',
  'Closed': 'Closed',
  };
  function enumFormatter(cell, row, enumObject) {
    //window.location.reload(false);
  return enumObject[cell];
  }

class viewComplaints extends Component{
  constructor(props) {
    super(props);
    this.state={
      complaints :[]
    }
    
  }
  indexN(cell, row, enumObject, index) {
    return (<div>{index+1}</div>) 
}

  componentDidMount() {
    var body = {
      Category: sessionStorage.getItem("DeptCategory")
    }
  
  
    console.log(body);
    
   
        const url = "http://localhost:9000/deptComplaints";
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
          else if(!response.ok){
            console.log("Wrong email or password")
            alert("No data")
          }
          })

          
      
    } 

    expandComponent(row) {
      // var route= "/viewandclose/"+row.Cid;
      var createdimg="/images/"+row.CreatedImage;
      var closedtime;
      var closedimg;
      var image;
      if(row.Status=="Pending"){
        closedimg = row.ClosedImage;
        closedtime = "Not Yet Closed";
       image = <Row>
        <Col><button type="submit" className="btn btn-primary btn-block" onClick={(event) => 
          {sessionStorage.setItem("Cid",row.Cid)
          sessionStorage.setItem("UserMail",row.Email)
          sessionStorage.setItem("MailLocation",row.Location)
          sessionStorage.setItem("MailCategory",row.Category)
          sessionStorage.setItem("MailName",row.Name)
          window.location.href= "/viewandclosedept"}}>Take Action</button></Col>
</Row>
      }
      else{
        var img = "/images/"+row.ClosedImage;
        closedimg=<img src={img}/>;
        closedtime = row.ClosedAt;
      }
      return (
        <div>
          <Container border="5px">
            <Row>
              <Col>Cid : {row.Cid}</Col>
              <Col>Created Time : {row.CreatedAt}</Col>
              <Col>Closed Time : {closedtime}</Col>
            </Row>
           <Row>
              <Col>Problem Image : <img src={createdimg}/></Col>
      <Col>Solved Image :{closedimg}</Col>
          </Row>
          <Row>
      <Col>Description:{row.CreatedDescription}</Col>
      <Col>Description:{row.ClosedDescription}</Col>
      </Row>{image}
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
                        <div className="header"><h2><u>Complaints</u></h2></div>
          <BootstrapTable data={ this.state.complaints } expandComponent={ this.expandComponent } expandableRow={ this.isExpandableRow } striped hover condensed >
          <TableHeaderColumn width='70' dataField="any" dataFormat={this.indexN}>S.No</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Cid' isKey hidden>CID</TableHeaderColumn>
          <TableHeaderColumn  width='150' dataField='Email'>EMAIL</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Location'>LOCATION</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Status' filterFormatted dataFormat={ enumFormatter }  formatExtraData={ Status } filter={ { type: 'SelectFilter', options: Status } }>STATUS</TableHeaderColumn>
           
      </BootstrapTable>
            
          </div></div></div>
        );
    }
}
export default withRouter(viewComplaints);
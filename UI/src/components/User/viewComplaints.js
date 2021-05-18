import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import './UserHome.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Nav  from './nav.js';
import {Container,Row,Col} from 'react-bootstrap';
var print;
function sendAlert(row)
{  var EMAIL = "chinnireddy2018@gmail.com";
    const templateId = 'admin';
    const EMAILMESSAGE= "The Complaint with Id:"+row.Cid+" is delayed more than fixed period.Please Take immediate action"
    sendFeedback(templateId, {message_html: EMAILMESSAGE, from_name: row.Name, email: EMAIL,to_name:"ADMIN"})
    alert("Alert Send successfully");
    }

function sendFeedback (templateId, variables) {
  window.emailjs.send(
    'gmail', templateId,
    variables
    ).then(res => {
      console.log('Email successfully sent!')
    })
    // Handle errors here however you like, or use a React error boundary
    .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  } 

const Status = {
  'Pending': 'Pending',
  'Closed': 'Closed',
  };
  const Category = {
    'Electricity':'Electricity',
    'Water':'Water',
    'Road':'Road',
    'Garbage':'Garbage',
  }
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
componentDidMount(){
  var body = {
    id: sessionStorage.getItem("Identity")
  }
  console.log("Body"+body.id);

      const url = "http://localhost:9000/userAllComplaints";
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
            console.log("Response:"+res)
            this.setState({
                complaints : res
            })          
          })
        }
        
        })
        console.log(body);
        console.log("Body"+body.id);
           
  } 
  expandComponent(row) {
    var createdimg="/images/"+row.CreatedImage;
    var closedtime;
    var closedimg;   
    var image;
    var flag=1;
    var createdtime = row.CreatedAt;
    var pdate = new Date();
    var presenthours = pdate.getHours();
    var presentMonth=pdate.getMonth()+1;
    var presentYear=pdate.getFullYear();
    var presentDate=pdate.getDate();
    var total = createdtime.split(" ",2);
    var date = total[0].split("-",3);
    var years = date[0];
    var months = date[1];
    var day =  date[2];
    var time = total[1].split(":",3)
    var hour = time[0];
    var diffm=presentMonth-months;
    var diffd=presentDate-day;
    var diffh=presenthours-hour;
    
    var diff = presenthours-hour;
    console.log("diffmonth",diffm);
    console.log("diffhours",diffh);
    console.log("diffday",diffd);
    if(row.Category==='Road')
    {
      if(diffm>1)
      {
        flag=0;
        print=diffm+" Months";
      }
      else if(diffd>4){ flag=0; print=diffd+" Days"}
     
      else {
      flag=1; print=diffh+" Hours"}
    }
    else if(row.Category==='Electricity')
    {
      if(diffm>1)
      {
        flag=0;
        print=diffm+" Months";
      }
    else if(diffd>=2){
      flag=0;print=diffd+" Days"}
      else if(diffh>3){
      flag=0;print=diffh+" Hours"}
      else{
      flag=1;print=diffh+" Hours"}
    }
    else if(row.Category==='Garbage')
    {
      if(diffm>1)
      {
        flag=0;
        print=diffm+" Months";
      }
      else if(diffd>2){ flag=0; print=diffd+" Days"}
     
      else {
      flag=1; print=diffh+" Hours"}
    }
    else if(row.Category==='Water')
    {
      if(diffm>1)
      {
        flag=0;
        print=diffm+" Months";
      }
      else if(diffd>1){ flag=0; print=diffd+" Days"}
     
      else {
      flag=1; print=diffh+" Hours"}
    }
      if(row.Status === "Pending"){
        closedimg = row.ClosedImage;
        closedtime = "Not Yet Closed";
        if(flag===0){
          image= <Row>
            <Col>It is Delayed by :{print}</Col>
            <Col><button className="btn btn-danger btn-block" onClick={event =>  
             {
               sendAlert(row);
            }}>Send an Alert</button></Col>
            
      </Row>}
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
                        <BootstrapTable data={ this.state.complaints } expandComponent={ this.expandComponent } expandableRow={ this.isExpandableRow } striped hover condensed pagination>
          <TableHeaderColumn width='70' dataField="any" dataFormat={this.indexN}>S.No</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Cid' isKey hidden>CID</TableHeaderColumn>
          <TableHeaderColumn  width='150' dataField='Email'>EMAIL</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Category' filterFormatted dataFormat={ enumFormatter }  formatExtraData={ Category } filter={ { type: 'SelectFilter', options: Category }}>CATEGORY</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Location'>LOCATION</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Status' filterFormatted dataFormat={ enumFormatter }  formatExtraData={ Status } filter={ { type: 'SelectFilter', options: Status } }>STATUS</TableHeaderColumn>
           
      </BootstrapTable>
          </div></div></div>
        );
    }
}
export default withRouter(viewComplaints);
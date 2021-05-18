import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Container,Row,Col} from 'react-bootstrap';
function CurDateTime() {
  var tempDate = new Date();
 var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  const currDate = "Current Date= "+date;
  console.log("tempdate",tempDate);
  console.log(currDate);
  return (
    // <p>{currDate}</p>
    date
  );
}
var print;
function sendAlert(row)
{  var EMAIL;
  if(row.Category=="Electricity"){
    //  EMAIL = "meghana.honey44@gmail.com"}
    EMAIL="himajareddy2016@gmail.com"}
  if(row.Category=="Road"){
   EMAIL="himajareddy2016@gmail.com"}
   if(row.Category=="Water")
   {
     EMAIL="pavanisiddam2k@gmail.com"
   }
    const templateId = 'template_NgHqYVXi';
    const EMAILMESSAGE= "The Complaint with Id:"+row.Cid+" is delayed by "+print+" Please Take immediate action."
    sendFeedback(templateId, {message_html: EMAILMESSAGE, from_name: "CITIZENS ENGAGE ADMIN", email: EMAIL})
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

class Pending extends Component{
  constructor(props) {
    super(props);
   
    this.state={
      complaints :[]
    }
}
indexN(cell, row, enumObject, index) {
  return (<div>{index+1}</div>) 
}
// CellFormatter(cell,row){
//   var createdtime = row.CreatedAt;
//   var pdate = new Date();
//   var presenthours = pdate.getHours();
//   var total = createdtime.split(" ",2);
//   var date = total[0].split("-",3);
//   var years = date[0];
//   var months = date[1];
//   var day =  date[2];
//   var time = total[1].split(":",3)
//   var hour = time[1];
//   var diff = presenthours-hour;
//   console.log("difference in cekl",diff);
//   return(
//   <div>
//     if(diff>3){
//       <h1 style="color:red"> </h1>
//     }
//   </div>
//   )
// }
componentDidMount(){
  var body = {
    name: sessionStorage.getItem("cat")
  }
  console.log("Body"+body.name);

      const url = "http://localhost:9000/statusPendingComplaints";
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
        .then(response => {
          console.log(response)
          if(response.ok){
          // UserProfile.setEmail(this.state.email);
          response.json()
          .then(res=> {
            console.log("Response:"+res)
            console.log("complaints:"+res.CreatedAt)
            this.setState({
                complaints : res
            })    
          })
         
        }
        
        })
           
  } 
  expandComponent(row) {
    // var route= "/viewandclose/"+row.Cid;
    var createdimg="/images/"+row.CreatedImage;
    var closedtime;
    var closedimg;
    var image;var flag=1;
    // var creat=row.CreatedAt;
    // var diff=creat-CurDateTime()
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
    console.log("diffmontg",diffm);
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
    if(row.Category==='Electricity')
    {
      if(diffm>1)
      {
        flag=0;
        print=diffm+" Months";
      }
    else if(diffd>=1){
      flag=0;print=diffd+" Days"}
      else if(diffh>3){
      flag=0;print=diffh+" Hours"}
      else{
      flag=1;print=diffh+" Hours"}
    }
    // if(creat-CurDateTime()>1)
    //    diff='RedAlert';
    //   else
    //   diff='BlueAlert'
      //console.log("difference",diff);

    if(row.Status=="Pending"){
      closedimg = row.ClosedImage;
      closedtime = "Not Yet Closed";
      if(flag===0){
     image= <Row>
       <Col>It is Delayed by :{print}</Col>
       <Col><button onClick={event =>  
        {
          sendAlert(row);
       }}>Send an Alert</button></Col>
       
 </Row>}
    else
    {
      image=<Row><Col>Diff is:{print}</Col></Row>
    }
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
            {/* <Col>Closed Time : {closedtime}</Col> */}
          </Row>
         <Row>
            <Col>Problem Image : <img src={createdimg}/></Col>
    {/* <Col>Solved Image :{closedimg}</Col> */}
        </Row>
        <Row>
    <Col>Description:{row.CreatedDescription}</Col>
    {/* <Col>Description:{row.ClosedDescription}</Col> */}
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
            
                    <div className="main_content">
                        <div className="header"><h2><u>Pending Complaints</u></h2></div>
          <BootstrapTable data={ this.state.complaints } expandComponent={ this.expandComponent } expandableRow={ this.isExpandableRow } striped hover condensed>
          <TableHeaderColumn dataField="any" dataFormat={this.indexN} >S.No</TableHeaderColumn>
           <TableHeaderColumn width='150' dataField='Cid' isKey hidden>CID</TableHeaderColumn> 
          <TableHeaderColumn width='150'  dataformat={this.CellFormatter} dataField='Category'>CATEGORY</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='CreatedImage'>IMAGE</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Location'>LOCATION</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='CreatedAt'>TIMESTAMP</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='CreatedDescription'>DESCRIPTION</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='Status'>STATUS</TableHeaderColumn>
          
      </BootstrapTable>
        </div>
        <button   name="logout" onClick={event=>{window.location.href="/Authority"}}><span class="logout">Back</span></button>
        </div>
  

        );
    }
}
export default withRouter(Pending);
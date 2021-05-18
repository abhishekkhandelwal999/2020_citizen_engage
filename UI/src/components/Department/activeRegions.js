import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import './depthome.css';
import Navigation  from './nav.js';
import './view.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';

var body;

class activeRegions extends Component{
  constructor(props) {
    super(props);
    this.state={
       activeregions :[]
    }
    
  }

  arraytoJson(valuearrs) {
    var arr=[]
      for (var i = 0; i < valuearrs.length; i++) {
          arr[i]={};
          arr[i].Location = valuearrs[i][0];
          //arr[i].Category = valuearrs[i][1];
          arr[i].Count = valuearrs[i][1];
    }
    console.log(arr);
      return arr;
}

  componentDidMount()
  {
    body = {
      Category : sessionStorage.getItem("DeptCategory"),
    }

        const url = "http://localhost:9000/deptactiveregions";
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
              console.log(res);
              console.log(response);

              // let Data={};
              // for(let i=0;i<res.length;i++)
              // {
              //   let obj1 = res[i][0];
              //   let obj2 = res[i][1];
              //   Data[i] = { 'Email':obj1, 'Count':obj2};
              // }
              this.setState({
                  activeregions : this.arraytoJson(res)
              })          
            })
          console.log(this.state.activeregions);
            
          }
          else if(!response.ok){
            
            alert("No data")
          }
          })    
          console.log(this.state.activeregions);  
    } 

   
    indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>) 
    }
    CellFormatter(cell, row) {
    return( <Button variant="link" onClick={() => 
        {sessionStorage.setItem("DeptLocation",cell)
        window.location.href= "/deptlocationcomplaints"
        }}>{cell}</Button>)
      }
   

    render() {
  
        return (
        <div>
       <div className="wrapper">
            <Navigation/>
            <br></br><br/>
            <br/>
           <div className="main_content">
                        <div className="header"><h2><u>Active Regions</u></h2></div>
          <BootstrapTable data={ this.state.activeregions } striped hover condensed height='120' scrollTop={ 'Bottom' } >
          <TableHeaderColumn width='150' dataField="any" dataFormat={this.indexN} >Rank</TableHeaderColumn>
          <TableHeaderColumn  width='250' dataField='Location' dataFormat={this.CellFormatter} isKey >Location</TableHeaderColumn>
          <TableHeaderColumn  width='250' dataField='Count'>No. Of Complaints</TableHeaderColumn>
         
          
      </BootstrapTable>
            
          </div></div>
          </div>
          
        );
    }
}
export default withRouter(activeRegions);
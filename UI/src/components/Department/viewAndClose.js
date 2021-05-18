import React, { Component } from "react";
//import img from '../images/complaint.jpg';
import Nav from './nav.js';



// const image = {
//     backgroundImage: 'url(' + img + ')',
//     width: "100%",
//     height: '100%',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: '100% 100%',
//   }
  var body;
  
export default class complaint extends Component {
    constructor(props) {
        super(props);     
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.validateForm = this.validateForm.bind(this);
    
        //
      
        this.state = {
          image:"",
          description:"",
         
          //confirmPassword: ""
          
        };
    
      }
     CurDateTime() {
        var tempDate = new Date();
       var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = "Current Date= "+date;
        console.log(currDate);
        return (
          // <p>{currDate}</p>
          date
        );
      }
      
    
      handleImageChange = event => {
        var file = document.querySelector("#fileUpload");
        if ( /\.(jpe?g|png|gif)$/i.test(file.files[0].name) === false ) {
           alert("not an image!");
        }
        else{
          this.setState({
            image : event.target.value
          });
          console.log(this.state.image);
        }
      }
    
      handleDescriptionChange = event => {
        this.setState({
          description : event.target.value
        });
      }
    
    
    
      handleSubmit(event) {
        console.log("sample"+this.state.image);
        event.preventDefault();
        var totalimgname = this.state.image.split("\\");
        var imgname = totalimgname[totalimgname.length-1];
        body = {
          Cid: sessionStorage.getItem("Cid"),
          ClosedImage: imgname,
          ClosedDescription: this.state.description,
          ClosedAt : this.CurDateTime(),
          Status : "Closed",
        }
        console.log(body);
        if (this.state.image === ""){
          alert('Please select the image')
        }
        
        else if(this.state.description === ""){
          alert('Please enter the description')
        }
        else{
           const url = "http://localhost:9000/viewandclose";
           let headers = new Headers();
     
           headers.append('Content-Type','application/json');
           headers.append('Accept','application/json');
     
           headers.append('Access-Control-Allow-origin',url);
           headers.append('Access-Control-Allow-Credentials','true');
     
           headers.append('GET','POST');
     
           fetch(url, {
            headers:headers,
            method: 'POST',
            body: JSON.stringify(body)
         })
         .then(response => {if(response.ok){
            console.log(response);
            const EMAIL = sessionStorage.getItem("UserMail");
            const NAME = sessionStorage.getItem("MailName");
            const templateId = 'template_NgHqYVXi';
            const EMAILMESSAGE= "The "+sessionStorage.getItem("MailCategory")+" complaint you filed in "+sessionStorage.getItem("MailLocation")+" is successfully solved."
            this.sendFeedback(templateId, {message_html: EMAILMESSAGE, from_name: "CITIZENS ENGAGE ADMIN", email: EMAIL, to_name: NAME})
            alert("Closed successfully");
            this.props.history.push("/depthome");
          }
          
          else if(!response.ok){
            console.log(response);
            alert("Complaint cannot be closed");
          }
          })
          // .then(response =>{window.location.href="/Login"});             
       
     .catch(()=> console.log("can't access" + url + "response. "))
        }
    
      
      }

      sendFeedback (templateId, variables) {
        window.emailjs.send(
          'gmail', templateId,
          variables
          ).then(res => {
            console.log('Email successfully sent!')
          })
          // Handle errors here however you like, or use a React error boundary
          .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
        }
    
    render() {
      // var eid=this.props.match.params.id;
      // console.log(eid);
      // var identity = sessionStorage.getItem("Identity");
      // var emailid = sessionStorage.getItem("EmailId");
      // console.log("session storage:"+identity+" : "+emailid);
      
        return (
            <div class="wrapper">
               <Nav/>      
                <div class="main_content">
                    <center>
                    <div class="header"><b>Closing Complaint</b></div>  
                    <br/><br/>
                    <div class="info">
                    <div className="auth-wrapper">
    <div className="auth-inner">
    <div>
            <form>

                <div className="form-group">
                    Upload Image:
                    <input type="file" id="fileUpload" name="image" value = {this.state.image} onChange={this.handleImageChange} />
                </div>
                <div className="form-group">
                    <label>Description:</label><br></br>
                    <textarea cols={33} rows={4} name="description" onChange={this.handleDescriptionChange} value={this.state.description}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>        
            </form>
        </div>
        </div>
            </div>
                    </div>
                    </center>
                     
                    
                    </div>
            
          </div>  
            
        );
    }
}
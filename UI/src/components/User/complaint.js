import React, { Component } from "react";
import img from '../images/complaint.jpg';
import Nav from './nav.js';



const image = {
    backgroundImage: 'url(' + img + ')',
    width: "100%",
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  }
  var body;
  
export default class complaint extends Component {
    constructor(props) {
        super(props);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.validateForm = this.validateForm.bind(this);
    
        //
      
        this.state = {
          category: "",
          image:"",
          location: "",
          description:"",
         
          //confirmPassword: ""
          
        };
    
      }
     CurDateTime() {
        var tempDate = new Date();
        console.log(tempDate);
       var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = "Current Date= "+date;
        console.log(currDate);
        return (
          // <p>{currDate}</p>
          date
        );
      }
      
    
      handleCategoryChange = event => {
        this.setState({
          category : event.target.value
        });
        console.log(this.state.category);
      }
    
      handleImageChange = event => {
        var file = document.querySelector("#fUpload");
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
    
      handleLocationChange = event => {
        this.setState({
          location : event.target.value
        });
        console.log(this.state.location);
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
          Id: sessionStorage.getItem("Identity"),
          Email : sessionStorage.getItem("EmailId"),
          Name : sessionStorage.getItem("UserName"),
          Category: this.state.category,
          CreatedImage: imgname,
          ClosedImage: "Not Yet Closed",
          Location: this.state.location,
          CreatedDescription: this.state.description,
          ClosedDescription:"Not Yet Solved",
          CreatedAt : this.CurDateTime(),
          Status : "Pending",
        }
        console.log(body);
        if (this.state.image===""){
          alert('Please select the image')
        }
        
        else if(this.state.description===""){
          alert('Please enter the description')
        }
        else{
           const url = "http://localhost:9000/complaint";
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
          .then(response => response.json())
          .then(contents => {console.log(contents);
           
          // .then(response =>{window.location.href="/Login"});             
       })
     .catch(()=> console.log("can't access" + url + "response. "))
     alert("Complaint submitted successfully!");
        this.props.history.push("/user-home");
        }
     
      }

    
    render() {
      // var eid=this.props.match.params.id;
      // console.log(eid);
      var identity = sessionStorage.getItem("Identity");
      var emailid = sessionStorage.getItem("EmailId");
      console.log("session storage:"+identity+" : "+emailid);
      
        return (
            <div class="wrapper" style={image}>
               <Nav/>      
                <div class="main_content">
                    <center>
                    <div class="header"><b>Complaint Registration</b></div>  
                    <br/><br/>
                    <div class="info">
                    <div className="auth-wrapper">
    <div className="auth-inner">
    <div>
            <form>

                <div className="form-group">
                    <label>
                        Category:
                        <select name="category" onChange={this.handleCategoryChange} value={this.state.category}> 
                        <option value="Not Selected">Select Category</option>
                            <option value="Electricity">Electricity</option>
                            <option value="Water">Water</option>
                            <option value="Road">Road</option>
                            <option value="Garbage">Garbage</option>
                        </select>
                    </label>
                 </div>
                <div className="form-group">
                    Upload Image:
                    <input type="file" name="image" id="fUpload" value = {this.state.image} onChange={this.handleImageChange} />
                </div>
                <div className="form-group" >
                    <label>
                        Location:
                        <select name="location" onChange={this.handleLocationChange} value={this.state.location}> 
                        <option value="Not Selected">Select Location</option>
                        <option value="Ameerpet">Ameerpet</option>
                        <option value="Asif Nagar">Asif Nagar</option>
                            <option value="Attapur">Attapur</option>
                            <option value="Bahadurpura">Bahadurpura</option>
                            <option value="Balnagar">Balnagar</option>
                            <option value="Domalguda">Domalguda</option>
                            <option value="Erragadda">Erragadda</option>
                            <option value="Gachibowli">Gachibowli</option>
                            <option value="Khairatabad">Khairatabad</option>
                            <option value="Kukatpally">Kukatpally</option>
                            <option value="Kondapur">Kondapur</option>
                            <option value="Lakdikapul">Lakdikapul</option>
                            <option value="LB Nagar">LB Nagar</option>
                            <option value="Malakpet">Malakpet</option>
                            <option value="Miyapur">Miyapur</option>
                            <option value="Musheerabad">Musheerabad</option>
                            <option value="Nampally">Nampally</option>
                            <option value="Nizampet">Nizampet</option>
                            <option value="Panjagutta">Panjagutta</option>
                            <option value="Saidabad">Saidabad</option>
                            <option value="Secundrabad">Secundrabad</option>
                            <option value="Shaikpet">Shaikpet</option>

                           
                        </select>
                    </label>
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
import React from 'react';





class list extends React.Component {
    constructor(props) {
      super(props);
      //console.log(this.props.name)  
      this.handleclick = this.handleclick.bind(this);
      this.state={
        name:''
      }
    }
    
    render(){
      //sessionStorage.setItem("name",this.state.name)
      return(    
     <button   name={this.props.name} onClick={this.handleclick}><div class="img"><img src={this.props.icon} alt="Icon"></img></div><span class="text">{this.props.name}</span></button>
   
      );
    }
    handleclick(e) {
      //this.setState({ name: event.target.value});
      if(this.props.name == "Logout"){
        window.location.href="/Home";
      }
      else{
        console.log("hello",this.props.name)
        sessionStorage.setItem("cat",this.props.name)
        // console.log(e.target.name)
        window.location.href="/pending";
      }
      
    }
  }
  
  export default list;
  
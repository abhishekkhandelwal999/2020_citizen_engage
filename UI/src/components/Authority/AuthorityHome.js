import React, { Component } from "react";
import './Authority.css'
import List from './list.js'
import Bulb from '../images/images/Electric.svg'
import Road from '../images/images/road.svg'
import Sewage from '../images/images/s5.svg'
import Water from '../images/images/w4.svg'
import Garbage from '../images/images/garbage.svg'
import Logout from '../images/images/logout.jpg'
class Authority extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        {/* <img src={Bulb} alt="Hello"></img>  */}
        <div class="btn-group">
     <ul>
         <li> <List name="Electricity" icon={Bulb}></List></li>
         <li> <List name="Garbage" icon={Garbage}></List></li>
      <li><List name="Water" icon={Water}></List></li>
          <li><List name="Sewage" icon={Sewage}></List></li>
          <li><List name="Road" icon={Road}></List></li>
          <li><List name="Logout"></List></li>
          {/* <li><List name="Street Dogs" icon={Road}></List></li> */}
     </ul>
     
     
      
      
      
     </div></div>
   
    );
  }
}

export default Authority;

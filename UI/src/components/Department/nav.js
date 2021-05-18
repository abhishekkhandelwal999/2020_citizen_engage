import React, { Component } from "react";
import './depthome.css'
export default class Nav extends Component{
    render() {
        return (

            
                <div className ="sidebar">
                    <h2>CITIZENS ENGAGE</h2>
                    <ul>
                        <li><a href="/depthome"><i className ="fas fa-home"></i>Home</a></li>
                        <li><a href="/viewdeptcomplaints"><i className="fas fa-address-card"></i>View Complaints</a></li>
                        {/* <li><a href="/pendingcomplaints"><i className="fas fa-blog"></i>Pending Complaints</a></li>
                        <li><a href="/closedcomplaints"><i className="fas fa-address-book"></i>Closed Complaints</a></li> */}
                         <li><a href="/deptmarker"><i className="fas fa-address-card"></i>Map View</a></li>
                        <li><a href="/viewdeptusers"><i className="fas fa-address-card"></i>View Users</a></li>
                        {/* <li><a href="/deptleaderboard"><i className="fas fa-address-card"></i>Leaderboard</a></li>
                        <li><a href="/recentlycreated"><i className="fas fa-address-card"></i>Recently Created</a></li>
                        <li><a href="/recentlyclosed"><i className="fas fa-address-card"></i>Recently Closed</a></li> */}
                        <li><a href="/deptactiveregions"><i className="fas fa-address-card"></i>Active Regions</a></li>
                        <li><a href="/deptlogout"><i className="fas fa-map-pin"></i>Logout</a></li>
                    </ul> 
                
                </div>
               
        );
}
}
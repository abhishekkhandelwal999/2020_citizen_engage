import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
//import * as parkData from "./data/skateboard-parks.json";
import "./marker.css";

var body;

export const icon1 = new Icon({
  iconUrl: "garbage.svg",
  iconSize: [25, 25]
});

export const icon2 = new Icon({
  iconUrl: "road.svg",
  iconSize: [25, 25]
});

export const icon3 = new Icon({
  iconUrl: "sewage.svg",
  iconSize: [25, 25]
});

export const icon4 = new Icon({
  iconUrl: "Electric.svg",
  iconSize: [25, 25]
});
// const [activePark, setActivePark] = React.useState(null);
export default class deptMarker extends Component {
  constructor(props) {
    super(props);
    this.state={
      mapData :[]
    }
}

arraytoJson(valuearrs) {
  var arr=[]
    for (var i = 0; i < valuearrs.length; i++) {
        arr[i]={};
        arr[i].Cid = valuearrs[i][0];
        arr[i].Category = valuearrs[i][1];
        arr[i].Latitude = valuearrs[i][2];
        arr[i].Longitude = valuearrs[i][3];
        arr[i].Description = valuearrs[i][4];
  }
  console.log(arr);
    return arr;
}
  

componentDidMount(){
    
  body = {
    Category : sessionStorage.getItem("DeptCategory"),
  }
      const url = "http://localhost:9000/deptIconMap";
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
                mapData : this.arraytoJson(res)
            })          
          })
        }
        
        })
        console.log("Body"+this.state.mapData);
           
  } 
// CallIcon(){
//   if(loc.Category == "Garbage")
//       return icon1;
//   else
//       return icon2;
// }
  CallIcon(loc){
    if(loc.Category == "Garbage"){
        return  (<Marker
        key={loc.Cid}
        position={[loc.Latitude,loc.Longitude]}   
        // onClick={() => {this.setActiveLocation(loc);}}
        icon={icon1}
      >
      <Popup>
      Category : {loc.Category} <br/>
      Description : {loc.Description}
      </Popup>
      </Marker>
      );
    }
    else if(loc.Category == "Road"){
      return  (<Marker
      key={loc.Cid}
      position={[loc.Latitude,loc.Longitude]}   
      // onClick={() => {this.setActiveLocation(loc);}}
      icon={icon2}
    >
   <Popup>
      Category : {loc.Category} <br/>
      Description : {loc.Description}
    </Popup>
      </Marker>
    );
  }
  else if(loc.Category == "Water"){
    return  (<Marker
    key={loc.Cid}
    position={[loc.Latitude,loc.Longitude]}   
    // onClick={() => {this.setActiveLocation(loc);}}
    icon={icon3}
    >
   <Popup>
      Category : {loc.Category} <br/>
      Description : {loc.Description}
    </Popup>
       </Marker>
  
  );
}
    else if(loc.Category == "Electricity"){
      return (<Marker
      key={loc.Cid}
      position={[loc.Latitude,loc.Longitude]}   
      // onClick={() => {this.setActiveLocation(loc);}}
      icon={icon4}
      >
     <Popup>
      Category : {loc.Category} <br/>
      Description : {loc.Description}
    </Popup>
         </Marker>
    );
    }

  }
// setActiveLocation(loc){
//   return( <Popup>
//     <div>
//   <h2>{loc.Cid}</h2>
//   <p>{loc.Category}</p>
//   </div>
//   </Popup>)
 
// }

render(){
  var mapIcon;
  
  return (
    <MapContainer center={[17.437462, 78.448248]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* {this.state.mapData.map(loc => (
        mapIcon = CallIcon(loc)
        <Marker
          key={loc.Cid}
          position={[loc.Latitude,loc.Longitude]}   
          // onClick={() => {setActivePark(loc);}}
          icon={mapIcon}
        />
      ))} */}
      {this.state.mapData.map(loc => (
        this.CallIcon(loc)
      ))}

      {/* {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0]
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )} */}
    </MapContainer>
  );

}
  
}


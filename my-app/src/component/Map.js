import React from "react";
import { Map,MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Component } from 'react';


class Maps extends Component {
  // Méthode Post :
  state = {
    post: {},map:{getBounds:function(){} }
  }

  // Call API :
  /////////////////////////////////////////////////
  componentDidMount(){
    // paris :
    // fetch('http://localhost:3001/search?x1=49.28&y1=1.07&x2=47.78&y2=3.57')

    // lille :
    fetch('http://localhost:3001/search?x1=50.77&y1=2.89&x2=50.428&y2=3.27')

    .then((response) => {
      return response.json()
    })
    .then((result) => {
      this.setState({post: result})
      console.log(result)
    })
  }

  // position marker / Legend Popup
  /////////////////////////////////////////////////
  render() {
    
    if (!this.state.post.hits){ return null}

    const positions = this.state.post.hits.map((hit) => { 
       return [hit._source.location.lat, hit._source.location.lon, hit._source.legend]
    })

    // const L=0;
    // var map = L.map('map', {
    //   center: [51 , 2],
    //   zoom:13
    // })
    // const southWest = L.latLng(40.712, -74.227),
    // northEast = L.latLng(40.774, -74.125),
    // bounds = L.latLngBounds(southWest, northEast);

    // var latlng = L.latLng(50.5, 30.5);
     //Affichage de la page : 


     console.log(this.state.map);
    return (
      <div className="Maps">
    
    
    
    
      <MapContainer 
      // center={this.getCalculatedCenterFromState()}
      //           zoom={this.getCalculatedZoomFromState()}
      //           minZoom={this.getCalculatedMinZoomFromState()}
      //           maxZoom={2}
      //           onZoomEnd={this.mapService.handleZoomstart(/* map.object */)}
      whenCreated={map=>this.setState({map})} 
      center={[48.83, 2.36]} zoom={10}
      scrollWheelZoom={false}>
    
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {
        positions.map((position => {
          return  <Marker position={position}>
          {
          position.map((legend => {
            return  <Popup position={legend}>  
            {legend}
            </Popup>
           } ))
          }
          </Marker>
        } ))
      }
      </MapContainer>
      {/* latitude {Map.getCenter()}    , longitude {this.state.post.hits[0]._source.location.lon} */}
      </div>
    );
  }
}

  export default Maps;

import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Component } from 'react';


class Maps extends Component {
  // Méthode Post :
  state = {
    post: {}
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

     //Affichage de la page : 
    return (
      <div className="Maps">
    
      latitude {this.state.post.hits[0]._source.location.lat}    , longitude {this.state.post.hits[0]._source.location.lon}

      <Map center={[48.83, 2.36]} zoom={10}
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
      </Map>
      </div>
    );
  }
}

  export default Maps;

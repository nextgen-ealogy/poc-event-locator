import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Component } from 'react';
import { bounds, LatLngBounds } from "leaflet";


class Maps extends Component {
  
  // Méthode Post :
  state = {
    post: {},map:{getBounds:function DisplayPosition({ map ,useState, useCallback, useEffect}){ 
      const [position, setPosition] = useState(map.getCenter())
    
      const onClick = useCallback(() => {
        map.setView([48.83, 2.36], 13)
      }, [map])
    
      const onMove = useCallback(() => {
        setPosition(map.getCenter())
      }, [map])
    
      useEffect(() => {
        map.on('move', onMove)
        return () => {
          map.off('move', onMove)
        }
      }, [map, onMove])

      console.log('map center:', MapContainer.getCenter())
   } }
    
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

     console.log(this.state.map);
     console.log(this.state.map._lastCenter);
    return (
      <div className="Maps">
    
    {/* <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p> */}
    
    
      <MapContainer 

      whenCreated={map=>this.setState({map,getBounds(){}})} 
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
      
      {/* {map ? <DisplayPosition map={map} /> : null} */}
  

      </MapContainer>
      
      latitude {this.state.post.getBounds}    , longitude {this.state.post.hits[0]._source.location.lon}
      
      </div>
    );
  }
}

  export default Maps;

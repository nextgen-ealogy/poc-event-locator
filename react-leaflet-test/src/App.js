import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { render } from '@testing-library/react';
import { Component } from 'react';
import "./App.css";

/////////////////////////////////////////////////
// exemple 1 
// liste de todo
fetch('https://jsonplaceholder.typicode.com/todos/')
.then((response) => {
  return response.json()
})
.then((result) => {
  console.log('resultat todo list :')
  console.log(result)
})

/////////////////////////////////////////////////
// exemple 2
// coordonnée GPS (non fonctionnel)
fetch('https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357')

// localhost:
// fetch('http://localhost:3001/search?x1=-21.04&y1=-27.87&x2=-59.71&y2=-13.37')
// fetch('http://localhost:3001/point/_search')



.then((response) => {
  return response.json()
})
.then((result) => {
  console.log('coordonné fake API :')
  console.log(result)
})

class App extends Component {
  state = {
    post: {}
  }
  
  /////////////////////////////////////////////////
  componentDidMount(){
    // todo :
    // fetch('https://jsonplaceholder.typicode.com/todos/2')
  
    // coordonnée :
    fetch('https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357')
    // localhost:
    // fetch('http://localhost:3001/search?x1=-21.04&y1=-27.87&x2=-59.71&y2=-13.37')
    // fetch('http://localhost:3001/search?x1=-48.81&y1=2.34')
    // fetch('http://localhost:3001/point/_search')

  
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      this.setState({post: result})
      console.log(result)
    })
  }
  
  /////////////////////////////////////////////////
    render() {
      if (!this.state.post.features){ return null}
      // if (!this.state.post.locate){ return null}
      const position = [48.83, 2.36]
    return (
      <div className="App">
      <h1>test fetch</h1>
  
      {/* <p>titre todo list 2 :</p>
      {this.state.post.title} */}
  
  
      <p>coordonnée GPS :</p>
      {this.state.post.features[0].geometry.coordinates}
  
      {/* <p>titre local host :</p> */}
      {/* {this.state.post.locate} */}
  
   
    <Map center={[48.83, 2.36]} zoom={10}
    scrollWheelZoom={false}>
    
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
       <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    
    </Map>


      </div>
    );
  }
  }

  export default App;

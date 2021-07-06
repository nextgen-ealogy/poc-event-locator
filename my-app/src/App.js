import React from "react";
import { Component } from 'react';
import "./App.css";
import Maps from "./component/Map";
// import Position from "./component/Position";
// import Preview from "./component/Preview"
// import "../src/data/data.json"

// console.log des coordonnées API
/////////////////////////////////////////////////
// paris :
// fetch('http://localhost:3001/search?x1=49.28&y1=1.07&x2=47.78&y2=3.57')

// lille :
fetch('http://localhost:3001/search?x1=50.77&y1=2.89&x2=50.428&y2=3.27')

.then((response) => {
  return response.json()
})
.then((result) => {
  console.log('coordonnée API :')
  console.log(result)
})

class App extends Component {
  // Méthode Post :
  state = {
    post: {}
  }

    render() {
     //Affichage de la page : 
     
    return (
      <div className="App">
      <h1>Map leaflet</h1>
        <Maps />
      </div>
    );
  }
  }

  export default App;

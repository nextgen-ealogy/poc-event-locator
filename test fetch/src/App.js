import { render } from '@testing-library/react';
import { Component } from 'react';
import './App.css';

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
// fetch('http://localhost:3000/search?x1=-21.04&y1=-27.87&x2=-59.71&y2=-13.37')

.then((response) => {
  return response.json()
})
.then((result) => {
  console.log('coordonné fake API :')
  console.log(result)
})


/////////////////////////////////////////////////

// function App() {
class App extends Component {
state = {
  post: {}
}

/////////////////////////////////////////////////
componentDidMount(){
  // todo :
  fetch('https://jsonplaceholder.typicode.com/todos/2')

  // coordonnée :
  // fetch('https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357')
  // localhost:
  // fetch('http://localhost:3000/search?x1=-21.04&y1=-27.87&x2=-59.71&y2=-13.37')


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
  return (
    <div className="App">
    <h1>test fetch</h1>

    <p>titre todo list 2 :</p>
    {this.state.post.title}

    <p>coordonnée GPS : (non fonctionnel)</p>
    {this.state.post.coordinates}
    </div>
  );
}
}
export default App;

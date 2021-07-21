import { Bounds, LatLngBounds, latLngBounds, Map } from "leaflet";
import React, { useEffect, useState} from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


const Maps = () => {
  const [post, setPost] = useState({ hits: [] });
  const [bounds, setBounds] = useState({});
  const [map, setMap] = useState({});
  const [startDate] = useState({});
  const [endDate] = useState ({});
  const [state, setState] = useState ({
    startDate: "",
    endDate: ""
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  
  useEffect(() => {
    if(map.on){
      map.on("moveend", () => {
        setBounds(map.getBounds())
      })
    }
  }, [map])
  useEffect(() => {

    if(bounds._northEast && bounds._southWest){
      const northWestX = bounds._northEast.lat;
      const northWestY = bounds._southWest.lng;

      const southEastX =  bounds._southWest.lat
      const southEastY =  bounds._northEast.lng

      // if (hit._source.startDate && hit._source.endDate){
      // const startDate = hit._source.startDate
      // const endDate = hit._source.endDate
      // fetch("http://localhost:3001/search?x1="+northWestX+"&y1="+northWestY+"&x2="+southEastX+"&y2="+southEastY+"&d1="+true+"&d2="+true)
      // }
     

      fetch("http://localhost:3001/search?x1="+northWestX+"&y1="+northWestY+"&x2="+southEastX+"&y2="+southEastY)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setPost(result)
        });
    }
 

  }, [bounds]);

  if (!startDate && !endDate) {
      return null
  }

  if (!post.hits) {
    return null;
  }



  const positions = post.hits.map((hit) => {
    return [hit._source.location.lat, hit._source.location.lon, hit._source.startDate];
  });

  
  
  return (
      
    <div className="Form">
            <form>
                <label>startDate</label>

                <input 
                    type="date" 
                    name="startDate" 
                    value={state.startDate} 
                    onChange={handleChange} />

                <label>endDate</label>
                <input 
                    type="date" 
                    name="endDate" 
                    value={state.endDate} 
                    onChange={handleChange}/>

                <input 
                    type="button" 
                    value="Submit" 
                    onClick={this} />
            </form>

 <MapContainer
      whenCreated={(map) => {
        setMap(map)
        setBounds(map.getBounds())
      }}
      center={[48.83, 2.36]}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((position) => {
        return (
          <Marker position={position}>
            {position.map((startDate) => {
              return <Popup position={startDate}>{startDate}</Popup>;
            })}
          </Marker>
        );
      })}
    </MapContainer>

        </div>
    
  );
};

export default Maps;


// constructor(props) {
//     super(props);
    
//     this.initialState = {
//         hit: []
//     };

//     this.state = this.initialState;
//     console.log(this)
// }


// handleChange = events => {
//     const { startDate, endDate, value } = events.target;
//     this.setState({
//         [startDate] : value  ,
//         [endDate] : value
//     });
    
// }

// handleChange = events => {
//     index.search('query', {
//         filters: 'startDate'
//     })
// }


//   handleChange = events => {
//     const { startDate, value } = events.target;
//     this.setState({
//         [startDate] : value 
//     });
    
// }

// submitForm = () => {
//     this.props.handleSubmit(this.state);
//     this.setState(this.initialState);
// }

// render() {
//     const { startDate, endDate } = this.state; 

//     return (
        // <div className="Form">
        //     <form>
        //         <label>startDate</label>

        //         <input 
        //             type="date" 
        //             name="startDate" 
        //             value={startDate} 
        //             onChange={this.handleChange} />

        //         <label>endDate</label>
        //         <input 
        //             type="date" 
        //             name="endDate" 
        //             value={endDate} 
        //             onChange={this.handleChange}/>

        //         <input 
        //             type="button" 
        //             value="Submit" 
        //             onClick={this.submitForm} />
        //     </form>
        // </div>
//     );
// }
import { Bounds, LatLngBounds, latLngBounds, Map } from "leaflet";
import React, { useEffect, useState} from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


const Maps = () => {
  const [post, setPost] = useState({ hits: [] });
  const [bounds, setBounds] = useState({});
  const [map, setMap] = useState({});
 const [startDate, setStartDate] = useState ({});
const [endDate, setEndDate] = useState ({});

  function handleChange(evt) {
    const value = evt.target.value;
    setStartDate({
      ...startDate,
      [evt.target.startDate]: value
    });
  }

  function handleChanges(evt) {
    const value = evt.target.value;
    setEndDate({
      ...endDate,
      [evt.target.endDate]: value
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

      fetch("http://localhost:3001/search?x1="+northWestX+"&y1="+northWestY+"&x2="+southEastX+"&y2="+southEastY+"&startDate="+startDate+"&endDate="+endDate)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setPost(result)
      });
      
    }

  }, [bounds]);

  if (!post.hits) {
    return null;
  }

  const positions = post.hits.map((hit) => {
    return [hit._source.location.lat, hit._source.location.lon, hit._source.timestampStart];
  });

  
  console.log("startDate:", startDate, "enddate :", endDate);
  console.log("bounds._northEast:", bounds._northEast, "bounds._southWest :", bounds._southWest);
  console.log("hitscount", post)

  return (
      
    <div className="Form">
            <form>
                <label>startDate</label>

                <input 
                    type="date" 
                    name="startDate" 
                    value={startDate.setStartDate} 
                    onChange={handleChange} />

                <label>endDate</label>
                <input 
                    type="date" 
                    name="endDate" 
                    value={endDate.setEndDate} 
                    onChange={handleChanges}/>
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
            {position.map((timestampStart) => {
              return <Popup position={timestampStart}>{timestampStart}</Popup>;
            })}
            
          </Marker>
        );
      })}
    </MapContainer>

        </div>
    
  );
};

export default Maps;
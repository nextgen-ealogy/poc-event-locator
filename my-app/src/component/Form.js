import { Bounds, LatLngBounds, latLngBounds, Map } from "leaflet";
import React, { useEffect, useState} from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


const Maps = () => {
  const [post, setPost] = useState({ hits: [] });
  const [bounds, setBounds] = useState({});
  const [map, setMap] = useState({});
 const [timestampStart, setTimestampStart] = useState ();
const [timestampEnd, setTimestampEnd] = useState ();
  
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
      const timestampStart = new Date(Date.UTC(1900, 11, 20, 3, 23, 16, 738));
      console.log(timestampStart.toISOString().split('T')[0]);
      const timestampEnd = new Date(Date.UTC(2021, 11, 20, 3, 23, 16, 738));
      console.log(timestampEnd.toISOString().split('T')[0]);
      // fetch("http://localhost:3001/search?x1="+northWestX+"&y1="+northWestY+"&x2="+southEastX+"&y2="+southEastY)
      // .then((response) => {
      //   return response.json();
      // })
      // .then((result) => {
      //   setPost(result)
      // });
      
    //   if(startDate && endDate){
      fetch("http://localhost:3001/search?x1="+northWestX+"&y1="+northWestY+"&x2="+southEastX+"&y2="+southEastY+"&timestampStart="+timestampStart.toISOString().split('T')[0]+"&timestampEnd="+timestampEnd.toISOString().split('T')[0])
      .then((response) => {
        return response.json();
      })
      .then((result) => { 
        setPost(result)
      });
    // }

    }

  }, [bounds]);

  if (!post.hits) {
    return null;
  }

  const positions = post.hits.map((hit) => {
    return [hit._source.location.lat, hit._source.location.lon, hit._source.timestampStart];
  });

  
  console.log("timestampStart:", timestampStart, "timestampEnd :", timestampEnd);
  console.log("bounds._northEast:", bounds._northEast, "bounds._southWest :", bounds._southWest);
  console.log("hitscount", post)
 
  return (
      
    <div className="Form">
            <form>
                <label>startDate</label>

                <input 
                    type="date" 
                    name="timestampStart" 
                    value={timestampStart} 
                    min="1900-01-01" max="1902-12-31"
                    onChange={(e) => setTimestampStart(e.target.value)}
                    
                     />
                    

                <label>endDate</label>
                <input 
                    type="date" 
                    name="timestampEnd" 
                    value={timestampEnd} 
                    min="1951-01-01"
                    onChange={(e) => setTimestampEnd(e.target.value)}/>
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
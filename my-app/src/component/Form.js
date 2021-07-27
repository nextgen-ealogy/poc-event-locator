import { Bounds, LatLngBounds, latLngBounds, Map } from "leaflet";
import React, { useEffect, useState} from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


const Maps = () => {
  // Déclaration des useState :
  const [post, setPost] = useState({ hits: [] });
  const [bounds, setBounds] = useState({});
  const [map, setMap] = useState({});
  const [timestampStart, setTimestampStart] = useState ();
  const [timestampEnd, setTimestampEnd] = useState ();
  
// permet de récupérer les bordures de la map et de le déclarer dans le useState bounds
  useEffect(() => {
    if(map.on){
      map.on("moveend", () => {
        setBounds(map.getBounds())
      })
    }
  }, [map])

  // récupération de la base de donnée avec des requètes de filtre :
  useEffect(() => {

    // déclarer si on obtient les bordures northEast et southWest on exécute le code suivant :
    if(bounds._northEast && bounds._southWest){
      
      const northWestX = bounds._northEast.lat;
      const northWestY = bounds._southWest.lng;

      const southEastX =  bounds._southWest.lat
      const southEastY =  bounds._northEast.lng

      // si nous ne déclarons pas de filtre de temps alors on execute le code suivant :
      if(!timestampStart && !timestampEnd){
      fetch("http://localhost:3001/search?x1="+northWestX+"&y1="+northWestY+"&x2="+southEastX+"&y2="+southEastY)
      .then((response) => {
        return response.json();
      })
      .then((result) => { 
        setPost(result)
      });
    }
      // si nous déclarons un filtre de temps alors on execute le code suivant :
      if(timestampStart && timestampEnd){

      fetch("http://localhost:3001/search?x1="+northWestX+"&y1="+northWestY+"&x2="+southEastX+"&y2="+southEastY+"&timestampStart="+timestampStart+"&timestampEnd="+timestampEnd)
      .then((response) => {
        return response.json();
      })
      .then((result) => { 
        setPost(result)
      });
    }

    }
// nous faisons appel aux useState déclaré plus tôt.(bounds = bordure de map; timesTampStar et timesTampEnd seront déclaré dans l'input)
  }, [bounds,timestampStart,timestampEnd]);

  // si on ne récupère pas la base de données du fetch alors on ne déclare pas de post
  if (!post.hits) {
    return null;
  }

  // on déclare la constante position qui exécute le mapping de la BDD (on choisis par la suite les données que l'ont retourne avec le return)
  const positions = post.hits.map((hit) => {
    return [hit._source.location.lat, hit._source.location.lon, hit._source.timestamp];
  });

  
  console.log("timestampStart:", timestampStart, "timestampEnd :", timestampEnd);
  console.log("bounds._northEast:", bounds._northEast, "bounds._southWest :", bounds._southWest);
  console.log("hitscount", post)
 
  return (
  // partie Form :
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
            onChange={(e) => setTimestampEnd(e.target.value)}
        />
      </form>

      {/* partie Map : */}
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
            
              <Popup >
                Latitude :{position[0]},
                Longitude :{position[1]};<div/>
                Timestamp :{position[2]}<div/>
                
              </Popup>;
          
            </Marker>
          );
        })}
      </MapContainer>

    </div>
    
  );
};

export default Maps;
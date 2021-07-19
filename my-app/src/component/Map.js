import { Bounds, LatLngBounds, latLngBounds, Map } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Maps = () => {
  const [post, setPost] = useState({ hits: [] });
  const [bounds, setBounds] = useState({});
  const [map, setMap] = useState({});

  useEffect(() => {
    if(map.on){
      map.on("moveend", () => {
        setBounds(map.getBounds())
      })
    }
  }, [map])
  useEffect(() => {
    // TODO insérer les coordonnées à partir du state bounds
    console.log("bound", bounds)
    console.log("bounds southWest", bounds._southWest)
    console.log("bounds northEast", bounds._northEast)
    console.log("bounds zoom", bounds.zoom)
    console.log("bounds northWest", bounds._northWest, "bounds southEast", bounds._southEast)

    // console.log("northEast Lat", bounds._northEast.lat , "northEast Lng", bounds._northEast.lng)
    // console.log("southWest lat", bounds._southWest.lat, "southWest lng", bounds._southWest.lng )

    // lille :
    // fetch("http://localhost:3001/search?x1=50.77&y1=2.89&x2=50.428&y2=3.27")

            // paris :
    // fetch('http://localhost:3001/search?x1=49.28&y1=1.07&x2=47.78&y2=3.57')

    
      // fetch("http://localhost:3001/search?x1=49+bound._northEast.lat&y1=2.8+bound._northEast.lng&x2=48+bound._southWest.lat&y2=2+bound._southEast.lng")
      // fetch("http://localhost:3001/search?x1=bound._northEast.lat&y1=bound._northEast.lng&x2=bound._southWest.lat&y2=bound._southEast.lng")

      // le problème est que x1 et y1 doivent être = top_left mais le bounds._northWest ne peut pas être utilisé.

    // fetch("http://localhost:3001/search?x1=bounds._northEast.lat&y1=bounds._northEast.lng&x2=bounds._southWest.lat&y2=bounds._southWest.lng")
    // fetch("http://localhost:3001/search?x1=bounds._northWest.lat&y1=bounds._northWest.lng&x2=bounds._southEast.lat&y2=bounds._southEast.lng")
    // fetch("http://localhost:3001/search?x1="+bounds._northEast.lat+"&y1="+bounds._northEast.lng+"&x2="+bounds._southWest.lat+"&y2="+bounds._southWest.lng+"")
    // fetch("http://localhost:3001/search?x1="+bounds._northWest.lat+"&y1="+bounds._northWest.lng+"&x2="+bounds._southEast.lat+"&y2="+bounds._southEast.lng+"")
    // fetch("http://localhost:3001/search?x1="+bounds._northEast.lat+"&y1="+bounds._southWest.lng+"&x2="+bounds._southWest.lat+"&y2="+bounds._northEast.lng+"")
    
    fetch("http://localhost:3001/search?x1="+bounds._northEast.lat+"&y1="+bounds._northEast.lng+"&x2="+bounds._southWest.lat+"&y2="+bounds._southWest.lng+"")
    fetch("http://localhost:3001/search?x1="+bounds._northEast.lat+"&y1="+bounds._southWest.lng+"&y2="+bounds._northEast.lng+"&x2="+bounds._southWest.lat+"")

      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setPost(result)
      });
  }, [bounds]);

  if (!post.hits) {
    return null;
  }

  const positions = post.hits.map((hit) => {
    return [hit._source.location.lat, hit._source.location.lon, hit._source.legend];
  });
  return (
    <div className="Map">
    {/* latitude: {bounds._southWest} */}
    {console.log(bounds)}
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
            {position.map((legend) => {
              return <Popup position={legend}>{legend}</Popup>;
            })}
          </Marker>
        );
      })}
    </MapContainer>
    </div>
  );
};

export default Maps;

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
    fetch("http://localhost:3001/search?x1=50.77&y1=2.89&x2=50.428&y2=3.27")
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
  );
};

export default Maps;

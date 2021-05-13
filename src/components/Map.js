import React, { useEffect } from 'react';
import { MapContainer , TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

const Map = ({center, zoom}) => {

    useEffect(() => {
        console.log('center >>>>>>>>>>>> Map >>>>>> ', center);
    }, [center])

    return (
        <div className="map">
            {center &&
                <MapContainer center={center} zoom={zoom} >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a> contributors'
                    />
                    <Marker position={center}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                </MapContainer>
            }
        </div>
    )
};

export default Map; 

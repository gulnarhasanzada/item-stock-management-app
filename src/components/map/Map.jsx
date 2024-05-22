import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCoordinates } from '../../store/geoSlice';
import L from 'leaflet';

const CustomMarker = ({ position, data }) => {
  return (
    <Marker position={position} icon={new L.Icon({ iconUrl: '/assets/MARKER.png', iconSize: [50, 50] })}>
      <Popup>
        <h3>{data.name}</h3>
        <p>{data.address}</p>
      </Popup>
    </Marker>
  );
};

const MapComponent = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
};

const Map = ({ data }) => {
  const dispatch = useDispatch();
  const lat = useSelector(state => state.geo.lat);
  const lng = useSelector(state => state.geo.lng);
  const coordinatesLoaded = lat !== null && lng !== null;

  useEffect(() => {
    if (data && data.address) {
      dispatch(getCoordinates(data.address));
    }
  }, [dispatch, data]);

  return (
    <div style={{ height: '700px', width: '100%', marginTop: '20px' }}>
      {coordinatesLoaded ? (
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapComponent center={[lat, lng]} />
          <CustomMarker position={[lat, lng]} data={data} />
        </MapContainer>
      ) : (
        <div>Loading map...</div>
      )}
    </div>
  );
};

export default Map;

/* eslint-disable max-len */
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Circle,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  address: LatLngExpression;
};

export const Map: React.FC<Props> = ({ address }) => {
  return (
    <MapContainer style={{ height: '100%', width: '100%' }} center={address} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={address} radius={55} />
    </MapContainer>
  );
};

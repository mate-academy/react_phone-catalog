import React from 'react';

interface Props {
  markerY: number;
  markerX: number;
}

export const Marker = ({ markerY, markerX }: Props) => (
  <div className="marker" style={{ top: markerY, left: markerX }} />
);

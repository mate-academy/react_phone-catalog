import React from 'react';
import './Ellipse.scss';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablets';
import { Accessorie } from '../../types/accessories';

interface Props {
  device: (Phone | Tablet | Accessorie)[];
}

export const Ellipse: React.FC<Props> = ({ device }) => {
  return <div className="ellipse-icon">{device.length}</div>;
};

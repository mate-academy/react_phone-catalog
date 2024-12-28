import React from 'react';
import './Icon.scss';
import { IconType } from '../../../types/IconType';

type Props = {
  icon: IconType;
};

export const Icon: React.FC<Props> = ({ icon }) => {
  return <img src={icon.path} alt={icon.title} className="icon" />;
};

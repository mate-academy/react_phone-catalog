import React from 'react';
import './Icon.scss';

type IconData = {
  title: string;
  path: string;
};

type Props = {
  icon: IconData;
};

export const Icon: React.FC<Props> = ({ icon }) => {
  return <img src={icon.path} alt={icon.title} className="icon" />;
};

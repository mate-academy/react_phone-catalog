import React from 'react';
import './Icon.scss';

type Props = {
  icon: {
    title: string;
    path: string;
  };
};

export const Icon: React.FC<Props> = ({ icon }) => {
  return <img className="icon" src={icon.path} alt={icon.title} />;
};

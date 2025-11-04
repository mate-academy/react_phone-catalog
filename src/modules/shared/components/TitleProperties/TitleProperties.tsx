import React from 'react';
import './TitleProperties.scss';

type TitlePropertiesProps = {
  text: string;
};

export const TitleProperties: React.FC<TitlePropertiesProps> = ({ text }) => {
  return <h3 className="title-properties">{text}</h3>;
};

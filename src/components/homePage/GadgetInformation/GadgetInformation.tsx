import React from 'react';
import './GadgetInformation.scss';

type Props = {
  title: string;
  moreInfo?: string;
};

const GadgetInformation: React.FC<Props> = ({ title, moreInfo }) => {
  return (
    <span className="description__span">
      <p>{title}</p>
      <p>{moreInfo}</p>
    </span>
  );
};

export default GadgetInformation;

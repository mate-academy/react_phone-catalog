import './Banner.scss';
import React from 'react';

interface Props {
  message: string;
}

export const Banner: React.FC<Props> = ({ message }) => {
  return (
    <div className="banner">
      <p className="banner__message">{message}</p>
    </div>
  );
};

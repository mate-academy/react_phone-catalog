import React from 'react';

interface Props {
  info: string;
  description: string;
}

export const About: React.FC<Props> = ({ description, info }) => {
  return (
    <div className="about">
      <h3 className="about__title">About</h3>
      <div className="line" />
      <h4 className="about__option">Additional info</h4>
      <p className="about__text">{info}</p>
      <h4 className="about__option">Description</h4>
      <p className="about__text">{description}</p>
    </div>
  );
};

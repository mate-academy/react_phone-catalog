import React from 'react';
import './ItemAbout.scss';

type Props = {
  about: { title: string; text: string[] }[];
};

export const ItemAbout: React.FC<Props> = ({ about }) => {
  return (
    <div className="item-about">
      <h3 className="item-about__title">About</h3>
      {about.map(({ title, text }) => {
        return (
          <div key={title} className="item-about__description">
            <h4 className="item-about__subtitle">{title}</h4>
            <p className="item-about__text">{text}</p>
          </div>
        );
      })}
    </div>
  );
};

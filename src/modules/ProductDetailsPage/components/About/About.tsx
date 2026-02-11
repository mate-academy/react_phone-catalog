import scss from './About.module.scss';
import { Accessory, Phone, Tablet } from '../../../../api/types';
import React from 'react';

interface Props {
  item: Phone | Tablet | Accessory;
}

export const About: React.FC<Props> = ({ item }) => {
  return (
    <section className={scss.about}>
      <h3 className={scss.about__mainTitle}>About</h3>
      {item.description.map(desc => (
        <React.Fragment key={desc.title}>
          <h4 className={scss.about__title}>{desc.title}</h4>
          <p className={scss.about__text}>{desc.text}</p>
        </React.Fragment>
      ))}
    </section>
  );
};

import './Novelties.scss';
import React from 'react';
import { Carousel } from '../Carousel';
import { Img } from '../../types/Img';

export const Novelties: React.FC = () => {
  const imgs:Img[] = [
    {
      id: 1,
      path: './img/banner.png',
      desc: 'photo 1',
    },
    {
      id: 2,
      path: './img/banner.png',
      desc: 'photo 1',
    },
    {
      id: 3,
      path: './img/banner.png',
      desc: 'photo 1',
    },
  ];

  return (
    <section className="novelties">
      <Carousel imgs={imgs} />
    </section>
  );
};

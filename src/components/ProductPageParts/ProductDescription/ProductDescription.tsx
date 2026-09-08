import React from 'react';
import s from './ProductDescription.module.scss';

interface Props {
  description: {
    title: string;
    text: string[];
  }[];
}

export const ProductDescription: React.FC<Props> = ({ description }) => (
  <div className={s.ProductDescription}>
    <h3 className={s.ProductDescription__subtitle}>About</h3>
    {description.map((e, i) => (
      <div key={i} className={s.ProductDescription__otherInfo}>
        <h4>{e.title}</h4>
        <p className={s.ProductDescription__description}>{e.text}</p>
      </div>
    ))}
  </div>
);

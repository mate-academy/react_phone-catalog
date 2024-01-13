import React from 'react';
import { DetailType } from '../../../helpers/types/DetailType';
import './Description.scss';

type Props = {
  product: DetailType,
};

export const Description: React.FC<Props> = ({ product }) => {
  return (
    <div className="description">
      {product.description.map(desc => (
        <article
          key={desc.title}
          className="description__article"
        >
          <h3 className="description__title">{desc.title}</h3>

          <p className="description__text">{desc.text}</p>
        </article>
      ))}
    </div>
  );
};

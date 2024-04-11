import React from 'react';
import { Link } from 'react-router-dom';
import { AddBlock } from '../../shared/AddBlock';
import { Product } from '../../../types/Product';

type Props = {
  phone: Product;
  widthCard: number;
};

export const NewModelCard: React.FC<Props> = React.memo(
  ({ phone, widthCard }) => {
    const { name, image, fullPrice, screen, capacity, ram } = phone;
    const modifyScreen = screen
      .split(' ')
      .slice(0, 2)
      .join(' ')
      .replace(`'`, `”`);

    return (
      <div className="new-model-card" style={{ width: `${widthCard}px` }}>
        <Link to="/" className="new-model-card__img-link">
          <img src={image} alt={`${name}`} className="new-model-card__img" />
        </Link>

        <p className="new-model-card__title">{name}</p>

        <p className="new-model-card__price">{`$${fullPrice}`}</p>

        <div className="new-model-card__descr">
          <p className="new-model-card__descr-item">
            Screen <span className="bold">{modifyScreen}</span>
          </p>
          <p className="new-model-card__descr-item">
            Capacity <span className="bold">{capacity}</span>
          </p>
          <p className="new-model-card__descr-item">
            RAM <span className="bold">{ram}</span>
          </p>
        </div>

        <AddBlock />
      </div>
    );
  },
);

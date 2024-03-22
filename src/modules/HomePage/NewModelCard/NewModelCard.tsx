import React from 'react';
import { Phone } from '../../../types';
import { AddBlock } from '../../shared/AddBlock';

type Props = {
  phone: Phone;
  widthCard: number;
};

export const NewModelCard: React.FC<Props> = React.memo(
  ({ phone, widthCard }) => {
    const { name, images, priceRegular, screen, capacity, ram } = phone;
    const modifyScreen = screen
      .split(' ')
      .slice(0, 2)
      .join(' ')
      .replace(`'`, `”`);

    return (
      <div className="new-model-card" style={{ width: `${widthCard}px` }}>
        <img
          src={images[0]}
          alt="iphone 14pro spaceblack"
          className="new-model-card__img"
        />

        <p className="new-model-card__title">{name}</p>

        <p className="new-model-card__price secondary-title">{`$${priceRegular}`}</p>

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

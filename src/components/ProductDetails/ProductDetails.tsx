/* eslint-disable max-len */
import React from 'react';
import { Images } from './Images/Images';
import { Colors } from './Colors/Colors';
import { Purchase } from './Purchase/Purchase';
import { ShortInfo } from './ShortInfo/ShortInfo';
import { LongInfo } from './LongInfo/LongInfo';
import { Capacities } from './Capacities/Capacities';
import { DetailType } from '../../helpers/types/DetailType';
import './ProductDetails.scss';
import { Description } from './Description/Description';
import { Line } from '../../elements/Line/Line';

type Props = {
  product: DetailType;
};

export const ProductDetails: React.FC<Props> = ({ product }) => {
  return (
    <div className="details">
      <h1 className="details__title">{product.name}</h1>

      <div className="details__content">
        <section className="details__section ">
          <Images product={product} />
        </section>

        <section className="details__section details__section--interactive">
          <Colors product={product} />
          <Line />
          <Capacities product={product} />
          <Line />
          <Purchase product={product} />
          <ShortInfo product={product} />
        </section>

        <section className="details__section">
          <h2 className="details__title-h2">About</h2>
          <Line />
          <Description product={product} />
          <Line />
        </section>

        <section className="details__section">
          <h2 className="details__title-h2">Tech specs</h2>
          <Line />
          <LongInfo product={product} />
        </section>
      </div>
    </div>
  );
};

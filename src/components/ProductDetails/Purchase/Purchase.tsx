/* eslint-disable max-len */
import React from 'react';
import { DetailType } from '../../../helpers/types/DetailType';
import { useAppSelector } from '../../../store/hooks';
import {
  getPruductFromDetail,
} from '../../../helpers/getFunctions/getProductFromDetail';
import './Purchase.scss';
import { ButtonAddFav } from '../../../elements/Buttons/ButtonAddFav/ButtonAddFav';
import { ButtonAddCart } from '../../../elements/Buttons/ButtonAddCart/ButtonAddCart';

type Props = {
  product: DetailType,
};

export const Purchase: React.FC<Props> = ({ product }) => {
  const { products } = useAppSelector(state => state.products);
  const {
    priceDiscount,
    priceRegular,
    id,
  } = product;

  return (
    <div className="purchase">
      <div className="purchase__wrapper">
        <p className="purchase__price">{`$${priceDiscount}`}</p>
        <p className="purchase__fullprice">{`$${priceRegular}`}</p>
      </div>

      <div className="purchase__wrapper purchase__wrapper--margin-top">
        <ButtonAddCart product={getPruductFromDetail(products, id)} />

        <ButtonAddFav product={getPruductFromDetail(products, id)} />
      </div>
    </div>
  );
};

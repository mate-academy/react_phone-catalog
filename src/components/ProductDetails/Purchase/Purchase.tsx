import React from 'react';
import { DetailType } from '../../../helpers/types/DetailType';
import { useAppSelector } from '../../../store/hooks';
import { ButtonTexted } from '../../../elements/ButtonTexted/ButtonTexted';
import {
  getPruductFromDetail,
} from '../../../helpers/getFunctions/getProductFromDetail';
import { ButtonIcon } from '../../../elements/ButtonIcon/ButtonIcon';
import './Purchase.scss';

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
        <ButtonTexted
          text="Add to cart"
          textActive="Added to cart"
          width="longer"
          product={getPruductFromDetail(products, id)}
        />

        <ButtonIcon
          type="event"
          shape="heart"
          dynamicClasses={['medium']}
          product={getPruductFromDetail(products, id)}
          checkFav
        />
      </div>
    </div>
  );
};

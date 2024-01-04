import React from 'react';
import { ButtonCircle } from '../../../elements/ButtonCircle/ButtonCircle';
import {
  getPruductFromDetail,
} from '../../../helpers/getFunctions/getProductFromDetail';
import { DetailType } from '../../../helpers/types/DetailType';
import { useAppSelector } from '../../../store/hooks';
import './Colors.scss';

type Props = {
  product: DetailType,
};

export const Colors: React.FC<Props> = ({ product }) => {
  const { products } = useAppSelector(state => state.products);
  const {
    namespaceId,
    id,
    capacity,
    colorsAvailable: colors,
  } = product;

  // console.log(product);

  return (
    <div className="colors">
      <div className="colors__wrapper">
        <p className="colors__name">Available colors</p>
        <p className="colors__name">{`ID: ${getPruductFromDetail(products, id).id}`}</p>
      </div>
      <ul className="colors__list">
        {colors.map(col => (
          <ButtonCircle
            key={col}
            color={col}
            path={`/phones/${namespaceId}-${capacity.toLowerCase()}-${col}`}
          />
        ))}
      </ul>
    </div>
  );
};

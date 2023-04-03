import {
  FC,
} from 'react';
import { FavoriteButton } from '../FavoriteButton';
import { AddToCartButton } from '../AddToCartButton';

import './CardButtons.scss';

type Props = {
  id: string;
  product: string;
  name: string;
  price: number;
  imageUrl: string;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
};

export const CardButtons: FC<Props> = ({
  id,
  product,
  name,
  price,
  imageUrl,
  fullPrice,
  screen,
  capacity,
  ram,
}) => {
  return (
    <div className="card__buttons button">
      <AddToCartButton
        id={id}
        product={product}
        name={name}
        price={price}
        imageUrl={imageUrl}
      />

      <FavoriteButton
        itemId={id}
        fullPrice={fullPrice}
        name={name}
        category={product}
        image={imageUrl}
        price={price}
        screen={screen}
        capacity={capacity}
        ram={ram}
      />
    </div>
  );
};

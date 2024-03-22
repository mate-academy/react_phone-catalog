/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '../../base';
import { ButtonFavourite } from '../ButtonFavourite';
import { ButtonAdd } from '../ButtonAdd';
import { ProductContext } from '../../../context/ProductsContext';
import { isItemInArray } from '../../../utils';

import { Product, ProductCart } from '../../../types';
import './ProductCard.scss';

type Props = {
  id: number;
  item: Product;
  name: string;
  productUrl: string;
  price: number;
  fullPrice: number;
  image: string;
  [key: string]: unknown;
};

const MemoProductCard: React.FC<Props> = ({
  item,
  id,
  name,
  productUrl,
  price,
  fullPrice = 0,
  image,
  onAddToFav,
  ...rest
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isAddingToFavourite, setIsAddingToFavourite]
    = useState<boolean>(false);

  const {
    favouriteItems,
    addDelProductFavourite,
    cartItems,
    addDelProductCart,
  } = useContext(ProductContext);

  const isAddedToCart = isItemInArray(item, cartItems, 'id');

  const isAddedToFav = isItemInArray(item, favouriteItems, 'id');

  const handleAddDelFav = () => {
    setIsAddingToFavourite(true);

    addDelProductFavourite(item).finally(() => setIsAddingToFavourite(false));
  };

  const handleAddDelCart = () => {
    setIsAddingToCart(true);

    addDelProductCart(item as ProductCart).finally(() =>
      setIsAddingToCart(false),
    );
  };

  return (
    <div className="card" data-cy="cardsContainer">
      <div className="card__content">
        <div className="card__image">
          <img src={image} alt={name} />
        </div>
        <Typography type="text" className="card__title">
          {name}
        </Typography>
        <div className="card__prices">
          <div className="card__price">{price}</div>
          <div className="card__price card__price--full">{fullPrice}</div>
        </div>
        <table className="card__specs specs">
          <tbody>
            {Object.keys(rest).map(spec => (
              <tr className="card__specs-row" key={spec}>
                <td className="card__specs-cell card__specs-cell--left">
                  {spec}
                </td>
                <td className="card__specs-cell card__specs-cell--right">
                  {rest[spec] as string | number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card__controls">
          <ButtonAdd
            isAdded={isAddedToCart}
            onClick={handleAddDelCart}
            isLoading={isAddingToCart}
          />
          <ButtonFavourite
            isAdded={isAddedToFav}
            onClick={handleAddDelFav}
            isLoading={isAddingToFavourite}
          />
        </div>
        <Link
          className="card__link"
          to={productUrl}
          aria-label={name}
          title={name}
        />
      </div>
    </div>
  );
};

export const ProductCard = React.memo(MemoProductCard);

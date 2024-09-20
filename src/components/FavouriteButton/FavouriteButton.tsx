import classNames from 'classnames';
import React, { useContext } from 'react';
import { CatalogContext } from '../../CatalogContext';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const FavouriteButton: React.FC<Props> = ({ product }) => {
  const { favourites, addToFavourites } = useContext(CatalogContext);

  return (
    <button
      className={classNames('add-to-favourite', {
        _added: favourites?.some(
          item => item.namespaceId === product.namespaceId,
        ),
      })}
      onClick={() => {
        addToFavourites(product);
      }}
    ></button>
  );
};

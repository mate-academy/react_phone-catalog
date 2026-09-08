// Product.tsx
import React, { useEffect, useState } from 'react';
import './Product.scss';
import { ProductItem } from '../types/Phone';
import classNames from 'classnames';
import { isProductInStorage } from '../Services/isProductInStorage';
import { toggleItemStorage } from '../Services/toogleFavorite';

interface Props {
  product: ProductItem;
}

export const Product: React.FC<Props> = ({ product }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [addToBuy, setAddToBuy] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem('favorite') || '[]',
    );
    const productForBuying = JSON.parse(
      localStorage.getItem('cartForBuying') || '[]',
    );

    setAddToBuy(productForBuying);
    setFavoriteIds(storedFavorites);
  }, []);

  return (
    <div className="content">
      <div
        className="item-image"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div>
        <p className="card__text-main item">{product.name} (iMT9G2FS/A)</p>
        <div className="value-items">
          <p className="current__value item">${product.price}</p>
          <p className="value__discount item">${product.fullPrice}</p>
        </div>
      </div>
      <div className="characteristic">
        <div className="block-characteristic characteristic-value">
          <span className="text-name__characteristic">Screen</span>
          <span className="value">{product.screen}</span>
        </div>
        <div className="block-characteristic characteristic-value">
          <span className="text-name__characteristic">Capacity</span>
          <span className="value">{product.capacity}</span>
        </div>
        <div className="block-characteristic characteristic-value">
          <span className="text-name__characteristic">RAM</span>
          <span className="value">{product.ram}</span>
        </div>
      </div>
      <div className="buttons-in-card">
        <button
          className={classNames('button-add', {
            'button-selected': isProductInStorage(product.itemId, addToBuy),
          })}
          onClick={e =>
            toggleItemStorage('cartForBuying', product.itemId, setAddToBuy, e)
          }
        >
          {isProductInStorage(product.itemId, addToBuy)
            ? 'Selected'
            : 'Add to cart'}
        </button>

        <button
          className={
            isProductInStorage(product.itemId, favoriteIds)
              ? 'favorite-delete'
              : 'favorite-add'
          }
          onClick={e =>
            toggleItemStorage('favorite', product.itemId, setFavoriteIds, e)
          }
        >
          <div
            className={classNames('favorite-img', {
              'red-hurt': isProductInStorage(product.itemId, favoriteIds),
            })}
          ></div>
        </button>
      </div>
    </div>
  );
};

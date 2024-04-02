import cn from 'classnames';
import React, { useState } from 'react';
import { Product } from '../../../types/Product';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [likedPhones, setLikedPhones] = useState<string[]>([]);

  const getLikedProduct = (productId: string) => {
    const productIndex = likedPhones.findIndex(item => item === productId);

    if (productIndex < 0) {
      setLikedPhones(prev => [...prev, productId]);
    } else {
      setLikedPhones(likedPhones.splice(productIndex, 1));
    }
  };

  return (
    <div className="card">
      <img src={`${product.image}`} alt="Phone" className="card__image" />
      <div className="card__name"> {product.name} (iMT9G2FS/A) </div>
      <div className="card__price">
        <h2> ${product.price} </h2>
        <div className="card__fullPrice"> ${product.fullPrice} </div>
      </div>
      <div className="card__separator" />
      <div className="card__characteristic">
        <div className="card__characteristic--title"> Screen </div>
        <div className="card__characteristic--value"> {product.screen} </div>
      </div>
      <div className="card__characteristic">
        <div className="card__characteristic--title"> Capacity </div>
        <div className="card__characteristic--value"> {product.capacity} </div>
      </div>
      <div className="card__characteristic">
        <div className="card__characteristic--title"> RAM </div>
        <div className="card__characteristic--value"> {product.ram} </div>
      </div>
      <div className="card__choice">
        <button type="button" className="card__choice--add">
          Add to cart
        </button>
        <button
          aria-label="Heart switcher"
          type="button"
          className={cn('card__choice--like', {
            'card__choice--like-active': likedPhones.includes(product.id),
          })}
          onClick={() => getLikedProduct(product.id)}
        >
          <div
            className={cn('card__choice--icon', {
              'card__choice--icon-active': likedPhones.includes(product.id),
            })}
          />
        </button>
      </div>
    </div>
  );
};

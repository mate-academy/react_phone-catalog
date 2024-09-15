import React from 'react';
import { Link } from 'react-router-dom';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';
import { Phone } from '../../types/phone';

type Props = {
  products: Phone[] | Tablet[] | Accessory[];
  type: 'phones' | 'tablets' | 'accessories';
};

export const List: React.FC<Props> = ({ products, type }) => {
  return (
    <ul className='card__grid'>
      {products.length > 0 &&
        products.map(product => (
          <div key={product.id} className="card">
            <Link to={`/${type}/${product.id}`}>
              <img
                className="card__image"
                src={product.images[0]}
                alt="card-image"
              />
            </Link>
            <p className="card__name">{product.name}</p>
            <p className="card__price-regular">{`${product.priceRegular}$`}</p>

            <div className="card__line"></div>

            <div className="card__screen">
              <p className="card__screen-name">Screen</p>
              <p className="card__screen-info">{product.screen}</p>
            </div>

            <div className="card__capacity">
              <p className="card__capacity-name">Capacity</p>
              <p className="card__capacity-info">{product.capacity}</p>
            </div>

            <div className="card__ram">
              <p className="card__ram-name">Ram</p>
              <p className="card__ram-info">{product.ram}</p>
            </div>

            <div className="card__buy">
              <button className="card__buy-cart">Add to cart</button>
              <img src="./img/add-to-cart.svg" alt="add-to-cart" />
            </div>
          </div>
        ))}
    </ul>
  );
};

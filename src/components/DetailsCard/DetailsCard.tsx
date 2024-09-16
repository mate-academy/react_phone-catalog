import React from 'react';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';

type Product = Phone | Tablet | Accessory;

type Props = {
  product: Product;
}

export const DetailsCard: React.FC<Props> = ({ product }) => {
  return (
    <>
      <h1 className="details__text">{product.name}</h1>

      <div className="qwerty">
        <div className="details__image">
          <img src={product.images[0]} alt="image" />
        </div>

        <div className="details__image--more">
          {product.images.map(img => (
            <img
              key={img}
              className="details__image--more__img"
              src={img}
              alt="image"
            />
          ))}
        </div>

        <div className='q'>
          <div className="details-flex">
            <p className="details-flex-text">Aviables colors</p>
            <p className="details-flex-text">ID: 903253</p>
          </div>

          <div className="details__colors-container">
            {product.colorsAvailable.map(color => (
              <div
                key={color}
                className="details__color"
                style={{ backgroundColor: color, width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }}
              />
            ))}
          </div>

          <div className="card__line"></div>

          <p className="details-flex-text">Select capacity</p>

          <div className='flex-capacity'>
            <div className='capacity'>
              <div className="capacity-text">
                64GB
              </div>
            </div>

            <div className='capacity-default'>
              <div className="capacity-default-text">
                128GB
              </div>
            </div>

            <div className='capacity-default'>
              <div className="capacity-default-text">
                254GB
              </div>
            </div>
          </div>

          <div className="card__line"></div>

          <p className="card__price-regular">{`${product.priceRegular}$`}</p>

          <div className="card__buy">
            <button className="card__buy-cart">Add to cart</button>
            <img src="./img/add-to-cart.svg" alt="add-to-cart" />
          </div>

          <div className="card__ram">
            <p className="card__ram-name">Screen</p>
            <p className="card__ram-info">{product.screen}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">Resolution</p>
            <p className="card__ram-info">{product.resolution}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">Processor</p>
            <p className="card__ram-info">{product.processor}</p>
          </div>

          <div className="card__ram">
            <p className="card__ram-name">RAM</p>
            <p className="card__ram-info">{product.ram}</p>
          </div>
        </div>
      </div>
    </>
  );
};

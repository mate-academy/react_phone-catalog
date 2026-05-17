import React from 'react';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Products } from '../../../types/Products';
import { Accessorie } from '../../../types/Accessories';

type ActiveQuantity64Props = {
  activeQuantity: number;
  activePage: number;
  phones: Accessorie[];
  mapAccessorieToProduct: (p: Accessorie) => Products;
};

export const ActiveQuantity64: React.FC<ActiveQuantity64Props> = ({
  activePage,
  phones,
  mapAccessorieToProduct,
}) => {
  return (
    <div className="page__models-phones phones__grid">
      {activePage === 0 &&
        phones.slice(0, 64).map(phone => (
          <article key={phone.id} className="page__models-phone">
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={phone.images?.[0] ?? '/img/placeholder.png'}
                  alt=""
                  className="page__models-image"
                />
              </div>
              <p className="page__models-title">{phone.name}</p>
              <span className="page__models-price">{phone.priceRegular}$</span>
              <div className="page__models-string"></div>
              <div className="page__models-info">
                <p className="page__models-text page__models-text__first">
                  Screen{' '}
                  <span className="page__models-span">{phone.screen}</span>
                </p>
                <p className="page__models-text">
                  Capacity{' '}
                  <span className="page__models-span">{phone.capacity}</span>
                </p>
                <p className="page__models-text">
                  RAM <span className="page__models-span">{phone.ram}</span>
                </p>
              </div>
              <ProductCard product={mapAccessorieToProduct(phone)} />
            </div>
          </article>
        ))}
      {activePage === 1 &&
        phones.slice(64, 128).map(phone => (
          <article key={phone.id} className="page__models-phone">
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={phone.images?.[0] ?? '/img/placeholder.png'}
                  alt=""
                  className="page__models-image"
                />
              </div>
              <p className="page__models-title">{phone.name}</p>
              <span className="page__models-price">{phone.priceRegular}$</span>
              <div className="page__models-string"></div>
              <div className="page__models-info">
                <p className="page__models-text page__models-text__first">
                  Screen{' '}
                  <span className="page__models-span">{phone.screen}</span>
                </p>
                <p className="page__models-text">
                  Capacity{' '}
                  <span className="page__models-span">{phone.capacity}</span>
                </p>
                <p className="page__models-text">
                  RAM <span className="page__models-span">{phone.ram}</span>
                </p>
              </div>
              <ProductCard product={mapAccessorieToProduct(phone)} />
            </div>
          </article>
        ))}
      {activePage === 2 &&
        phones.slice(128, 192).map(phone => (
          <article key={phone.id} className="page__models-phone">
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={phone.images?.[0] ?? '/img/placeholder.png'}
                  alt=""
                  className="page__models-image"
                />
              </div>
              <p className="page__models-title">{phone.name}</p>
              <span className="page__models-price">{phone.priceRegular}$</span>
              <div className="page__models-string"></div>
              <div className="page__models-info">
                <p className="page__models-text page__models-text__first">
                  Screen{' '}
                  <span className="page__models-span">{phone.screen}</span>
                </p>
                <p className="page__models-text">
                  Capacity{' '}
                  <span className="page__models-span">{phone.capacity}</span>
                </p>
                <p className="page__models-text">
                  RAM <span className="page__models-span">{phone.ram}</span>
                </p>
              </div>
              <ProductCard product={mapAccessorieToProduct(phone)} />
            </div>
          </article>
        ))}
      {activePage === 3 &&
        phones.slice(192, 256).map(phone => (
          <article key={phone.id} className="page__models-phone">
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={phone.images?.[0] ?? '/img/placeholder.png'}
                  alt=""
                  className="page__models-image"
                />
              </div>
              <p className="page__models-title">{phone.name}</p>
              <span className="page__models-price">{phone.priceRegular}$</span>
              <div className="page__models-string"></div>
              <div className="page__models-info">
                <p className="page__models-text page__models-text__first">
                  Screen{' '}
                  <span className="page__models-span">{phone.screen}</span>
                </p>
                <p className="page__models-text">
                  Capacity{' '}
                  <span className="page__models-span">{phone.capacity}</span>
                </p>
                <p className="page__models-text">
                  RAM <span className="page__models-span">{phone.ram}</span>
                </p>
              </div>
              <ProductCard product={mapAccessorieToProduct(phone)} />
            </div>
          </article>
        ))}
    </div>
  );
};

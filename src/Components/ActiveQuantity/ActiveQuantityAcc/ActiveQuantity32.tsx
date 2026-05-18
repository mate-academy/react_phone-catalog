import React from 'react';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Products } from '../../../types/Products';
import { Accessorie } from '../../../types/Accessories';
import { getImagePath } from '../../../utils/paths';

type ActiveQuantity32Props = {
  activeQuantity: number;
  activePage: number;
  phones: Accessorie[];
  mapAccessorieToProduct: (p: Accessorie) => Products;
};

export const ActiveQuantity32: React.FC<ActiveQuantity32Props> = ({
  phones,
  mapAccessorieToProduct,
  activePage,
}: ActiveQuantity32Props) => {
  return (
    <div className="page__models-phones phones__grid">
      {activePage === 0 &&
        phones.slice(0, 32).map(phone => (
          <article key={phone.id} className="page__models-phone">
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={getImagePath(phone.images?.[0])}
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
        phones.slice(32, 64).map(phone => (
          <article key={phone.id} className="page__models-phone">
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={getImagePath(phone.images?.[0])}
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
        phones.slice(64, 96).map(phone => (
          <article key={phone.id} className="page__models-phone">
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={getImagePath(phone.images?.[0])}
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
        phones.slice(96, 128).map(phone => (
          <article key={phone.id} className="page__models-phone">
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={getImagePath(phone.images?.[0])}
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

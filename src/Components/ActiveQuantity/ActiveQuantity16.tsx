import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Phone } from '../../types/Phone';
import { Products } from '../../types/Products';
import { Link } from 'react-router-dom';

type ActiveQuantity16Props = {
  activeQuantity: number;
  activePage: number;
  phones: Phone[];
  mapPhoneToProduct: (p: Phone) => Products;
};

export const ActiveQuantity16: React.FC<ActiveQuantity16Props> = ({
  activePage,
  phones,
  mapPhoneToProduct,
}) => {
  return (
    <div className="page__models-phones phones__grid">
      {activePage === 0 &&
        phones.slice(0, 16).map(phone => (
          <Link
            to={`${phone.id}`}
            key={phone.id}
            className="page__models-phone"
          >
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={`${import.meta.env.BASE_URL}/img/${phone.images?.[0]}`}
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
              <ProductCard product={mapPhoneToProduct(phone)} />
            </div>
          </Link>
        ))}
      {activePage === 1 &&
        phones.slice(16, 32).map(phone => (
          <Link
            to={`${phone.id}`}
            key={phone.id}
            className="page__models-phone"
          >
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={`${import.meta.env.BASE_URL}img/${phone.images?.[0]}`}
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
              <ProductCard product={mapPhoneToProduct(phone)} />
            </div>
          </Link>
        ))}
      {activePage === 2 &&
        phones.slice(32, 48).map(phone => (
          <Link
            key={phone.id}
            to={`${phone.id}`}
            className="page__models-phone"
          >
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={`${import.meta.env.BASE_URL}img/${phone.images?.[0]}`}
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
              <ProductCard product={mapPhoneToProduct(phone)} />
            </div>
          </Link>
        ))}
      {activePage === 3 &&
        phones.slice(48, 64).map(phone => (
          <Link
            key={phone.id}
            to={`${phone.id}`}
            className="page__models-phone"
          >
            <div className="page__models-container">
              <div className="page__models-img">
                <img
                  src={`${import.meta.env.BASE_URL}img/${phone.images?.[0]}`}
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
              <ProductCard product={mapPhoneToProduct(phone)} />
            </div>
          </Link>
        ))}
    </div>
  );
};

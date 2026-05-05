/* eslint-disable max-len */
import { Link, useParams } from 'react-router-dom';
import { Header } from '../Header/header';
import './Phones.scss';
import ArrowGray from '../../images/icons/ChevronGray.svg';
import Home from '../../images/icons/Home.svg';
import { Filter } from '../Filter/Filter';

import { getPhones } from '../../api/api';

// import { phones } from '../../api/api';

import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { useCart } from '../../Context/Context';
import { Phone } from '../../types/Phone';
import { Products } from '../../types/Products';
import React from 'react';

export const Phones = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const { productId } = useParams();
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState('');

  const normalize = (src?: string) =>
    src ? `(src.startsWith('/') ? src : /${src})` : '/img/placeholder.png';

  const mapPhoneToProduct = (p: Phone): Products => ({
    id: String(p.id),
    itemId: String(p.id),
    name: p.name ?? 'Unknown',
    category: 'phones',
    fullPrice: Number(p.priceRegular ?? 0),
    price: Number(p.priceDiscount ?? p.priceRegular ?? 0),
    screen: p.screen ?? '—',
    capacity: p.capacity ?? '—',
    color: p.color ?? p.colorsAvailable?.[0] ?? '—',
    ram: p.ram ?? '—',
    year: new Date().getFullYear(),
    image: normalize(p.images?.[0]),
  });

  const { totalQuantity } = useCart();

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getPhones()
      .then(setPhones)
      .catch(() => setErrorMessage(`Couldn't load any phones`))
      .finally(() => setLoading(false));
  }, []);

  const getSuggestedProducts = (
    all: Phone[],
    currentId?: string | number,
    count = 4,
  ) => {
    const filtered = all.filter(p => String(p.id) !== String(currentId));

    // simple Fisher–Yates shuffle
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered.slice(0, count);
  };

  const [, setSuggested] = useState<Phone[]>([]);

  useEffect(() => {
    getPhones().then(data =>
      setSuggested(getSuggestedProducts(data, productId, 4)),
    );
  }, [productId]);

  return (
    <div className="phones">
      <Header cartItemsCount={totalQuantity} />
      <div className="container">
        <div className="phones__path page__path">
          <div className="phones__path-icon">
            <Link to="/" className="phones__icon-link page__icon-link">
              <img
                className="phones__icon-home page__icon icon-home icon"
                src={Home}
                alt="Home"
              />
              <img
                className="phones__icon-home icon-home icon"
                src={ArrowGray}
                alt="Arrow"
              />
            </Link>
          </div>
          <span className="phones__path-phones page__paths">Phones</span>
        </div>
        <div className="phones__text page__text">
          <p className="phones__title page__title">Mobile phones</p>
          <span className="phones__subtitle page__subtitle">95 models</span>
        </div>
        <Filter />
        <div className="phones__content page__content">
          <section className="page__models section">
            <div className="page__models-phones phones__grid">
              {phones.map(phone => (
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
                    <span className="page__models-price">
                      {phone.priceRegular}$
                    </span>
                    <div className="page__models-string"></div>
                    <div className="page__models-info">
                      <p className="page_models-text page__models-text__first">
                        Screen{' '}
                        <span className="page__models-span">
                          {phone.screen}
                        </span>
                      </p>
                      <p className="page__models-text">
                        Capacity{' '}
                        <span className="page__models-span">
                          {phone.capacity}
                        </span>
                      </p>
                      <p className="page__models-text">
                        RAM{' '}
                        <span className="page__models-span">{phone.ram}</span>
                      </p>
                    </div>
                    <ProductCard product={mapPhoneToProduct(phone)} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* <div className="page__footer">
        <Footer />
      </div> */}
    </div>
  );
};

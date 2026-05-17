/* eslint-disable max-len */
import { Link, useParams } from 'react-router-dom';
import { Header } from '../Header/header';
import './Phones.scss';
import ArrowGray from '../../images/icons/ChevronGray.svg';
import Home from '../../images/icons/Home.svg';
import { Filter, FilterValue, ItemQuantity } from '../Filter/Filter';

import { getPhones } from '../../api/api';

// import { phones } from '../../api/api';

import { useEffect, useState } from 'react';
import { useCart } from '../../Context/Context';
import { Phone } from '../../types/Phone';
import { Products } from '../../types/Products';
import React from 'react';
import { useFav } from '../../Context/FavouritesContext';

import { PageSlider } from '../Page__Slider/PageSlider';
import { ActiveQuantity16 } from '../ActiveQuantity/ActiveQuantity16';
import { ActiveQuantity32 } from '../ActiveQuantity/ActiveQuantity32';
import { ActiveQuantity64 } from '../ActiveQuantity/ActiveQuantity64';
import { Footer } from '../Footer/Footer';
import { Aside } from '../Aside/Aside';

export const Phones = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [activeQuantity, setActiveQuantity] = useState<ItemQuantity>(16);
  const [activeFilter, setActiveFilter] = useState<FilterValue>('Newest');
  const [activePage, setActivePage] = useState(0);
  const { productId } = useParams();
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState('');

  const normalize = (src?: string) =>
    src ? (src.startsWith('/') ? src : `/${src}`) : '/img/placeholder.png';

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

  const getIphoneOrder = (name: string) => {
    if (name.includes('XS')) {
      return 10.2;
    }

    if (name.includes('XR')) {
      return 10.1;
    }

    if (name.includes('X')) {
      return 10;
    }

    const match = name.match(/\d+/);

    return match ? parseInt(match[0], 10) : 0;
  };

  const sortedPhones = [...phones].sort((a, b) => {
    return getIphoneOrder(b.name) - getIphoneOrder(a.name);
  });

  const sortedPhonesLowToHigh = [...phones].sort(
    (a, b) => a.priceRegular - b.priceRegular,
  );

  const sortedPhonesHighToLow = [...phones].sort(
    (a, b) => b.priceRegular - a.priceRegular,
  );

  const filteredPhones =
    activeFilter === 'Newest'
      ? sortedPhones
      : activeFilter === 'Price: Low to High'
        ? sortedPhonesLowToHigh
        : activeFilter === 'Price: High to Low'
          ? sortedPhonesHighToLow
          : phones;

  const { totalQuantity } = useCart();
  const { totalFavourites } = useFav();

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
    <div className="page phones">
      <Header
        cartItemsCount={totalQuantity}
        favouritesCount={totalFavourites}
        setMenuOpen={setMenuOpen}
      />
      {menuOpen && <Aside setMenuOpen={setMenuOpen} />}
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
        <Filter
          activeQuantity={activeQuantity}
          setActiveQuantity={setActiveQuantity}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <div className="phones__content page__content">
          <section className="page__models section">
            {activeQuantity === 16 && (
              <ActiveQuantity16
                phones={filteredPhones}
                activeQuantity={activeQuantity}
                activePage={activePage}
                mapPhoneToProduct={mapPhoneToProduct}
              />
            )}
            {activeQuantity === 32 && (
              <ActiveQuantity32
                phones={filteredPhones}
                activeQuantity={activeQuantity}
                activePage={activePage}
                mapPhoneToProduct={mapPhoneToProduct}
              />
            )}
            {activeQuantity === 64 && (
              <ActiveQuantity64
                phones={filteredPhones}
                activeQuantity={activeQuantity}
                activePage={activePage}
                mapPhoneToProduct={mapPhoneToProduct}
              />
            )}
            <PageSlider
              setActivePage={setActivePage}
              activePage={activePage}
              activeQuantity={activeQuantity}
            />
          </section>
        </div>
      </div>

      <div className="page__footer">
        <Footer />
      </div>
    </div>
  );
};

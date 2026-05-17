/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { Filter, FilterValue, ItemQuantity } from '../Filter/Filter';
import { Header } from '../Header/header';
import ArrowGray from '../../images/icons/ChevronGray.svg';
import Home from '../../images/icons/Home.svg';
import './Accessories.scss';
import { getAccessories } from '../../api/api';
import { useEffect, useState } from 'react';
import { Accessorie } from '../../types/Accessories';
import { Products } from '../../types/Products';
import { useCart } from '../../Context/Context';
import { useFav } from '../../Context/FavouritesContext';
import React from 'react';
import { ActiveQuantity16 } from '../ActiveQuantity/ActiveQuantityAcc/ActiveQuantity16';
import { PageSliderAcc } from '../Page__Slider/PageSliderAcc';
import { ActiveQuantity32 } from '../ActiveQuantity/ActiveQuantityAcc/ActiveQuantity32';
import { ActiveQuantity64 } from '../ActiveQuantity/ActiveQuantityAcc/ActiveQuantity64';
import { Footer } from '../Footer/Footer';
import { Aside } from '../Aside/Aside';

export const Accessories = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessories, setAccessories] = useState<Accessorie[]>([]);
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState('');
  const { totalQuantity } = useCart();
  const { totalFavourites } = useFav();
  const [activeQuantity, setActiveQuantity] = useState<ItemQuantity>(16);
  const [activeFilter, setActiveFilter] = useState<FilterValue>('Newest');
  const [activePage, setActivePage] = useState(0);
  const mapAccessorieToProduct = (accessorie: Accessorie): Products => ({
    id: String(accessorie.id),
    itemId: String(accessorie.id),
    name: accessorie.name,
    category: accessorie.category,
    fullPrice: Number(accessorie.priceRegular),
    price: Number(accessorie.priceDiscount || accessorie.priceRegular),
    screen: accessorie.screen,
    capacity: accessorie.capacity,
    color: accessorie.color || accessorie.colorsAvailable?.[0] || '—',
    ram: accessorie.ram,
    year: new Date().getFullYear(),
    image:
      typeof accessorie.images === 'string'
        ? accessorie.images
        : (accessorie.images?.[0] ?? '/img/placeholder.png'),
  });

  const getAccessoryOrder = (name: string) => {
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

  const sortedAcc = [...accessories].sort((a, b) => {
    return getAccessoryOrder(b.name) - getAccessoryOrder(a.name);
  });

  const sortedAccLowToHigh =
    activeFilter === 'Price: Low to High'
      ? [...accessories].sort((a, b) => a.priceRegular - b.priceRegular)
      : accessories;

  const sortedAccHighToLow =
    activeFilter === 'Price: High to Low'
      ? [...accessories].sort((a, b) => b.priceRegular - a.priceRegular)
      : accessories;

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getAccessories()
      .then(setAccessories)
      .catch(() => setErrorMessage(`Couldn't load any accessories`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page tablets">
      <Header
        cartItemsCount={totalQuantity}
        favouritesCount={totalFavourites}
        setMenuOpen={setMenuOpen}
      />
      {menuOpen && <Aside setMenuOpen={setMenuOpen} />}
      <div className="container">
        <div className="accessories__path page__path">
          <div className="accessories__path-icon">
            <Link to="/" className="accessories__icon-link page__icon-link">
              <img
                className="accessories__icon-home page__icon icon-home icon"
                src={Home}
                alt="Home"
              />
              <img
                className="accessories__icon-home icon-home icon"
                src={ArrowGray}
                alt="Arrow"
              />
            </Link>
          </div>
          <span className="accessories__path-phones page__paths">
            Accessories
          </span>
        </div>
        <div className="Accessories__text page__text">
          <p className="Accessories__title page__title">Accessories</p>
          <span className="accessories__subtitle page__subtitle">
            100 models
          </span>
        </div>
        <Filter
          activeQuantity={activeQuantity}
          setActiveQuantity={setActiveQuantity}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <div className="tablets__content">
          <section className="page__models section">
            {activeQuantity === 16 && (
              <ActiveQuantity16
                phones={
                  activeFilter === 'Newest'
                    ? sortedAcc
                    : accessories || activeFilter === 'Price: Low to High'
                      ? sortedAccLowToHigh
                      : accessories || activeFilter === 'Price: High to Low'
                        ? sortedAccHighToLow
                        : accessories
                }
                activeQuantity={activeQuantity}
                activePage={activePage}
                mapAccessorieToProduct={mapAccessorieToProduct}
              />
            )}
            {activeQuantity === 32 && (
              <ActiveQuantity32
                phones={
                  activeFilter === 'Newest'
                    ? sortedAcc
                    : accessories || activeFilter === 'Price: Low to High'
                      ? sortedAccLowToHigh
                      : accessories || activeFilter === 'Price: High to Low'
                        ? sortedAccHighToLow
                        : accessories
                }
                activeQuantity={activeQuantity}
                activePage={activePage}
                mapAccessorieToProduct={mapAccessorieToProduct}
              />
            )}
            {activeQuantity === 64 && (
              <ActiveQuantity64
                phones={
                  activeFilter === 'Newest'
                    ? sortedAcc
                    : accessories || activeFilter === 'Price: Low to High'
                      ? sortedAccLowToHigh
                      : accessories || activeFilter === 'Price: High to Low'
                        ? sortedAccHighToLow
                        : accessories
                }
                activeQuantity={activeQuantity}
                activePage={activePage}
                mapAccessorieToProduct={mapAccessorieToProduct}
              />
            )}
            <PageSliderAcc
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

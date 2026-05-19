/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { Filter, FilterValue, ItemQuantity } from '../Filter/Filter';
import { Header } from '../Header/header';
import ArrowGray from '../../images/icons/ChevronGray.svg';
import Home from '../../images/icons/Home.svg';
import './Tablets.scss';
import { useEffect, useState } from 'react';
import { getTablets } from '../../api/api';
import { Tablet } from '../../types/Tablets';
import { Products } from '../../types/Products';
import { useCart } from '../../Context/Context';
import { useFav } from '../../Context/FavouritesContext';
import React from 'react';
import { ActiveQuantity16 } from '../ActiveQuantity/ActiveQuantityTablets/ActiveQuantity16';
import { ActiveQuantity32 } from '../ActiveQuantity/ActiveQuantityTablets/ActiveQuantity32';
import { ActiveQuantity64 } from '../ActiveQuantity/ActiveQuantityTablets/ActiveQuantity64';
import { PageSliderTablet } from '../Page__Slider/PageSliderTablet';
import { Footer } from '../Footer/Footer';
import { Aside } from '../Aside/Aside';
import { Loader } from '../Loader/Loader';

export const Tablets = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [, setErrorMessage] = useState('');
  const { totalQuantity } = useCart();
  const { totalFavourites } = useFav();

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

  const sortedTablets = [...tablets].sort((a, b) => {
    return getIphoneOrder(b.name) - getIphoneOrder(a.name);
  });

  const [activeQuantity, setActiveQuantity] = useState<ItemQuantity>(16);
  const [activeFilter, setActiveFilter] = useState<FilterValue>('Newest');

  const sortedTabletsLowToHigh = [...tablets].sort(
    (a, b) => a.priceRegular - b.priceRegular,
  );

  const sortedTabletsHighToLow = [...tablets].sort(
    (a, b) => b.priceRegular - a.priceRegular,
  );

  const filteredTablets =
    activeFilter === 'Newest'
      ? sortedTablets
      : activeFilter === 'Price: Low to High'
        ? sortedTabletsLowToHigh
        : activeFilter === 'Price: High to Low'
          ? sortedTabletsHighToLow
          : tablets;

  const [activePage, setActivePage] = useState(0);

  const mapTabletToProduct = (tablet: Tablet): Products => ({
    id: String(tablet.id),
    itemId: String(tablet.id),
    name: tablet.name,
    category: tablet.category,
    fullPrice: Number(tablet.priceRegular),
    price: Number(tablet.priceDiscount || tablet.priceRegular),
    screen: tablet.screen,
    capacity: tablet.capacity,
    color: tablet.color || tablet.colorsAvailable?.[0] || '—',
    ram: tablet.ram,
    year: new Date().getFullYear(),
    image:
      typeof tablet.images === 'string' ? tablet.images : tablet.images?.[0],
  });

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTablets()
      .then(setTablets)
      .catch(() => setErrorMessage(`Couldn't load any tablets`))
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
      {Loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="tablets__path page__path">
            <div className="tablets__path-icon">
              <Link to="/" className="tablets__icon-link page__icon-link">
                <img
                  className="tablets__icon-home page__icon icon-home icon"
                  src={Home}
                  alt="Home"
                />
                <img
                  className="tablets__icon-home icon-home icon"
                  src={ArrowGray}
                  alt="Arrow"
                />
              </Link>
            </div>
            <span className="tablets__path-tablet page__paths">Tablets</span>
          </div>
          <div className="tablets__text page__text">
            <h1 className="tablets__title page__title">Tablets</h1>
            <span className="tablets__subtitle page__subtitle">24 models</span>
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
                  phones={filteredTablets}
                  activeQuantity={activeQuantity}
                  activePage={activePage}
                  mapTabletToProduct={mapTabletToProduct}
                />
              )}
              {activeQuantity === 32 && (
                <ActiveQuantity32
                  phones={filteredTablets}
                  activeQuantity={activeQuantity}
                  activePage={activePage}
                  mapTabletToProduct={mapTabletToProduct}
                />
              )}
              {activeQuantity === 64 && (
                <ActiveQuantity64
                  phones={filteredTablets}
                  activeQuantity={activeQuantity}
                  activePage={activePage}
                  mapTabletToProduct={mapTabletToProduct}
                />
              )}
              <PageSliderTablet
                setActivePage={setActivePage}
                activePage={activePage}
                activeQuantity={activeQuantity}
              />
            </section>
          </div>
        </div>
      )}

      <div className="page__footer">
        <Footer />
      </div>
    </div>
  );
};

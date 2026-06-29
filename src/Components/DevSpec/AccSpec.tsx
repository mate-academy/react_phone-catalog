/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../Header/header';
import { useEffect, useState } from 'react';
import { getAccessorieById } from '../../api/api';
import home from '../../images/icons/Home.svg';
import arr from '../../images/icons/Chevron (Arrow Right) grey.png';
import backArr from '../../images/icons/Chevron (Arrow Left).svg';
import './PhoneSpec.scss';
import fav from '../../images/fav/Icons/Favourites (Heart Like).svg';
import activeFav from '../../images/icons/ActiveFav.svg';
import { useCart } from '../../Context/Context';
import { useFav } from '../../Context/FavouritesContext';
import { PhoneLike } from '../PhoneLike/PhoneLike';
import { Footer } from '../Footer/Footer';
import { Products } from '../../types/Products';
import React from 'react';
import { Accessorie } from '../../types/Accessories';
import { Aside } from '../Aside/Aside';
import { Loader } from '../Loader/Loader';

// type Props = {
//   favouritesCount: number;
// };

enum Image {
  first = 'first',
  second = 'second',
  third = 'third',
  fourth = 'fourth',
  fifth = 'fifth',
}

export const AccSpec: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { pathname } = useLocation();
  const [accessorie, setAccessorie] = useState<Accessorie>();
  const { totalQuantity, addToCart, removeFromCart, isInCart } = useCart();
  const { addToFav, removeFromFav, isInFav, totalFavourites } = useFav();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const mapAccessorieToProduct = (a: Accessorie): Products => ({
    id: String(a.id),
    itemId: String(a.id),
    name: a.name ?? 'Unknown',
    category: 'accessories',
    fullPrice: Number(a.priceRegular ?? 0),
    price: Number(a.priceDiscount ?? a.priceRegular ?? 0),
    screen: a.screen ?? '—',
    capacity: a.capacity ?? '—',
    color: Array.isArray(a.color)
      ? (a.color[0] ?? '—')
      : (a.color ?? a.colorsAvailable?.[0] ?? '—'),
    ram: a.ram ?? '—',
    year: new Date().getFullYear(),
    image: Array.isArray(a.images) ? (a.images[0] ?? '') : (a.images ?? ''),
  });
  const navigate = useNavigate();
  const [, setErrorMessage] = useState(false);
  const [image, setImage] = useState<Image>(Image.first);
  const [color, setColor] = useState<string | null>(null);
  const images = accessorie?.images || [];
  const path = accessorie?.id;

  const normalizePathValue = (value: string) =>
    value.toLowerCase().replace(/\s+/g, '-');

  const getDefaultColor = (acc?: Accessorie) => {
    if (!acc) {
      return null;
    }

    const rawColor = acc.color as unknown;

    if (typeof rawColor === 'string' && rawColor.trim()) {
      return rawColor;
    }

    if (Array.isArray(rawColor) && rawColor.length) {
      return rawColor[0];
    }

    return acc.colorsAvailable?.[0] ?? null;
  };

  // const capacitiesRaw = accessorie?.capacity ?? [];
  const capacities: string[] = Array.isArray(accessorie?.capacity)
    ? accessorie.capacity
    : accessorie?.capacity
      ? [accessorie.capacity]
      : [];

  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  useEffect(() => {
    if (capacities.length) {
      setSelectedCapacity(capacities[0]);
    }
  }, [capacities]);

  useEffect(() => {
    if (!accessorie) {
      return;
    }

    const defaultColor = getDefaultColor(accessorie);

    if (defaultColor) {
      setColor(defaultColor);
    }
  }, [accessorie]);
  const imageKeys: Image[] = [
    Image.first,
    Image.second,
    Image.third,
    Image.fourth,
    Image.fifth,
  ];

  const mainIndex =
    imageKeys.indexOf(image) === -1 ? 0 : imageKeys.indexOf(image);
  const imageByIndex = (i: number): Image => imageKeys[i];

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const enums = [
      Image.first,
      Image.second,
      Image.third,
      Image.fourth,
      Image.fifth,
    ];
    const id = setInterval(() => {
      setImage(prev => {
        const idx = enums.indexOf(prev);
        const safeIdx = idx === -1 ? 0 : idx;
        const next = enums[(safeIdx + 1) % images.length];

        return next;
      });
    }, 5000);

    return () => clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    if (accessorie?.capacity) {
      const caps = Array.isArray(accessorie.capacity)
        ? accessorie.capacity
        : [accessorie.capacity];

      setSelectedCapacity(caps[0]);
    }
  }, [accessorie?.capacity]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoader(true);
    getAccessorieById(productId)
      .then(product => {
        if (product) {
          setAccessorie(product);
          console.log(product);
        }
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setLoader(false));
  }, [productId]);
  console.log('productId from params:', productId);

  return (
    <div className="phone">
      <Header
        cartItemsCount={totalQuantity}
        favouritesCount={totalFavourites}
        setMenuOpen={setMenuOpen}
      />
      {menuOpen && (
        <Aside
          setMenuOpen={setMenuOpen}
          totalFavourites={totalFavourites}
          totalQuantity={totalQuantity}
        />
      )}
      {loader && <Loader />}
      {!loader && (
        <div className="phone__container container">
          <div className="phone__path">
            <Link to="/" className="phone__path-home">
              <img src={home} alt="" />
            </Link>
            <div className="phone__path-arr">
              <img src={arr} alt="" />
            </div>
            <Link to="../accessories" className="phone__path-phones">
              Accessories
            </Link>
            <div className="phone__path-arr">
              <img src={arr} alt="" />
            </div>
            <p className="phone__path-name">{accessorie?.name}</p>
          </div>
          <Link to="../accessories" className="phone__back">
            <img src={backArr} alt="" className="phone__back-arr" />
            <p className="phone__back-back">Back</p>
          </Link>
          <div className="phone__title">{accessorie?.name}</div>
          <div className="phone__main">
            <div className="phone__image">
              <div className="phone__image-main phone__image-main__first">
                {images[mainIndex] && (
                  <img
                    className="phone__main-image"
                    src={images[mainIndex]}
                    alt=""
                  />
                )}
              </div>
              <div className="phone__images">
                {images.map((src, i) => (
                  <div
                    key={src}
                    className={`phone__imgs ${i === mainIndex ? 'phone__imgs-active' : ''}`}
                  >
                    <img
                      src={src}
                      className="phone__img"
                      onClick={() => setImage(imageByIndex(i))}
                    />
                  </div>
                ))}
              </div>
              <div className="phone__image-main phone__image-main__second">
                {images[mainIndex] && (
                  <img
                    className="phone__main-image"
                    src={images[mainIndex]}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="phone__specs">
              <p className="phone__colors-text">Available colors</p>
              <div className="phone__colors">
                {accessorie?.colorsAvailable.map(c => {
                  const updatedPath = path?.replace(
                    path?.includes('space') ? /-[^-]+-[^-]+$/ : /-[^-]+$/,
                    `-${normalizePathValue(c)}`,
                  );

                  return (
                    <div
                      key={c}
                      className={`phone__color ${color === c || (!color && c === accessorie.colorsAvailable[0]) ? 'phone__color-active' : ''} phone__color-${normalizePathValue(c)}`}
                    >
                      <div
                        onClick={() => {
                          setColor(c);
                          navigate(`../accessories/${updatedPath}`);
                        }}
                        className={`phone__color-color phone__color-${normalizePathValue(c)}`}
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="phone__specs-border"></div>
              <div className="phone__specs-cap">
                <p className="phone__specs-cap-text">Select capacity</p>
                <div className="phone__specs-capacities">
                  {accessorie?.capacityAvailable.map(cap => {
                    const activeColor =
                      color || getDefaultColor(accessorie) || '';
                    const updatedPathCap = path?.replace(
                      /-[^-]+-[^-]+$/,
                      `-${normalizePathValue(cap)}-${normalizePathValue(activeColor)}`,
                    );

                    return (
                      <button
                        key={cap}
                        type="button"
                        className={`phone__specs-capacity ${cap === selectedCapacity ? 'phone__specs-capacity-active' : ''}`}
                        onClick={() => {
                          setSelectedCapacity(cap);
                          navigate(`../accessories/${updatedPathCap}`);
                        }}
                        onKeyDown={e =>
                          (e.key === 'Enter' || e.key === ' ') &&
                          setSelectedCapacity(cap)
                        }
                        aria-pressed={cap === selectedCapacity}
                      >
                        {cap}
                      </button>
                    );
                  })}
                  <div />
                </div>
              </div>
              <div className="phone__specs-border"></div>
              <div className="phone__prices">
                <div className="phone__price">
                  <div className="phone__price-full">
                    {accessorie?.priceRegular}$
                  </div>
                  <span className="phone__price-discount">
                    {accessorie?.priceDiscount}$
                  </span>
                </div>
              </div>
              <div className="phone__buttons">
                <button
                  className={`phone__add ${accessorie && isInCart(String(accessorie.id)) ? 'phone__add-added' : ''}`}
                  type="button"
                  onClick={() => {
                    if (accessorie) {
                      const product = mapAccessorieToProduct(accessorie);

                      if (isInCart(String(product.id))) {
                        removeFromCart(String(product.id));
                      } else {
                        addToCart(product);
                      }
                    }
                  }}
                >
                  {accessorie && isInCart(String(accessorie.id))
                    ? 'Added'
                    : 'Add to cart'}
                </button>
                <button
                  className={`phone__fav ${accessorie && isInFav(String(accessorie.id)) ? 'phone__fav-added' : ''}`}
                  type="button"
                  onClick={() => {
                    if (accessorie) {
                      const product = mapAccessorieToProduct(accessorie);

                      if (isInFav(String(product.id))) {
                        removeFromFav(String(product.id));
                      } else {
                        addToFav(product);
                      }
                    }
                  }}
                >
                  <img
                    src={
                      accessorie && isInFav(String(accessorie.id))
                        ? activeFav
                        : fav
                    }
                    alt=""
                    className="phone__fav-img"
                  />
                </button>
              </div>
              <div className="phone__specifications">
                <p className="phone__specifications-text phone__specifications-text__first">
                  Screen{' '}
                  <span className="phone__specifications-span">
                    {accessorie?.screen}
                  </span>
                </p>
                <p className="phone__specifications-text">
                  Capacity{' '}
                  <span className="phone__specifications-span">
                    {accessorie?.capacity}
                  </span>
                </p>
                <p className="phone__specifications-text">
                  Processor{' '}
                  <span className="phone__specifications-span">
                    {accessorie?.processor}
                  </span>
                </p>
                <p className="phone__specifications-text">
                  RAM{' '}
                  <span className="phone__specifications-span">
                    {accessorie?.ram}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="phone__info">
            <div className="phone__about">
              <h1 className="phone__about-title">About</h1>
              <div className="phone__about-border"></div>
              <div className="phone__about-article">
                <div className="phone__about-article-title">
                  Premium Accessories
                </div>
                <div className="phone__about-article-subtitle">
                  <span className="phone__about-article-subtitle-span">
                    Discover our premium collection of accessories designed to
                    enhance your mobile experience.
                    <br />
                    {''}
                    <br />
                    From stylish cases to powerful chargers, our accessories
                    combine functionality with elegance. Each item is crafted
                    with precision and tested for quality.
                  </span>
                </div>
              </div>
              <div className="phone__about-article">
                <div className="phone__about-article-title">
                  Quality & Design
                </div>
                <div className="phone__about-article-subtitle">
                  Our accessories are designed with the same attention to detail
                  as our premium devices. Whether you're looking for protection,
                  convenience, or style, you'll find the perfect accessory to
                  complement your lifestyle.
                </div>
              </div>
              <div className="phone__about-article">
                <div className="phone__about-article-title">
                  Compatibility & Performance
                </div>
                <div className="phone__about-article-subtitle">
                  Every accessory is engineered for optimal performance and
                  compatibility. Experience seamless integration with your
                  devices, ensuring you get the most out of your technology
                  investment.
                </div>
              </div>
            </div>
            <div className="phone__tech">
              <div className="phone__tech-title">Tech specs</div>
              <div className="phone__tech-border"></div>
              <p className="phone__tech-text phone__tech-text__first">
                Screen{' '}
                <span className="phone__tech-span">{accessorie?.screen}</span>
              </p>
              <p className="phone__tech-text phone__tech-text__first">
                Resolution{' '}
                <span className="phone__tech-span">
                  {accessorie?.resolution}
                </span>
              </p>
              <p className="phone__tech-text">
                Processor{' '}
                <span className="phone__tech-span">
                  {accessorie?.processor}
                </span>
              </p>
              <p className="phone__tech-text">
                RAM <span className="phone__tech-span">{accessorie?.ram}</span>
              </p>
              <p className="phone__tech-text">
                Built in memory{' '}
                <span className="phone__tech-span">{accessorie?.capacity}</span>
              </p>
              <p className="phone__tech-text">
                Color{' '}
                <span className="phone__tech-span">{accessorie?.color}</span>
              </p>
              <p className="phone__tech-text">
                Material{' '}
                <span className="phone__tech-span">{accessorie?.material}</span>
              </p>
              <p className="phone__tech-text">
                Compatibility{' '}
                <span className="phone__tech-span">
                  {accessorie?.compatibility}
                </span>
              </p>
            </div>
          </div>
          <PhoneLike />
        </div>
      )}
      <div className={`phone__footer ${loader ? 'phone__footer-fixed' : ''}`}>
        <Footer />
      </div>
    </div>
  );
};

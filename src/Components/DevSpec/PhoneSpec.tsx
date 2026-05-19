/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../Header/header';
import { useEffect, useState } from 'react';
import { getProductById } from '../../api/api';
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
import { Phone } from '../../types/Phone';
import { Products } from '../../types/Products';
import React from 'react';
import { Aside } from '../Aside/Aside';

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

enum Color {
  black = 'black',
  green = 'green',
  yellow = 'yellow',
  white = 'white',
  purple = 'purple',
  red = 'red',
  rosegold = 'rosegold',
  gold = 'gold',
  silver = 'silver',
  spacegray = 'spacegray',
  coral = 'coral',
  midnight = 'midnight',
  graphite = 'graphite',
  sierrablue = 'sierrablue',
  pink = 'pink',
  blue = 'blue',
}

export const PhoneSpec: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { pathname } = useLocation();
  const [phone, setPhone] = useState<Phone>();
  const { totalQuantity, addToCart, removeFromCart, isInCart } = useCart();
  const { addToFav, removeFromFav, isInFav } = useFav();
  const { totalFavourites } = useFav();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
    image: typeof p.images?.[0] === 'string' ? p.images[0] : '',
  });
  const [, setErrorMessage] = useState(false);
  const [, setLoading] = useState(false);
  const [image, setImage] = useState<Image>(Image.first);
  const [color, setColor] = useState<Color>(Color.black);
  const images = phone?.images ?? [];
  // const capacitiesRaw = phone?.capacity ?? [];
  const capacities: string[] = Array.isArray(phone?.capacityAvailable)
    ? phone.capacityAvailable
    : phone?.capacityAvailable
      ? [phone.capacityAvailable]
      : [];

  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const handleNavigate = (col: string) => {
    navigate(`/phones/${productId}../${col.toLowerCase()}`);
    setSelectedCapacity(col);
  };

  useEffect(() => {
    if (capacities.length) {
      setSelectedCapacity(capacities[0]);
    }
  }, [capacities]);
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
    if (phone?.capacity) {
      const caps = Array.isArray(phone.capacity)
        ? phone.capacity
        : [phone.capacity];

      setSelectedCapacity(caps[0]);
    }
  }, [phone?.capacity]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    getProductById(productId)
      .then(product => {
        if (product) {
          setPhone(product);
          console.log(product);
        }
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, [productId]);
  console.log('productId from params:', productId);

  return (
    <div className="phone">
      <Header
        cartItemsCount={totalQuantity}
        favouritesCount={totalFavourites}
        setMenuOpen={setMenuOpen}
      />
      {menuOpen && <Aside setMenuOpen={setMenuOpen} />}
      <div className="phone__container container">
        <div className="phone__path">
          <Link to="/" className="phone__path-home">
            <img src={home} alt="" />
          </Link>
          <div className="phone__path-arr">
            <img src={arr} alt="" />
          </div>
          <Link to="../phones" className="phone__path-phones">
            Phones
          </Link>
          <div className="phone__path-arr">
            <img src={arr} alt="" />
          </div>
          <p className="phone__path-name">{phone?.name}</p>
        </div>
        <Link to="../phones" className="phone__back">
          <img src={backArr} alt="" className="phone__back-arr" />
          <p className="phone__back-back">Back</p>
        </Link>
        <div className="phone__title">{phone?.name}</div>
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
              {phone?.colorsAvailable.map(c => (
                <div
                  key={c}
                  className={`phone__color ${color === c ? 'phone__color-active' : ''}`}
                >
                  <div
                    onClick={() => {
                      setColor(c);
                      handleNavigate(c);
                    }}
                    className={`phone__color-color phone__color-${c}`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="phone__specs-border"></div>
            <div className="phone__specs-cap">
              <p className="phone__specs-cap-text">Select capacity</p>
              <div className="phone__specs-capacities">
                {capacities.map(cap => (
                  <button
                    key={cap}
                    type="button"
                    className={`phone__specs-capacity ${cap === selectedCapacity ? 'phone__specs-capacity-active' : ''}`}
                    onClick={() => {
                      setSelectedCapacity(cap);
                      navigate(`../capacity/${cap.toLowerCase()}`);
                    }}
                    onKeyDown={e =>
                      (e.key === 'Enter' || e.key === ' ') &&
                      setSelectedCapacity(cap)
                    }
                    aria-pressed={cap === selectedCapacity}
                  >
                    {cap}
                  </button>
                ))}
                <div />
              </div>
            </div>
            <div className="phone__specs-border"></div>
            <div className="phone__prices">
              <div className="phone__price">
                <div className="phone__price-full">{phone?.priceRegular}$</div>
                <span className="phone__price-discount">
                  {phone?.priceDiscount}$
                </span>
              </div>
            </div>
            <div className="phone__buttons">
              <button
                className={`phone__add ${phone && isInCart(String(phone.id)) ? 'phone__add-added' : ''}`}
                type="button"
                onClick={() => {
                  if (phone) {
                    const product = mapPhoneToProduct(phone);

                    if (isInCart(String(product.id))) {
                      removeFromCart(String(product.id));
                    } else {
                      addToCart(product);
                    }
                  }
                }}
              >
                {phone && isInCart(String(phone.id)) ? 'Added' : 'Add to cart'}
              </button>
              <button
                className={`phone__fav ${phone && isInFav(String(phone.id)) ? 'phone__fav-added' : ''}`}
                type="button"
                onClick={() => {
                  if (phone) {
                    const product = mapPhoneToProduct(phone);

                    if (isInFav(String(product.id))) {
                      removeFromFav(String(product.id));
                    } else {
                      addToFav(product);
                    }
                  }
                }}
              >
                <img
                  src={phone && isInFav(String(phone.id)) ? activeFav : fav}
                  alt=""
                  className="phone__fav-img"
                />
              </button>
            </div>
            <div className="phone__specifications">
              <p className="phone__specifications-text phone__specifications-text__first">
                Screen{' '}
                <span className="phone__specifications-span">
                  {phone?.screen}
                </span>
              </p>
              <p className="phone__specifications-text">
                Capacity{' '}
                <span className="phone__specifications-span">
                  {phone?.capacityAvailable.join(', ')}
                </span>
              </p>
              <p className="phone__specifications-text">
                Processor{' '}
                <span className="phone__specifications-span">
                  {phone?.processor}
                </span>
              </p>
              <p className="phone__specifications-text">
                RAM{' '}
                <span className="phone__specifications-span">{phone?.ram}</span>
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
                And then there was Pro
              </div>
              <div className="phone__about-article-subtitle">
                <span className="phone__about-article-subtitle-span">
                  A transformative triple‑camera system that adds tons of
                  capability without complexity.
                  <br />
                  {''}
                  <br />
                  An unprecedented leap in battery life. And a mind‑blowing chip
                  that doubles down on machine learning and pushes the
                  boundaries boundaries of what a smartphone can do. Welcome to
                  the first powerful enough to be called Pro.
                </span>
              </div>
            </div>
            <div className="phone__about-article">
              <div className="phone__about-article-title">Camera</div>
              <div className="phone__about-article-subtitle">
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest‑quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </div>
            </div>
            <div className="phone__about-article">
              <div className="phone__about-article-title">
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </div>
              <div className="phone__about-article-subtitle">
                A transformative triple‑camera system that adds tons of
                capability without complexity. iPhone 11 Pro lets you capture
                videos that are beautifully true to life, with greater detail
                and smoother motion. Epic processing power means it can shoot 4K
                video with extended dynamic range and cinematic video
                stabilization — all at 60 fps. You get more creative control,
                too, with four times more scene and powerful new editing tools
                to play with.
              </div>
            </div>
          </div>
          <div className="phone__tech">
            <div className="phone__tech-title">Tech specs</div>
            <div className="phone__tech-border"></div>
            <p className="phone__tech-text phone__tech-text__first">
              Screen <span className="phone__tech-span">{phone?.screen}</span>
            </p>
            <p className="phone__tech-text phone__tech-text__first">
              Resolution{' '}
              <span className="phone__tech-span">{phone?.resolution}</span>
            </p>
            <p className="phone__tech-text">
              Processor{' '}
              <span className="phone__tech-span">{phone?.processor}</span>
            </p>
            <p className="phone__tech-text">
              RAM <span className="phone__tech-span">{phone?.ram}</span>
            </p>
            <p className="phone__tech-text">
              Built in memory{' '}
              <span className="phone__tech-span">
                {phone?.capacityAvailable.join(', ')}
              </span>
            </p>
            <p className="phone__tech-text">
              Camera <span className="phone__tech-span">{phone?.camera}</span>
            </p>
            <p className="phone__tech-text">
              Zoom <span className="phone__tech-span">{phone?.zoom}</span>
            </p>
            <p className="phone__tech-text">
              Cell{' '}
              <span className="phone__tech-span">{phone?.cell.join(', ')}</span>
            </p>
          </div>
        </div>
        <PhoneLike />
      </div>
      <Footer />
    </div>
  );
};

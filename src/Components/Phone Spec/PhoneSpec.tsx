/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Link, useParams } from 'react-router-dom';
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

enum Image {
  first = 'first',
  second = 'second',
  third = 'third',
  fourth = 'fourth',
  fifth = 'fifth',
}

enum Color {
  first = 'first',
  second = 'second',
  third = 'third',
  fourth = 'fourth',
}

export const PhoneSpec: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [phone, setPhone] = useState<Phone | undefined>(undefined);
  const { totalQuantity, addToCart, removeFromCart, isInCart } = useCart();
  const { addToFav, removeFromFav, isInFav } = useFav();

  const mapPhoneToProduct = (item: Phone): Products => ({
    id: String(item.id),
    itemId: String(item.id),
    name: item.name ?? 'Unknown',
    category: 'phones',
    fullPrice: Number(item.priceRegular ?? 0),
    price: Number(item.priceDiscount || item.priceRegular || 0),
    screen: item.screen ?? '—',
    capacity: Array.isArray(item.capacity)
      ? item.capacity[0]
      : (item.capacity ?? '—'),
    color: item.color ?? '—',
    ram: item.ram ?? '—',
    year: new Date().getFullYear(),
    image: item.images?.[0] ?? '/img/placeholder.png',
  });
  const [, setErrorMessage] = useState(false);
  const [, setLoading] = useState(false);
  const [image, setImage] = useState<Image>(Image.first);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [color, setColor] = useState<Color>(Color.first);
  const images = phone?.images ?? [];
  const capacitiesRaw = phone?.capacity ?? [];
  const capacities: string[] = Array.isArray(capacitiesRaw)
    ? capacitiesRaw
    : capacitiesRaw
      ? [capacitiesRaw]
      : [];
  const indexByImage = {
    [Image.first]: 0,
    [Image.second]: 1,
    [Image.third]: 2,
    [Image.fourth]: 3,
    [Image.fifth]: 4,
  } as const;
  const imageByIndex = (i: number) =>
    Object.keys(indexByImage)[i] as unknown as Image; // small helper to map back
  const mainIndex = indexByImage[image];

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
        const next = enums[(idx + 1) % images.length];

        return next;
      });
    }, 5000);

    return () => clearInterval(id);
  }, [images.length]);

  // useEffect(() => {
  //   if (capacities.length) {
  //     setSelectedCapacity(capacities[0]);
  //   }
  // }, [phone?.capacity]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    getProductById(productId)
      .then(product => {
        if (product) {
          setPhone(product);
        }
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, [productId]);

  return (
    <div className="phone">
      <Header cartItemsCount={totalQuantity} />
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
            <div className="phone__image-main">
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
              <div
                className={`phone__color ${color === Color.first ? 'phone__color-active' : ''}`}
              >
                <div
                  onClick={() => setColor(Color.first)}
                  className={`phone__color-color phone__color-beige`}
                ></div>
              </div>
              <div
                className={`phone__color ${color === Color.second ? 'phone__color-active' : ''}`}
              >
                <div
                  onClick={() => setColor(Color.second)}
                  className={`phone__color-color phone__color-green`}
                ></div>
              </div>
              <div
                className={`phone__color ${color === Color.third ? 'phone__color-active' : ''}`}
              >
                <div
                  onClick={() => setColor(Color.third)}
                  className={`phone__color-color phone__color-gray`}
                ></div>
              </div>
              <div
                className={`phone__color ${color === Color.fourth ? 'phone__color-active' : ''}`}
              >
                <div
                  onClick={() => setColor(Color.fourth)}
                  className={`phone__color-color phone__color-white`}
                ></div>
              </div>
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
                    onClick={() => setSelectedCapacity(cap)}
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
              <p className="phone__price">
                <div className="phone__price-full">{phone?.priceRegular}$</div>
                <span className="phone__price-discount">
                  {phone?.priceDiscount}$
                </span>
              </p>
            </div>
            <div className="phone__buttons">
              <button
                className="phone__add"
                type="button"
                onClick={() => {
                  if (phone) {
                    const product = mapPhoneToProduct(phone);

                    if (isInCart(product.id)) {
                      removeFromCart(product.id);
                    } else {
                      addToCart(product);
                    }
                  }
                }}
              >
                {phone && isInCart(String(phone.id)) ? 'Added' : 'Add to cart'}
              </button>
              <button
                className="phone__fav"
                type="button"
                onClick={() => {
                  if (phone) {
                    const product = mapPhoneToProduct(phone);

                    if (isInFav(product.id)) {
                      removeFromFav(product.id);
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
                  {phone?.capacity}
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
              <span className="phone__tech-span">{phone?.capacity}</span>
            </p>
            <p className="phone__tech-text">
              Camera <span className="phone__tech-span">{phone?.camera}</span>
            </p>
            <p className="phone__tech-text">
              Zoom <span className="phone__tech-span">{phone?.zoom}</span>
            </p>
            <p className="phone__tech-text">
              Cell <span className="phone__tech-span">{phone?.cell}</span>
            </p>
          </div>
        </div>
        <PhoneLike />
      </div>
      <Footer />
    </div>
  );
};

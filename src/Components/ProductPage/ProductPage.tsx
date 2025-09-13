import { useEffect, useMemo, useState } from 'react';
import { NavLink, Link, useLocation, useParams } from 'react-router-dom';
import { Gadget } from '../../types/Gadget';
import './ProductPage.scss';
import classNames from 'classnames';
import { useCart } from '../../context/cartContext';
import { useFavorites } from '../../context/favoritesContext';
import { SliderProducts } from '../SliderProducts/SliderProducts';

export const ProductPage = () => {
  const [product, setProduct] = useState<Gadget | null>(null);
  const { productId } = useParams();
  const location = useLocation();

  const typeOfProducts = useMemo(() => {
    return location.pathname.split('/')[1];
  }, [location.pathname]);

  useEffect(() => {
    fetch(`./api/${typeOfProducts}.json`)
      .then(response => {
        return response.json();
      })
      .then((data: Gadget[]) => {
        const found = data.find(item => String(item.id) === productId);

        setProduct(found || null);
      });
  }, [productId, typeOfProducts]);

  const { favorites, toggleFavorite } = useFavorites();
  const { cart, toggleCart } = useCart();

  const isFavorite = product ? favorites.includes(product.id) : false;
  const isAdded = product ? cart.includes(product.id) : false;

  return (
    <div className="product-page">
      <nav className="product-page__nav-links">
        <Link to={'/'}>
          <img
            className="product-page__nav-link"
            src="/img/ui-kit/Home.png"
            alt="home"
          />
        </Link>

        <img
          className="product-page__nav-link"
          src="/img/ui-kit/chevron-arrow-right.png"
          alt="to-right"
        />

        <NavLink to=".." className="product-page__nav-link">
          {typeOfProducts}
        </NavLink>

        <img
          className="product-page__nav-link"
          src="/img/ui-kit/chevron-arrow-right.png"
          alt="to-right"
        />

        <p className="product-page__nav-link">{product?.name}</p>
      </nav>

      <Link to=".." className="back-button">
        <img src="/img/ui-kit/chevron-arrow-left.png" />
        <p>Back</p>
      </Link>

      <h1 className="product-page-title">{product?.name}</h1>

      <div className="product-page-container">
        <div className="product-page-side-photos">
          {product?.images.map((p, i) => (
            <img key={i} src={p} alt={p} className="product-page-photo" />
          ))}
        </div>

        <img
          className="product-page-main-photo"
          src={product?.images[0]}
          alt={product?.images[0]}
        />

        <div className="product-page-info-container">
          <div className="product-page-colors">
            <p>Available colors</p>
            {product?.colorsAvailable.map((p, i) => (
              <img key={i} src={p} alt={p} className="product-page-photo" />
            ))}
          </div>

          <p className="product-page-capacity">Select capacity</p>
          <div className="product-page-capacity-select">
            {product?.capacityAvailable.map((p, i) => (
              <button key={i} className="capacity-button">
                {p}
              </button>
            ))}
          </div>

          <div className="product__prices-page">
            <p className="product__price-page">{product?.priceDiscount}$</p>
            <p className="product__full-price-page">{product?.priceRegular}$</p>
          </div>

          <div className="product__buttons-page">
            <button
              className={classNames('product__button--add-to-cart-page', {
                'button-active-page': isAdded,
              })}
              onClick={() => {
                if (product) {
                  toggleCart(product.id);
                }
              }}
            >
              {isAdded ? 'Added' : 'Add to cart'}
            </button>

            <button
              className={classNames('product__button--add-to-favorite-page', {
                'favorite-active-page': isFavorite,
              })}
              onClick={() => {
                if (product) {
                  toggleFavorite(product.id);
                }
              }}
            ></button>
          </div>

          <div className="product__characteristics-page">
            <div className="product__characteristics--section-page">
              <p className="detail-page">Screen</p>
              <p className="param-page">{product?.screen}</p>
            </div>
            <div className="product__characteristics--section-page">
              <p className="detail-page">Resolution</p>
              <p className="param-page">{product?.resolution}</p>
            </div>
            <div className="product__characteristics--section-page">
              <p className="detail-page">Processor</p>
              <p className="param-page">{product?.processor}</p>
            </div>
            <div className="product__characteristics--section-page">
              <p className="detail-page">RAM</p>
              <p className="param-page">{product?.ram}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="product-page-details-about-wrapper">
        <div className="first-column">
          <h2 className="first-column__title">About</h2>
          <h3 className="first-column__sec-title">And then there was Pro</h3>
          <p className="first-column__explination">
            A transformative triple‑camera system that adds tons of capability
            without complexity.
          </p>
          <p className="first-column__explination">
            An unprecedented leap in battery life. And a mind‑blowing chip that
            doubles down on machine learning and pushes the boundaries of what a
            smartphone can do. Welcome to the first iPhone powerful enough to be
            called Pro.
          </p>

          <h2 className="first-column__sec-title camera">Camera</h2>
          <p className="first-column__explination">
            Meet the first triple‑camera system to combine cutting‑edge
            technology with the legendary simplicity of iPhone. Capture up to
            four times more scene. Get beautiful images in drastically lower
            light. Shoot the highest‑quality video in a smartphone — then edit
            with the same tools you love for photos. You’ve never shot with
            anything like it.
          </p>

          <h2 className="first-column__sec-title shoot">
            Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
            Love it.
          </h2>
          <p className="first-column__explination">
            iPhone 11 Pro lets you capture videos that are beautifully true to
            life, with greater detail and smoother motion. Epic processing power
            means it can shoot 4K video with extended dynamic range and
            cinematic video stabilization — all at 60 fps. You get more creative
            control, too, with four times more scene and powerful new editing
            tools to play with.
          </p>
        </div>

        <div className="second-column">
          <h2 className="second-column__title">Tech specs</h2>

          <div className="tech-specs-characteristics-wrapper">
            <div className="tech-specs-characteristics">
              <p className="tech-specs-detail">Screen</p>
              <p className="tech-specs-param">{product?.screen}</p>
            </div>
            <div className="tech-specs-characteristics">
              <p className="tech-specs-detail">Resolution</p>
              <p className="tech-specs-param">{product?.resolution}</p>
            </div>
            <div className="tech-specs-characteristics">
              <p className="tech-specs-detail">Processor</p>
              <p className="tech-specs-param">{product?.processor}</p>
            </div>
            <div className="tech-specs-characteristics">
              <p className="tech-specs-detail">RAM</p>
              <p className="tech-specs-param">{product?.ram}</p>
            </div>
            <div className="tech-specs-characteristics">
              <p className="tech-specs-detail">built in memory</p>
              <p className="tech-specs-param">{product?.capacity}</p>
            </div>
            <div className="tech-specs-characteristics">
              <p className="tech-specs-detail">Camera</p>
              <p className="tech-specs-param">{product?.camera}</p>
            </div>
            <div className="tech-specs-characteristics">
              <p className="tech-specs-detail">Zoom</p>
              <p className="tech-specs-param">{product?.zoom}</p>
            </div>
            <div className="tech-specs-characteristics">
              <p className="tech-specs-detail">Cell</p>
              <p className="tech-specs-param">{product?.cell}</p>
            </div>
          </div>
        </div>
      </div>

      <SliderProducts title={'You may also like'} />
    </div>
  );
};

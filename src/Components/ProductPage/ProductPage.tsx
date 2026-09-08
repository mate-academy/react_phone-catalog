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
  const [mainPhoto, setMainPhoto] = useState<string | undefined>('');

  const [photoIsActive, setPhotoIsActive] = useState<string | undefined>();
  const [colorIsActive, setColorIsActive] = useState<string | undefined>();
  const [capIsActive, setCapIsActive] = useState<string | undefined>();

  const { productId } = useParams();
  const location = useLocation();

  const typeOfProducts = useMemo(() => {
    return location.pathname.split('/')[1];
  }, [location.pathname]);

  const BASE_ID = location.pathname.split('/');
  const idToChange = BASE_ID[BASE_ID.length - 1];
  const arrayForReplase = idToChange.split('-');

  const createColorLink = (cl: string) => {
    const tempArr = [...arrayForReplase];

    const colorParts = cl.trim().split(' ');

    const checkElement = tempArr[tempArr.length - 2];
    const hasDigit = checkElement.split('').some(ch => ch >= '0' && ch <= '9');

    if (!hasDigit) {
      tempArr.splice(tempArr.length - 2, 2, ...colorParts);
    } else {
      tempArr.splice(tempArr.length - 1, 1, ...colorParts);
    }

    return tempArr.join('-');
  };

  const createCapacityLink = (value: string) => {
    const tempArr = [...arrayForReplase];

    const capacityParts = value.toLowerCase().trim().split(' ');

    const checkElement = tempArr[tempArr.length - 2];
    const hasDigit = checkElement.split('').some(ch => ch >= '0' && ch <= '9');

    if (hasDigit) {
      tempArr.splice(tempArr.length - 2, 1, ...capacityParts);
    } else {
      tempArr.splice(tempArr.length - 3, 1, ...capacityParts);
    }

    return tempArr.join('-');
  };

  // arrayForColorReplase.splice(arrayForColorReplase.length, 1, color)

  useEffect(() => {
    fetch(`./api/${typeOfProducts}.json`)
      .then(response => {
        return response.json();
      })
      .then((data: Gadget[]) => {
        const found = data.find(item => String(item.id) === productId);

        setProduct(found || null);
        setMainPhoto(found?.images[0]);
        setPhotoIsActive(found?.images[0]);
        setColorIsActive(found?.color);
        setCapIsActive(found?.capacity);
      });
  }, [productId, typeOfProducts]);

  const { favorites, toggleFavorite } = useFavorites();
  const { cart, toggleProductPageCart } = useCart();

  const isFavorite = product ? favorites.includes(product.id) : false;
  const isAdded = cart.find(
    cartProduct => cartProduct.item?.itemId === product?.id,
  );

  return (
    <div className="product-page">
      <nav className="product-page__nav-links">
        <Link to={'/'}>
          <img
            className="product-page__nav-link"
            src="img/ui-kit/Home.png"
            alt="home"
          />
        </Link>

        <img
          className="product-page__nav-link"
          src="img/ui-kit/chevron-arrow-right.png"
          alt="to-right"
        />

        <NavLink to=".." className="product-page__nav-link">
          {typeOfProducts}
        </NavLink>

        <img
          className="product-page__nav-link"
          src="img/ui-kit/chevron-arrow-right.png"
          alt="to-right"
        />

        <p className="product-page__nav-link">{product?.name}</p>
      </nav>

      <Link to=".." className="back-button">
        <img src="img/ui-kit/chevron-arrow-left.png" />
        <p>Back</p>
      </Link>

      <h1 className="product-page-title">{product?.name}</h1>

      <div className="product-page-container">
        <div className="product-page-side-photos">
          {product?.images.map((p, i) => (
            <img
              key={i}
              src={p}
              alt={p}
              className={classNames('product-page-photo', {
                'product-page-photo-active': photoIsActive === p,
              })}
              onClick={() => {
                setMainPhoto(p);
                setPhotoIsActive(p);
              }}
            />
          ))}
        </div>

        <img
          className="product-page-main-photo"
          src={mainPhoto}
          alt={mainPhoto}
        />

        <div className="product-page-info-container">
          <p className="product-page-available-colors">Available colors</p>
          <div className="product-page-colors">
            {product?.colorsAvailable.map((color, i) => {
              const link = createColorLink(color);

              return (
                <div
                  key={i}
                  className={classNames('product-page-color-wrapper', {
                    'product-page-color-active': colorIsActive === color,
                  })}
                >
                  <Link
                    to={`/${typeOfProducts}/${link}`}
                    key={i}
                    className="product-page-color"
                    style={{
                      backgroundColor:
                        color === 'midnightgreen'
                          ? '#004953'
                          : color && color === 'spacegray'
                            ? 'grey'
                            : color && color === 'space gray'
                              ? 'grey'
                              : color && color === 'midnight'
                                ? '#222931'
                                : color && color === 'sierrablue'
                                  ? '#BFDAF7'
                                  : color && color === 'graphite'
                                    ? '#383428'
                                    : color && color === 'spaceblack'
                                      ? 'black'
                                      : color && color === 'rose gold'
                                        ? 'pink'
                                        : color && color === 'rosegold'
                                          ? 'pink'
                                          : color && color === 'sky blue'
                                            ? '#BFDAF7'
                                            : color && color === 'starlight'
                                              ? '#F8F9EC'
                                              : color,
                    }}
                  ></Link>
                </div>
              );
            })}
          </div>

          <p className="product-page-capacity">Select capacity</p>
          <div className="product-page-capacity-select">
            {product?.capacityAvailable.map((p, i) => {
              const link = createCapacityLink(p);

              return (
                <Link
                  to={`/${typeOfProducts}/${link}`}
                  key={i}
                  className={classNames('capacity-button', {
                    'capacity-button-active': capIsActive === p,
                  })}
                >
                  {p}
                </Link>
              );
            })}
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
                  toggleProductPageCart(product);
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
          <h3 className="first-column__sec-title">
            {product?.description[0].title}
          </h3>
          <p className="first-column__explination">
            {product?.description[0].text}
          </p>

          <h2 className="first-column__sec-title camera">
            {product?.description[1].title}
          </h2>
          <p className="first-column__explination">
            {product?.description[1].text}
          </p>

          <h2 className="first-column__sec-title shoot">
            {product?.description[2].title}
          </h2>
          <p className="first-column__explination">
            {product?.description[2].text}
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

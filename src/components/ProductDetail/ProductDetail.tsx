/* eslint-disable max-len */

import { Link, useNavigate, useParams } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';
import { ProductList } from '../Product/ProductList/ProductList';
import productFromServer from '../../../public/api/products.json';
import './ProductDetail.scss';

const excludedKeys = [
  'id',
  'category',
  'namespaceId',
  'name',
  'capacityAvailable',
  'capacity',
  'priceRegular',
  'priceDiscount',
  'colorsAvailable',
  'color',
  'images',
  'description',
];

function getProductById(
  category: string | undefined,
  productId: string | undefined,
) {
  let fileCategory;

  if (!category || !productId) {
    return null;
  }

  switch (category) {
    case 'phones':
      fileCategory = phones;
      break;

    case 'tablets':
      fileCategory = tablets;
      break;

    case 'accessories':
      fileCategory = accessories;
      break;

    default:
      return null;
  }

  return fileCategory.find(product => product.id === productId);
}

export const ProductDetail = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const product = getProductById(category, productId);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { favourites, toggleFavourite } = useFavourites();
  const { cart, toggleCart } = useCart();

  const [selectedImg, setSelectedImg] = useState(product?.images[0]);

  const handleColorChange = (color: string) => {
    const allProducts = [...phones, ...tablets, ...accessories];

    const newProduct = allProducts.find(
      item =>
        item.namespaceId === product?.namespaceId &&
        item.color === color &&
        item.capacity === product?.capacity,
    );

    if (newProduct) {
      navigate(`/${category}/${newProduct.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const allProducts = [...phones, ...tablets, ...accessories];

    const newProduct = allProducts.find(
      item =>
        item.namespaceId === product?.namespaceId &&
        item.capacity === capacity &&
        item.color === product?.color,
    );

    if (newProduct) {
      navigate(`/${category}/${newProduct.id}`);
    }
  };

  const getCardWidth = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return 0;
    }

    const cards = slider.querySelectorAll('.product-card');

    if (cards.length < 2) {
      return cards[0]?.getBoundingClientRect().width || 0;
    }

    const firstCard = cards[0].getBoundingClientRect();
    const secondCard = cards[1].getBoundingClientRect();

    return secondCard.left - firstCard.left;
  };

  const handleScroll = () => {
    if (!sliderRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    setIsAtStart(scrollLeft <= 1);

    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const handleNext = () => {
    sliderRef.current?.scrollBy({
      left: getCardWidth(),
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    sliderRef.current?.scrollBy({
      left: -getCardWidth(),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleScroll();
    setSelectedImg(product?.images[0]);
  }, [product]);

  return (
    <main className="product-detail-main">
      <div className="product-detail-location">
        <div className="product-detail-location__path">
          <Link to={'/'}>
            <img
              className="product-detail-location__icon"
              src="icons/Home.png"
              alt=""
            />
          </Link>
          <svg
            className="banner__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#4A4D58"
            />
          </svg>
          <Link
            to={`/${category}`}
            className="product-detail-location__category"
          >
            {category}
          </Link>
          <svg
            className="banner__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#4A4D58"
            />
          </svg>
          <div className="product-detail-location__product">{productId}</div>
        </div>
      </div>
      <div className="product-detail-back">
        <svg
          className="product-detail-back__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
        >
          <path
            d="M5.13775 0.195262C4.8774 -0.0650874 4.45529 -0.0650874 4.19494 0.195262L0.194937 4.19526C-0.065413 4.45561 -0.065413 4.87772 0.194937 5.13807L4.19494 9.13807C4.45529 9.39842 4.8774 9.39842 5.13775 9.13807C5.3981 8.87772 5.3981 8.45561 5.13775 8.19526L1.60915 4.66667L5.13775 1.13807C5.3981 0.877722 5.3981 0.455612 5.13775 0.195262Z"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#F1F2F9"
          />
        </svg>
        <span
          className="product-detail-back__button"
          onClick={() => navigate(`/${category}`)}
        >
          Back
        </span>
      </div>
      <h1 className="product-detail-main__title">
        {product?.name ?? 'Product not found'}
      </h1>

      {product && (
        <>
          <section className="product-detail-parameters">
            <div className="product-detail-parameters__images">
              <div className="product-detail-parameters__images--to-select">
                {product?.images.map(image => (
                  <div
                    key={image}
                    className={`product-detail-parameters__img ${image === selectedImg ? 'product-detail-parameters__img-selected' : ''}`}
                    onClick={() => setSelectedImg(image)}
                  >
                    <img src={image} alt="" />
                  </div>
                ))}
              </div>

              <div className="product-detail-parameters__selected-img">
                <img src={selectedImg} alt="" />
              </div>
            </div>

            <div className="product-detail-parameters--to-change">
              <div className="product-detail-parameters__colors">
                Available colors
                <div className="product-detail-parameters__colors-list">
                  {product?.colorsAvailable.map(color => (
                    <div
                      key={color}
                      className={`product-detail-parameters__color ${color === product.color ? 'product-detail-parameters__color--current' : ''}`}
                      onClick={() => handleColorChange(color)}
                    >
                      <div
                        className="product-detail-parameters__color-item"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-detail-parameters__capacities">
                Select capacity
                <div className="product-detail-parameters__capacities-list">
                  {product?.capacityAvailable.map(capacity => (
                    <div
                      key={capacity}
                      className={`product-detail-parameters__capacity ${capacity === product.capacity ? 'product-detail-parameters__capacity--current' : ''}`}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      {capacity}
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-detail-parameters__price">
                {product?.priceRegular !== product?.priceDiscount ? (
                  <div className="product-card__price--discount">
                    <div className="product-card__price--current">
                      {`$${product?.priceDiscount}`}
                    </div>
                    <div className="product-card__price--full-price">
                      {`$${product?.priceRegular}`}
                    </div>
                  </div>
                ) : (
                  <div className="product-card__price--full">{`${product?.priceRegular}`}</div>
                )}
              </div>

              <div className="product-detail-parameters__add">
                <button
                  className={`product-detail-parameters__add__cart ${cart.some(item => item.id === product.id) ? 'product-detail-parameters__add__cart-added' : ''}`}
                  onClick={() => toggleCart(product.id)}
                >
                  {cart.some(item => item.id === product.id) ? (
                    <div>Added to cart</div>
                  ) : (
                    <div>Add to cart</div>
                  )}
                </button>

                <button
                  className={`product-detail-parameters__add__favourite ${favourites.includes(product.id) ? 'product-detail-parameters__add__favourite-added' : ''}`}
                  onClick={() => toggleFavourite(product.id)}
                >
                  {favourites.includes(product.id) ? (
                    <img
                      className="product-detail-parameters__add__favourite-img-added"
                      src="icons/Favourites-Filled.png"
                      alt=""
                    />
                  ) : (
                    <img
                      className="product-detail-parameters__add__favourite-img"
                      src="icons/Favourites.png"
                      alt=""
                    />
                  )}
                </button>
              </div>
            </div>
          </section>

          <section className="product-detail__description">
            <section className="product-detail-about">
              <h3 className="product-detail-about__main-title">About</h3>

              {product.description.map(({ title, text }) => (
                <div key={title} className="product-detail-about__description">
                  <h4 className="product-detail-about__title">{title}</h4>

                  {text.map(paragraph => (
                    <p key={paragraph} className="product-detail-about__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </section>

            <section className="product-detail-tech">
              <h3 className="product-detail-tech__main-title">Tech specs</h3>

              <div className="product-detail-tech__descriptions">
                {Object.entries(product)
                  .filter(([key]) => !excludedKeys.includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="product-detail-tech__description">
                      <span className="product-detail-tech__description--key">
                        {key}
                      </span>
                      <span className="product-detail-tech__description--value">
                        {String(value)}
                      </span>
                    </div>
                  ))}
              </div>
            </section>
          </section>

          <section className="product-detail__recommended">
            <div className="product-detail__recommended__top">
              <h2 className="product-detail__recommended-title">
                You may also like
              </h2>

              <div className="product-detail__recommended__buttons">
                <button
                  className={`product-detail__recommended__prev ${isAtStart ? 'button--disabled' : ''}`}
                  onClick={() => handlePrev()}
                  disabled={isAtStart}
                >
                  <svg
                    className="button__prev-img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                  >
                    <path
                      d="M5.13799 0.195262C4.87764 -0.0650874 4.45553 -0.0650874 4.19518 0.195262L0.195181 4.19526C-0.0651689 4.45561 -0.0651689 4.87772 0.195181 5.13807L4.19518 9.13807C4.45553 9.39842 4.87764 9.39842 5.13799 9.13807C5.39834 8.87772 5.39834 8.45561 5.13799 8.19526L1.60939 4.66667L5.13799 1.13807C5.39834 0.877722 5.39834 0.455612 5.13799 0.195262Z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill={isAtStart ? '#4A4D58' : '#F1F2F9'}
                    />
                  </svg>
                </button>
                <button
                  className={`product-detail__recommended__next ${isAtEnd ? 'button--disabled' : ''}`}
                  onClick={() => handleNext()}
                  disabled={isAtEnd}
                >
                  <svg
                    className="button__next-img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                  >
                    <path
                      d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill={isAtEnd ? '#4A4D58' : '#F1F2F9'}
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className="brand-new__slider"
              ref={sliderRef}
              onScroll={handleScroll}
            >
              <ProductList
                products={
                  productFromServer as Parameters<
                    typeof ProductList
                  >[0]['products']
                }
                column={false}
                productDetails={true}
              />
            </div>
          </section>
        </>
      )}
    </main>
  );
};

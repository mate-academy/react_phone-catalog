import { Link, useParams } from 'react-router-dom';
import {
  useContext,
  useEffect,
  useState,
} from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import './ProductPage.scss';

import { PageContext } from '../../utils/GlobalContext';
import { getProduct } from '../../api';
import { ProductDetails } from '../../types/ProductDetails';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { Loader } from '../Loader';

export const ProductPage: React.FC = () => {
  const {
    products,
    cardList,
    setCardList,
    favorietsList,
    setFavorietsList,
    setError,
    error,
  } = useContext(PageContext);
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState<ProductDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const takeRandom = () => {
    const result: Product[] = [];
    let i = 0;

    while (i < 10) {
      const random = Math.floor(Math.random() * products.length);

      result.push(products[random]);
      i += 1;
    }

    return result;
  };

  const sliderList = takeRandom();

  const product = products.find(p => p.phoneId === productId) || '';

  const [currentImage, setCurrentImage] = useState(
    product ? product.image : '',
  );

  useEffect(() => {
    if (product) {
      setIsLoading(true);

      getProduct(product.phoneId)
        .then((response) => {
          setCurrentProduct(response);
          setCurrentImage(response.images[0]);
        })
        .catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }
  }, [productId, setError, setIsLoading, product]);

  if (!currentProduct) {
    return (
      <>
        {(error)
          && <NotFoundPage message="Phone was not found" />}
      </>
    );
  }

  const {
    name,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    namespaceId,
    images,
  } = currentProduct;

  const modifyFavorietsList = () => {
    if (product) {
      const filteredList = favorietsList.filter(el => el !== product.id);

      if (favorietsList.includes(product.id)) {
        setFavorietsList(filteredList);
      } else {
        setFavorietsList([...favorietsList, product.id]);
      }
    }
  };

  const modifyCardList = () => {
    if (product) {
      const filteredList = cardList.filter(el => el !== product.id);

      if (!cardList.includes(product.id)) {
        setCardList([...cardList, product.id]);
      } else {
        setCardList(filteredList);
      }
    }
  };

  const settings = {
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    className: 'slider',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <Loader />;
  }

  const mobileName = `${name.split('').slice(0, 23).join('')}...`;

  return (
    <div className="product-page">
      {product
        ? (
          <>
            <div className="products-page__link-way" data-cy="breadCrumbs">
              <Link to="/home" className="products-page__home-link" />
              <div className="products-page__way-arrow" />
              <Link
                to={`/${product.category}`}
                className="products-page__text-link"
              >
                {product.category}
              </Link>
              <div className="products-page__way-arrow" />
              <p
                className="products-page__text-link
                  products-page__text-link--descktop"
              >
                {name}
              </p>
              <p
                className="products-page__text-link
                  products-page__text-link--mobile"
              >
                {mobileName}
              </p>
            </div>

            <div className="product-page__back">
              <div className="product-page__back-arrow" />
              <Link
                to={`/${product.category}`}
                className="product-page__back-text"
              >
                Back
              </Link>
            </div>

            <h1 className="product-page__title">{name}</h1>

            <div className="product-page__main-options">
              <div className="product-page__photos">
                <div className="product-page__photos-pagination">
                  {images.map(image => (
                    <button
                      key={image}
                      type="button"
                      className={classNames('product-page__photos-button', {
                        'product-page__photos-button--active':
                          image === currentImage,
                      })}
                      onClick={() => setCurrentImage(image)}
                    >
                      <img
                        alt={namespaceId}
                        src={`new/${image}`}
                        className="product-page__photos-item"
                      />
                    </button>
                  ))}
                </div>
                <div className="product-page__photos-current">
                  <img
                    alt={namespaceId}
                    src={`new/${currentImage}`}
                    className="product-page__photos-current-item"
                  />
                </div>
              </div>
              <div className="product-page__options">
                <div className="product-page__choice">
                  <div className="product-page__choice-block">
                    <p className="product-page__choice-text">
                      Available colors
                    </p>

                    <ul className="product-page__choice-options">
                      {colorsAvailable.map(colorValue => (
                        <li
                          key={colorValue}
                          className={classNames('product-page__choice-color', {
                            'product-page__choice-color--active':
                              color === colorValue,
                          })}
                        >
                          <Link
                            to={`/phones/${namespaceId}-${capacity.toLowerCase()}-${colorValue}`}
                            className={classNames(
                              'product-page__choice-color-link',
                              `product-page__choice-color-${colorValue}`,
                            )}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-page__choice-block
                    product-page__choice-block--capacity"
                  >
                    <p className="product-page__choice-text">
                      Select capacity
                    </p>

                    <ul className="product-page__choice-options">
                      {capacityAvailable.map(value => (
                        <li
                          key={value}
                          className={classNames(
                            'product-page__choice-capacity', {
                              'product-page__choice-capacity--active':
                                capacity === value,
                            },
                          )}
                        >
                          <Link
                            to={`/phones/${namespaceId}-${value.toLowerCase()}-${color}`}
                            className={classNames(
                              'product-page__choice-capacity-link', {
                                'product-page__choice-capacity-link--active':
                                  capacity === value,
                              },
                            )}
                          >
                            {value}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-page__prices">
                    <p className="product-page__price">{`$${product.price}`}</p>
                    <p className="product-page__full-price">
                      {`$${product.fullPrice}`}
                    </p>
                  </div>

                  <div className="product-page__buttons">
                    <button
                      className={classNames(
                        'product-page__card-button',
                        {
                          'product-page__card-button--chosen':
                            cardList.includes(product.id),
                        },
                      )}
                      type="button"
                      onClick={modifyCardList}
                    >
                      {cardList.includes(product.id)
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </button>
                    <button
                      aria-label="add to favoriets"
                      className={classNames(
                        'product-page__favorite-button',
                        {
                          'product-page__favorite-button--chosen':
                            favorietsList.includes(product.id),
                        },
                      )}
                      type="button"
                      onClick={modifyFavorietsList}
                    />
                  </div>

                  <div className="product-page__short-info">
                    <div className="product-page__short-tech">
                      <p className="product-page__short-text">Screen</p>
                      <p className="product-page__short-text
                        product-page__short-text--char"
                      >
                        {screen}
                      </p>
                    </div>

                    <div className="product-page__short-tech">
                      <p className="product-page__short-text">Resolution</p>
                      <p className="product-page__short-text
                        product-page__short-text--char"
                      >
                        {resolution}
                      </p>
                    </div>

                    <div className="product-page__short-tech">
                      <p className="product-page__short-text">Processor</p>
                      <p className="product-page__short-text
                        product-page__short-text--char"
                      >
                        {processor}
                      </p>
                    </div>

                    <div className="product-page__short-tech">
                      <p className="product-page__short-text">RAM</p>
                      <p className="product-page__short-text
                        product-page__short-text--char"
                      >
                        {ram}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="product-page__id">{`ID: ${product.id}`}</p>
              </div>
            </div>

            <div className="product-page__main-info">
              <div className="product-page__description">
                <h2
                  className="product-page__info-title"
                  data-cy="productDescription"
                >
                  About
                </h2>

                <div className="product-page__description-body">
                  {description.map(item => {
                    return (
                      <div
                        className="product-page__description-section"
                        key={item.title}
                      >
                        <h3 className="product-page__description-title">
                          {item.title}
                        </h3>
                        <p className="product-page__description-text">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="product-page__techs">
                <h2 className="product-page__info-title">Tech specs</h2>
                <div className="product-page__techs-body">
                  <div className="product-page__tech">
                    <p className="product-page__tech-text">Screen</p>
                    <p className="product-page__tech-text
                      product-page__tech-text--char"
                    >
                      {screen}
                    </p>
                  </div>

                  <div className="product-page__tech">
                    <p className="product-page__tech-text">Resolution</p>
                    <p className="product-page__tech-text
                      product-page__tech-text--char"
                    >
                      {resolution}
                    </p>
                  </div>

                  <div className="product-page__tech">
                    <p className="product-page__tech-text">Processor</p>
                    <p className="product-page__tech-text
                      product-page__tech-text--char"
                    >
                      {processor}
                    </p>
                  </div>

                  <div className="product-page__tech">
                    <p className="product-page__tech-text">RAM</p>
                    <p className="product-page__tech-text
                      product-page__tech-text--char"
                    >
                      {ram}
                    </p>
                  </div>

                  <div className="product-page__tech">
                    <p className="product-page__tech-text">Camera</p>
                    <p className="product-page__tech-text
                      product-page__tech-text--char"
                    >
                      {camera}
                    </p>
                  </div>

                  <div className="product-page__tech">
                    <p className="product-page__tech-text">Zoom</p>
                    <p className="product-page__tech-text
                      product-page__tech-text--char"
                    >
                      {zoom}
                    </p>
                  </div>

                  <div className="product-page__tech">
                    <p className="product-page__tech-text">Cell</p>
                    <p className="product-page__tech-text
                      product-page__tech-text--char"
                    >
                      {cell}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-page__slider">
              <h1 className="product-page__slider-title">You may also like</h1>

              <Slider {...settings} data-cy="cardsContainer">
                {sliderList.map(item => {
                  return (
                    <ProductCard
                      product={item}
                      section="productPage"
                      key={item.id}
                    />
                  );
                })}
              </Slider>
            </div>
          </>
        ) : (
          <NotFoundPage message="Phone was not found" />
        )}
    </div>
  );
};

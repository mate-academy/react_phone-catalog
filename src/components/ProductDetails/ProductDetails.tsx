/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

import productsFromServer from '../../api/products.json';
import phonesFromServer from '../../api/phones.json';
import tabletsFromServer from '../../api/tablets.json';
import accessoriesFromServer from '../../api/accessories.json';

import './ProductDetails.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Desktop } from '../../utils/DesktopContext';
import { Tablet } from '../../utils/TabletContext';
import classNames from 'classnames';
import { Colors } from '../../utils/Colors';
import { Menu } from '../Menu/Menu';
import { MenuOpen } from '../../utils/MenuContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  category?: 'phones' | 'tablets' | 'accessories';
};

export const ProductDetails: React.FC<Props> = ({ category }) => {
  const [randomProduct, setRandomProduct] = useState(
    productsFromServer.slice().sort(() => Math.random() - 0.5),
  );

  useEffect(() => {
    setRandomProduct(
      productsFromServer.slice().sort(() => Math.random() - 0.4),
    );
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const { itemId } = useParams();

  const isAccessory = category === 'accessories';

  const { isMenuOpen } = useContext(MenuOpen);

  const onDesktop = useContext(Desktop);
  const onTablet = useContext(Tablet);

  const mayLikeRef = useRef<any>(null);

  const slidesPerVeiw = () => {
    if (onDesktop) {
      return 4;
    } else if (onTablet) {
      return 2.4;
    } else {
      return 1.4;
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const checkedItemId = () => {
    if (
      itemId &&
      productsFromServer.find(product => product.itemId.includes(itemId))
    ) {
      return itemId;
    }

    return '';
  };

  const sortProductByCategory = productsFromServer.find(product =>
    product.itemId.includes(checkedItemId()),
  )?.category;

  const findProductById = () => {
    switch (category || sortProductByCategory) {
      case 'phones':
        return (
          phonesFromServer.find(
            phone => phone.namespaceId === checkedItemId(),
          ) || phonesFromServer[0]
        );

      case 'tablets':
        return (
          tabletsFromServer.find(
            tablet => tablet.namespaceId === checkedItemId(),
          ) || tabletsFromServer[0]
        );

      case 'accessories':
        return (
          accessoriesFromServer.find(
            access => access.namespaceId === checkedItemId(),
          ) || accessoriesFromServer[0]
        );

      default:
        return phonesFromServer[0];
    }
  };

  const { color, namespaceId, capacity } = findProductById();

  const colorByParams = searchParams.get('color') || color;

  const [choosenColor, setChoosenColor] = useState(colorByParams);

  const findProductBy = (capacityAsParam: string) => {
    switch (category) {
      case 'phones':
        return (
          phonesFromServer.find(
            phone =>
              phone.namespaceId === namespaceId &&
              phone.color === colorByParams &&
              phone.capacity === capacityAsParam,
          ) || phonesFromServer[0]
        );

      case 'tablets':
        return (
          tabletsFromServer.find(
            tablet =>
              tablet.namespaceId === namespaceId &&
              tablet.color === colorByParams &&
              tablet.capacity === capacityAsParam,
          ) || tabletsFromServer[0]
        );

      case 'accessories':
        return {
          ...(accessoriesFromServer.find(
            access =>
              access.namespaceId === namespaceId &&
              access.color === colorByParams &&
              access.capacity === capacityAsParam,
          ) || accessoriesFromServer[0]),
          camera: null,
          zoom: null,
        };

      default:
        return phonesFromServer[0];
    }
  };

  const [choosenImage, setChoosenImage] = useState(0);

  const handleSetColor = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set('color', event.currentTarget.value);

      return prev;
    });
    setChoosenColor(event.currentTarget.value);
  };

  function isValidColorKey(key: string): key is keyof typeof Colors {
    return key in Colors;
  }

  const [choosenCapacity, setChoosenCapacity] = useState(
    searchParams.get('capacity') || capacity,
  );

  const {
    colorsAvailable,
    images,
    capacityAvailable,
    name,
    priceRegular,
    priceDiscount,
    processor,
    resolution,
    ram,
    screen,
    description,
    camera,
    zoom,
    cell,
  } = findProductBy(choosenCapacity);

  let checkedName = name;

  if (name.length > 18) {
    checkedName = name.slice(0, 18);
    checkedName += '...';
  }

  const handleSetCapacity = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set('capacity', event.currentTarget.value);

      return prev;
    });
    setChoosenCapacity(event.currentTarget.value);
  };

  return (
    <>
      <Header />
      {isMenuOpen && <Menu />}
      {!checkedItemId() ? (
        <div className="not-found__box">
          <img src="./img/product-not-found.png" className="not-found__image" />
          <h2 className="not-found__title">Product not found</h2>
        </div>
      ) : (
        <main className="product-details-main">
          <div className="navigation">
            <Link to="/" className="navigation__home" />
            <img src=".\img\arrow-next-disabled.svg" alt="next page" />
            <Link to={`/${category}`} className="navigation__category-page">
              {category}
            </Link>
            <img src=".\img\arrow-next-disabled.svg" alt="next page" />
            <p className="navigation__current-page">
              {onDesktop || onTablet ? name : checkedName}
            </p>
          </div>
          <Link
            to={`/${category}`}
            className="product-details-main__return-button"
          >
            <img src="./img/arrow-prev.svg" alt="return" />
            <span>Back</span>
          </Link>
          <div className="product-details-main__details-content">
            <h2 className="product-details-main__title">{name}</h2>
            <img
              src={images[choosenImage] || images[0]}
              alt="product image"
              className="product-details-main__product-image"
            />
            <div className="image-select">
              <form className="image-select__form">
                {images.map((image, index) => (
                  <label
                    key={index}
                    htmlFor={`image${index + 1}`}
                    className={classNames('image-select__label', {
                      'image-select__label--active': choosenImage === index,
                    })}
                  >
                    <input
                      id={`image${index + 1}`}
                      type="radio"
                      name="selectedImage"
                      className="image-select__image-radio"
                      value={image}
                      onChange={() => setChoosenImage(index)}
                    />
                    <img
                      src={image}
                      alt="product image"
                      className="image-select__label-image"
                    />
                  </label>
                ))}
              </form>
            </div>
            <div className="main-info">
              <div className="color-select">
                <div className="color-select__title-and-id">
                  <p className="color-select__aviable-color">Aviable colors</p>
                  <p className="color-select__id">
                    ID:{' '}
                    {
                      productsFromServer.find(
                        product =>
                          product.itemId === findProductBy(choosenCapacity).id,
                      )?.id
                    }
                  </p>
                </div>
                <form className="color-select__form">
                  {colorsAvailable.map((colorForChoose, index) => {
                    let validedColor = colorForChoose;

                    if (validedColor.includes(' ')) {
                      validedColor = colorForChoose.replace(' ', '');
                    }

                    return (
                      <label
                        key={index}
                        htmlFor={colorForChoose}
                        className={classNames('color-select__label', {
                          'color-select__label--active':
                            choosenColor === colorForChoose,
                        })}
                      >
                        <input
                          id={colorForChoose}
                          type="radio"
                          name="selectedColor"
                          className="color-select__color-radio"
                          value={colorForChoose}
                          onChange={handleSetColor}
                        />
                        <div
                          className="color-select__color"
                          style={{
                            background: isValidColorKey(validedColor)
                              ? Colors[validedColor]
                              : undefined,
                          }}
                        />
                      </label>
                    );
                  })}
                </form>
              </div>
              <div className="section-line" />
              <div className="capacity-select">
                <p className="capacity-select__text">
                  {isAccessory ? 'Select display size' : 'Select capacity'}
                </p>
                <form className="capacity-select__form">
                  {capacityAvailable.map(capacityForInput => (
                    <label
                      key={capacityForInput}
                      htmlFor={capacityForInput}
                      className={classNames('capacity-select__label', {
                        'capacity-select__label--active':
                          capacityForInput === choosenCapacity,
                      })}
                    >
                      <p className="capacity-select__label-text">
                        {capacityForInput}
                      </p>
                      <input
                        name="capacity-select"
                        id={capacityForInput}
                        type="radio"
                        className="capacity-select__input"
                        value={capacityForInput}
                        onChange={handleSetCapacity}
                      />
                    </label>
                  ))}
                </form>
              </div>
              <div className="section-line" />
              <div className="price-box">
                <p className="price-box__current-price">${priceDiscount}</p>
                <p className="price-box__full-price">${priceRegular}</p>
              </div>
              <div className="buttons-box">
                <button className="buttons-box__buy-button">Add to card</button>
                <button className="buttons-box__favorite-button">
                  <img src="./img/heart-icon.svg" alt="favorite" />
                </button>
              </div>
              <div className="option-box">
                <div className="option-box__option">
                  <h5 className="option-box__title">Screen</h5>
                  <p className="option-box__value">{screen}</p>
                </div>
                <div className="option-box__option">
                  <h5 className="option-box__title">Resolution</h5>
                  <p className="option-box__value">{resolution}</p>
                </div>
                <div className="option-box__option">
                  <h5 className="option-box__title">Processor</h5>
                  <p className="option-box__value">{processor}</p>
                </div>
                <div className="option-box__option">
                  <h5 className="option-box__title">RAM</h5>
                  <p className="option-box__value">{ram}</p>
                </div>
              </div>
            </div>
            <article className="about-info">
              <h3 className="article-title">About</h3>
              <div className="section-line section-line--about" />
              {description.map((article, index) => (
                <>
                  <h4 key={index} className="about-info__subtitle">
                    {article.title}
                  </h4>
                  <p className="about-info__text">{article.text}</p>
                </>
              ))}
            </article>
            <article className="tech-specs">
              <h3 className="article-title">Tech specs</h3>
              <div className="section-line section-line--tech-specs" />
              <div className="tech-specs__option">
                <h5 className="tech-specs__subtitle">Screen</h5>
                <p className="tech-specs__value">{screen}</p>
              </div>
              <div className="tech-specs__option">
                <h5 className="tech-specs__subtitle">Resolution</h5>
                <p className="tech-specs__value">{resolution}</p>
              </div>
              <div className="tech-specs__option">
                <h5 className="tech-specs__subtitle">Processor</h5>
                <p className="tech-specs__value">{processor}</p>
              </div>
              <div className="tech-specs__option">
                <h5 className="tech-specs__subtitle">RAM</h5>
                <p className="tech-specs__value">{ram}</p>
              </div>
              <div className="tech-specs__option">
                <h5 className="tech-specs__subtitle">
                  {isAccessory ? 'Display size' : 'Built in memory'}
                </h5>
                <p className="tech-specs__value">{choosenCapacity}</p>
              </div>
              {camera && (
                <div className="tech-specs__option">
                  <h5 className="tech-specs__subtitle">Camera</h5>
                  <p className="tech-specs__value">{camera}</p>
                </div>
              )}
              {zoom && (
                <div className="tech-specs__option">
                  <h5 className="tech-specs__subtitle">Zoom</h5>
                  <p className="tech-specs__value">{zoom}</p>
                </div>
              )}
              <div className="tech-specs__option">
                <h5 className="tech-specs__subtitle">Cell</h5>
                <p className="tech-specs__value">{cell.join(', ')}</p>
              </div>
            </article>
            <div className="may-like">
              <div className="wrapper">
                <h3 className="may-like__title">You may also like</h3>
                <div className="may-like__button-box">
                  <button
                    className="navigation-button"
                    onClick={() => mayLikeRef.current.slidePrev()}
                    disabled={currentSlide === 0}
                  >
                    {currentSlide !== 0 ? (
                      <img src="./img/arrow-prev.svg" alt="slide prev" />
                    ) : (
                      <img
                        src="./img/arrow-prev-disabled.svg"
                        alt="slide prev"
                      />
                    )}
                  </button>
                  <button
                    className="navigation-button"
                    onClick={() => mayLikeRef.current.slideNext()}
                  >
                    {currentSlide !== 60 ? (
                      <img src="./img/arrow-next.svg" alt="slide next" />
                    ) : (
                      <img
                        src="./img/arrow-next-disabled.svg"
                        alt="slide next"
                      />
                    )}
                  </button>
                </div>
              </div>
              <Swiper
                slidesPerView={slidesPerVeiw()}
                spaceBetween={16}
                className="may-like__swiper"
                onSwiper={swiper => {
                  mayLikeRef.current = swiper;
                }}
                onSlideChange={swiper => {
                  setCurrentSlide(swiper.realIndex);
                }}
              >
                {randomProduct.map(product => (
                  <SwiperSlide key={product.id}>
                    <ProductCard id={product.id} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

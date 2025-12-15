import React, { useContext, useEffect, useRef, useState } from 'react';
import './ItemCard.scss';
import { DevicesContext } from '../../DevicesContext';
import { Device } from '../../types/Device';
import classNames from 'classnames';
import favouritesIcon from '../../images/icons/favourites-heart-like.png';
import favouritesSelected from '../../images/icons/favourites-selected.png';
import homeIcon from '../../images/icons/home-icon.png';
import arrowRight from '../../images/icons/arrow-right.png';
import arrowLeft from '../../images/icons/arrow-left.png';
import { ProductCard } from '../ProductCard/ProductCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// const BASE_URL = import.meta.env.BASE_URL;

export const ItemCard: React.FC = () => {
  const location = useLocation();
  const basePath = location.pathname.split('/').filter(Boolean);
  const [category, productId] = basePath;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [productData, setProductData] = useState<Device | undefined>(undefined);
  const context = useContext(DevicesContext);
  const cardRef = useRef<HTMLDivElement>(null);

  const [itemId, setItemId] = useState<number | undefined>(undefined);
  const techSpecs = [
    'Screen',
    'Resolution',
    'Processor',
    'RAM',
    'Capacity',
    'Camera',
    'Zoom',
    'Cell',
  ];

  const shortTechSpecs = [...techSpecs].slice(0, 4);

  const [similarProducts, setSimilarProducts] = useState<Device[]>([]);

  const [indexForSimilarProducts, setIndexForSimilarProducts] = useState(0);
  const [shiftForYouMayLike, setShiftForYouMayLike] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setShiftForYouMayLike(
        (cardRef.current.offsetWidth + 16) * indexForSimilarProducts,
      );
    }
  }, [indexForSimilarProducts]);

  useEffect(() => {
    if (!context) {
      return;
    }

    const { phones, tablets, accessories, products } = context;
    let deviceList: Device[] = [];

    if (category === 'phones') {
      deviceList = [...phones];
    } else if (category === 'tablets') {
      deviceList = [...tablets];
    } else {
      deviceList = [...accessories];
    }

    const product = deviceList.find(model => model.id === productId);

    setProductData(product);

    if (product) {
      setSimilarProducts(
        deviceList.filter(
          device =>
            device.namespaceId === product.namespaceId &&
            device.id !== product.id,
        ),
      );

      const id = products.find(item => item.itemId === product.id);

      setItemId(id?.id);
    } else {
      setSimilarProducts([]);
      setItemId(undefined);
    }
  }, [context, category, productId]);

  const getCharacteristicName = (characteristic: string) => {
    if (characteristic === 'Capacity') {
      return 'Built in memory';
    }

    return characteristic;
  };

  const getCharacteristicValue = (char: string): string | undefined => {
    const key = char.toLowerCase() as keyof Device;

    if (key === 'ram' || key === 'capacity') {
      return productData?.[key].replace('GB', ' GB');
    }

    if (key === 'cell') {
      return productData?.[key].join(', ');
    }

    return productData?.[key] as string;
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  if (!context) {
    return <div>Loading context...</div>;
  }

  const {
    isMobile,
    cart,
    setCart,
    favourites,
    setFavourites,
    phones,
    tablets,
    accessories,
  } = context;

  const hadleShift = (n: number, sectionName: string) => {
    if (n > 0) {
      if (
        sectionName === 'you may also like' &&
        indexForSimilarProducts < similarProducts.length - 1
      ) {
        setIndexForSimilarProducts(indexForSimilarProducts + 1);
      }
    }

    if (n < 0) {
      if (sectionName === 'you may also like' && indexForSimilarProducts > 0) {
        setIndexForSimilarProducts(indexForSimilarProducts - 1);
      }
    }

    return;
  };

  const handleAddToCart = () => {
    setCart(prev => {
      if (productData.id in prev) {
        const { [productData.id]: _, ...rest } = prev;

        return rest;
      }

      return {
        ...prev,
        [productData.id]: {
          item: productData,
          quantity: 1,
        },
      };
    });
  };

  const handleAddToFavourites = () => {
    setFavourites(prev => {
      if (prev.some(item => item.id === productData.id)) {
        return prev.filter(item => item.id !== productData.id);
      }

      return [...prev, productData];
    });
  };

  const getModelId = (color: string, capacity: string) => {
    let deviceList: Device[] = [];

    if (category === 'phones') {
      deviceList = [...phones];
    } else if (category === 'tablets') {
      deviceList = [...tablets];
    } else {
      deviceList = [...accessories];
    }

    const product = deviceList.find(
      model =>
        model.namespaceId === productData.namespaceId &&
        model.color === color &&
        model.capacity === capacity,
    );

    return product?.id;
  };

  return (
    <div className="item-card">
      <div className="adress">
        <Link to={'/'} className="adress__home-icon">
          <img src={homeIcon} className="adress__home-icon__image" />
        </Link>

        <div className="adress__arrow-right">
          <img src={arrowRight} className="adress__arrow-right__image" />
        </div>

        <Link to={`/${category}`} className="adress__category">
          {category}
        </Link>

        <div className="adress__arrow-right">
          <img src={arrowRight} className="adress__arrow-right__image" />
        </div>

        <div className="adress__product-id">{productId}</div>
      </div>

      <div className="buttons-back">
        <div className="buttons-back__arrow-left">
          <img src={arrowLeft} className="adress__arrow-right__image" />
        </div>

        <div className="buttons-back__button-back" onClick={handleBack}>
          Back
        </div>
      </div>

      <div className="item-card__title">{productData?.name}</div>
      {isMobile ? (
        <div className="item-card-container">
          <div className="item-card__image">
            {productData?.images && productData.images.length > 0 && (
              <img
                src={`../${productData.images[0]}`}
                alt="product image"
                className="item-card__image__photo"
              />
            )}
          </div>

          <div className="item-card__photo-previews">
            {productData.images.map((image, ind) => (
              <div className="item-card__photo-previews__image" key={ind}>
                <img
                  src={`../${image}`}
                  className="item-card__photo-previews__image__photo"
                />
              </div>
            ))}
          </div>

          <div className="tech-specs-container">
            <div className="product-properties">
              <div className="product-properties__colors-id">
                <div className="product-properties__colors">
                  <div className="product-properties__colors__title">
                    Available colors
                  </div>

                  <div className="product-properties__colors__options">
                    {productData?.colorsAvailable.map(color => (
                      <Link
                        to={`/${category}/${getModelId(color, productData.capacity)}`}
                        className={classNames(
                          'product-properties__colors__color-container',
                          { 'colors-activ': color === productData.color },
                        )}
                        key={color}
                      >
                        <div
                          className={`product-properties__colors__options--${color.split(' ').join()}`}
                        ></div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="product-properties__id">{`ID: ${itemId}`}</div>
              </div>

              <div className="product-properties__line"></div>

              <div className="product-properties__capacity">
                <div className="product-properties__capacity__text">
                  Select capacity
                </div>

                <div className="product-properties__capacity__values">
                  {productData?.capacityAvailable.map(date => (
                    <Link
                      to={`/${category}/${getModelId(productData.color, date)}`}
                      className={classNames(
                        'product-properties__capacity__values__value',
                        {
                          active: date === productData.capacity,
                        },
                      )}
                      key={date}
                    >
                      {date.replace('GB', ' GB')}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="product-properties__border"></div>

              <div className="prices-buttons">
                <div className="prices-buttons__prices">
                  <div className="prices-buttons__prices__price-discount">
                    {`$${productData?.priceDiscount}`}
                  </div>

                  <div className="prices-buttons__prices__price-regular">
                    {`$${productData?.priceRegular}`}
                  </div>
                </div>

                <div className="prices-buttons__buttons">
                  <button
                    className={classNames(
                      'prices-buttons__buttons__add-to-cart',
                      {
                        'prices-buttons__buttons__add-to-cart--added':
                          Object.keys(cart).some(id => id === productData.id),
                      },
                    )}
                    onClick={handleAddToCart}
                  >
                    {Object.keys(cart).some(id => id === productData.id)
                      ? 'Added'
                      : 'Add to cart'}
                  </button>

                  <button
                    className="prices-buttons__buttons__add-to-favourites"
                    onClick={handleAddToFavourites}
                  >
                    {favourites?.some(item => item.id === productData.id) ? (
                      <img
                        src={favouritesSelected}
                        alt="heart"
                        className="button-add-to-favourites__image"
                      />
                    ) : (
                      <img
                        src={favouritesIcon}
                        alt="heart"
                        className="button-add-to-favourites__image"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="properties">
                {shortTechSpecs.map(characteristic => (
                  <div className="properties__block" key={characteristic}>
                    <div className="properties__block__text">
                      {characteristic}
                    </div>

                    <div className="properties__block__value">
                      {getCharacteristicValue(characteristic)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="item-card-container">
          <div className="item-card__photo-previews">
            {productData.images.map((image, ind) => (
              <div className="item-card__photo-previews__image" key={ind}>
                <img
                  src={`../${image}`}
                  className="item-card__photo-previews__image__photo"
                />
              </div>
            ))}
          </div>

          <div className="item-card__image">
            {productData?.images && productData.images.length > 0 && (
              <img
                src={`../${productData.images[0]}`}
                alt="product image"
                className="item-card__image__photo"
              />
            )}
          </div>

          <div className="tech-specs-container">
            <div className="product-properties">
              <div className="product-properties__colors-id">
                <div className="product-properties__colors">
                  <div className="product-properties__colors__title">
                    Available colors
                  </div>

                  <div className="product-properties__colors__options">
                    {productData?.colorsAvailable.map(color => (
                      <Link
                        to={`/${category}/${getModelId(color, productData.capacity)}`}
                        className={classNames(
                          'product-properties__colors__color-container',
                          { 'colors-activ': color === productData.color },
                        )}
                        key={color}
                      >
                        <div
                          className={`product-properties__colors__options--${color.split(' ').join()}`}
                        ></div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="product-properties__id">{`ID: ${itemId}`}</div>
              </div>

              <div className="product-properties__line"></div>

              <div className="product-properties__capacity">
                <div className="product-properties__capacity__text">
                  Select capacity
                </div>

                <div className="product-properties__capacity__values">
                  {productData?.capacityAvailable.map(date => (
                    <Link
                      to={`/${category}/${getModelId(productData.color, date)}`}
                      className={classNames(
                        'product-properties__capacity__values__value',
                        {
                          active: date === productData.capacity,
                        },
                      )}
                      key={date}
                    >
                      {date.replace('GB', ' GB')}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="product-properties__border"></div>

              <div className="prices-buttons">
                <div className="prices-buttons__prices">
                  <div className="prices-buttons__prices__price-discount">
                    {`$${productData?.priceDiscount}`}
                  </div>

                  <div className="prices-buttons__prices__price-regular">
                    {`$${productData?.priceRegular}`}
                  </div>
                </div>

                <div className="prices-buttons__buttons">
                  <button
                    className={classNames(
                      'prices-buttons__buttons__add-to-cart',
                      {
                        'prices-buttons__buttons__add-to-cart--added':
                          Object.keys(cart).some(id => id === productData.id),
                      },
                    )}
                    onClick={handleAddToCart}
                  >
                    {Object.keys(cart).some(id => id === productData.id)
                      ? 'Added'
                      : 'Add to cart'}
                  </button>

                  <button
                    className="prices-buttons__buttons__add-to-favourites"
                    onClick={handleAddToFavourites}
                  >
                    {favourites?.some(item => item.id === productData.id) ? (
                      <img
                        src={favouritesSelected}
                        alt="heart"
                        className="button-add-to-favourites__image"
                      />
                    ) : (
                      <img
                        src={favouritesIcon}
                        alt="heart"
                        className="button-add-to-favourites__image"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="properties">
                {shortTechSpecs.map(characteristic => (
                  <div className="properties__block" key={characteristic}>
                    <div className="properties__block__text">
                      {characteristic}
                    </div>

                    <div className="properties__block__value">
                      {getCharacteristicValue(characteristic)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="product-information">
        <div className="about">
          <div className="about__title">About</div>

          {productData?.description.map((info, ind) => (
            <div className="about__info" key={ind}>
              <div className="about__info__title">{info.title}</div>

              <div className="about__info__text">{info.text}</div>
            </div>
          ))}
        </div>

        <div className="tech-specs">
          <div className="tech-specs__title">Tech specs</div>

          <div className="tech-specs__border"></div>

          <div className="tech-specs__list">
            {techSpecs.map(characteristic => (
              <div className="tech-specs__block" key={characteristic}>
                <div className="tech-specs__name">
                  {getCharacteristicName(characteristic)}
                </div>

                <div className="tech-specs__value">
                  {getCharacteristicValue(characteristic)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="you-may-like">
        <div className="you-may-like__title">
          <div className="you-may-like__title-text">You may also like</div>

          <div className="you-may-like__slider-buttons">
            <div className="you-may-like__slider-buttons__button">
              <button
                className="you-may-like__slider-buttons__button__arrow"
                onClick={() => hadleShift(-1, 'you may also like')}
                disabled={indexForSimilarProducts === 0}
              >
                <img src={arrowLeft} className="slider-buttons-image" />
              </button>
            </div>

            <div className="you-may-like__slider-buttons__button">
              <button
                className="you-may-like__slider-buttons__button__arrow"
                onClick={() => hadleShift(1, 'you may also like')}
                disabled={indexForSimilarProducts > similarProducts.length - 2}
              >
                <img src={arrowRight} className="slider-buttons-image" />
              </button>
            </div>
          </div>
        </div>

        <div className="you-may-like__similar-products">
          {similarProducts.map(model => (
            <div
              className="similar-products-content  slider-track"
              ref={cardRef}
              style={{
                transform: `translateX(-${shiftForYouMayLike}px)`,
              }}
              key={model.id}
            >
              <ProductCard model={model} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

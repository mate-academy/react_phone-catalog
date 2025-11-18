import React, { useContext, useEffect, useState } from 'react';
import './ItemCard.scss';
import { DevicesContext } from '../../DevicesContext';
import { Device } from '../../types/Device';
import classNames from 'classnames';
import favourites from '../../images/icons/favourites-heart-like.png';
import homeIcon from '../../images/icons/home-icon.png';
import arrowRight from '../../images/icons/arrow-right.png';
import arrowLeft from '../../images/icons/arrow-left.png';
import { ProductCard } from '../ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';

export const ItemCard: React.FC = () => {
  const location = useLocation();
  const basePath = location.pathname.split('/').filter(Boolean);
  const [category, productId] = basePath;

  const [productData, setProductData] = useState<Device | undefined>(undefined);
  const context = useContext(DevicesContext);

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

  const { isMobile } = context;

  return (
    <div className="item-card">
      <div className="adress">
        <div className="adress__home-icon">
          <img src={homeIcon} className="address__home-icon__image" />
        </div>

        <div className="adress__arrow-right">
          <img
            src={arrowRight}
            className="phones__address__arrow-right-icon__image"
          />
        </div>

        <div className="adress__category">{category}</div>

        <div className="adress__arrow-right">
          <img
            src={arrowRight}
            className="phones__address__arrow-right-icon__image"
          />
        </div>

        <div className="adress__product-id">{productId}</div>
      </div>

      <div className="buttons-back">
        <div className="buttons-back__arrow-left">
          <img
            src={arrowLeft}
            className="phones__address__arrow-right-icon__image"
          />
        </div>

        <div className="buttons-back__button-back">Back</div>
      </div>

      <div className="item-card__title">{productData?.name}</div>
      {isMobile ? (
        <div className="item-card-container">
          <div className="item-card__image">
            {productData?.images && productData.images.length > 0 && (
              <img
                src={
                  productData.images[0].startsWith('/')
                    ? productData.images[0]
                    : `/${productData.images[0]}`
                }
                alt="product image"
                className="item-card__image__photo"
              />
            )}
          </div>

          <div className="item-card__photo-previews">
            {productData.images.map((image, ind) => (
              <div className="item-card__photo-previews__image" key={ind}>
                <img
                  src={image.startsWith('/') ? image : `/${image}`}
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
                      <div
                        className={classNames(
                          'product-properties__colors__color-container',
                          { 'colors-activ': color === productData.color },
                        )}
                        key={color}
                      >
                        <div
                          className={`product-properties__colors__options--${color.split(' ').join()}`}
                        ></div>
                      </div>
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
                    <div
                      className={classNames(
                        'product-properties__capacity__values__value',
                        {
                          active: date === productData.capacity,
                        },
                      )}
                      key={date}
                    >
                      {date.replace('GB', ' GB')}
                    </div>
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
                  <div className="prices-buttons__buttons__add-to-cart">
                    Add to cart
                  </div>

                  <div className="prices-buttons__buttons__add-to-favourites">
                    <img
                      src={favourites}
                      alt="heart"
                      className="button-add-to-favourites__image"
                    />
                  </div>
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
                  src={image.startsWith('/') ? image : `/${image}`}
                  className="item-card__photo-previews__image__photo"
                />
              </div>
            ))}
          </div>

          <div className="item-card__image">
            {productData?.images && productData.images.length > 0 && (
              <img
                src={
                  productData.images[0].startsWith('/')
                    ? productData.images[0]
                    : `/${productData.images[0]}`
                }
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
                      <div
                        className={classNames(
                          'product-properties__colors__color-container',
                          { 'colors-activ': color === productData.color },
                        )}
                        key={color}
                      >
                        <div
                          className={`product-properties__colors__options--${color.split(' ').join()}`}
                        ></div>
                      </div>
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
                    <div
                      className={classNames(
                        'product-properties__capacity__values__value',
                        {
                          active: date === productData.capacity,
                        },
                      )}
                      key={date}
                    >
                      {date.replace('GB', ' GB')}
                    </div>
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
                  <div className="prices-buttons__buttons__add-to-cart">
                    Add to cart
                  </div>

                  <div className="prices-buttons__buttons__add-to-favourites">
                    <img
                      src={favourites}
                      alt="heart"
                      className="button-add-to-favourites__image"
                    />
                  </div>
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
              <div className="you-may-like__slider-buttons__button__arrow">
                <img src={arrowLeft} className="slider-buttons-image" />
              </div>
            </div>

            <div className="you-may-like__slider-buttons__button">
              <div className="you-may-like__slider-buttons__button__arrow">
                <img src={arrowRight} className="slider-buttons-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="you-may-like__similar-products">
          {similarProducts.map(model => (
            <ProductCard model={model} key={model.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from 'react-slick';

import { useWindowSizes } from '../../hooks/use--windowSize';

import { Context } from '../context';

import { getProductInfo } from '../../api/api';

import { ButtonBack } from '../Blocs';
import { ProductInfoType } from '../../types/ProductInfoType';
import { ButtonAddToCart } from '../Blocs/button_add_to_cart';
import { ButtonAddToFavorite } from '../Blocs/button_add_to_favorite';
import { Card } from '../Card';
import { Location } from '../Location';

export const ProductInfo: React.FC = () => {
  const colorsProduct = ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'];
  const [selectedColor, setselectedColor] = useState('#FCDBC1');

  const capacityProduct = ['64', '256', '512'];
  const [selectedCapacity, setselectedCapacity] = useState('64');

  const { activeProduct, products, setActiveProduct } = useContext(Context);
  const [productInfo, setProductInfo] = useState<ProductInfoType>();

  const [windowWidth] = useWindowSizes();

  const [swipeSlider, setSwipeSlider] = useState(0);
  const [selectedSlide, setselectedSlide] = useState(0);

  const { selektedProduct } = useParams();

  const lengthImageArray = productInfo?.images.length;

  useEffect(() => {
    if (selektedProduct) {
      getProductInfo(selektedProduct)
        .then((productItem) => {
          setProductInfo(productItem);
        });
    }
  }, [selektedProduct]);

  useEffect(() => {
    if (!activeProduct) {
      setActiveProduct(products
        .find(productItem => productItem.id === productInfo?.id));
    }
  }, [products]);

  const activeproduct = products
    .find(productItem => productItem.id === activeProduct?.id);

  const getProductPrices = useCallback(
    () => {
      let price;
      let discount;

      if (activeproduct) {
        price = activeproduct.price;
        discount = price - (price / 100) * (activeproduct.discount);
      }

      return { price, discount };
    },
    [activeproduct],
  );

  const getSuggestedProducts = useCallback(
    () => products.filter(productItem => {
      return productItem.type === activeProduct?.type
      && productInfo?.id !== productItem.id;
    }),
    [products, productInfo, activeProduct],
  );

  const sliderAdaptiveWidth = windowWidth > 1100;

  const sliderAlsoLike = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,

    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    productInfo ? (
      <main className="product">
        <Location />
        <ButtonBack />
        <h1 className="product__title">{productInfo?.name}</h1>

        <div className="product__description grid">
          <div className="product__slider grid_item_column--1-13">
            <div className="product__slider__list">
              <button
                type="button"
                className={classNames(
                  'button',
                  { none: !!lengthImageArray && (lengthImageArray < 4) },
                )}
                aria-label="Top"
                style={{
                  transform: sliderAdaptiveWidth
                    ? 'rotate(0deg)'
                    : 'rotate(270deg)',
                  margin: sliderAdaptiveWidth ? '0 0 10px 0' : '0 10px 0 0',
                }}
                onClick={() => {
                  if (swipeSlider < 0) {
                    setSwipeSlider(prev => prev + 96);
                  }
                }}
              />
              <div className="product__slider__list-track">
                <div
                  className="product__slider__list-track-wrapper"
                  style={{ transform: sliderAdaptiveWidth ? `translateY(${swipeSlider}px)` : `translateX(${swipeSlider}px)` }}
                >
                  {productInfo?.images.map(img => {
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          setselectedSlide(productInfo?.images.indexOf(img));
                        }}
                        key={img}
                      >
                        <img
                          src={img}
                          alt="123"
                          className={classNames(
                            'product__slider__list__item',
                            {
                              'product__slider__list__item--active':
                              selectedSlide === productInfo?.images
                                .indexOf(img),
                            },
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                type="button"
                className={classNames(
                  'button',
                  { none: !!lengthImageArray && (lengthImageArray < 4) },
                )}
                aria-label="Bot"
                style={{
                  transform: sliderAdaptiveWidth
                    ? 'rotate(180deg)'
                    : 'rotate(90deg)',
                  margin: sliderAdaptiveWidth ? '10px 0 0 0' : '0 0 10px 0',
                }}
                onClick={() => {
                  if (lengthImageArray
                    && (swipeSlider > (lengthImageArray - 4) * (-96))
                  ) {
                    setSwipeSlider(prev => prev - 96);
                  }
                }}
              />
            </div>
            <button
              type="button"
              className={classNames(
                'button',
                'product__slider__button',
                { 'slick-disabled': selectedSlide === 0 },
              )}
              disabled={selectedSlide === 0}
              aria-label="Prew"
              style={{ margin: '0 0 10px 0', transform: 'rotate(-90deg)' }}
              onClick={() => {
                setselectedSlide(prevSlide => prevSlide - 1);
              }}
            />
            <img
              src={productInfo?.images[selectedSlide]}
              alt="123"
              className="product__slider__main_slide"
            />
            <button
              type="button"
              className={classNames(
                'button',
                'product__slider__button',
                {
                  'slick-disabled': selectedSlide === productInfo?.images
                    .length - 1,
                },
              )}
              disabled={selectedSlide === productInfo?.images.length - 1}
              aria-label="Prew"
              style={{ margin: '0 0 10px 0', transform: 'rotate(90deg)' }}
              onClick={() => {
                setselectedSlide(prevSlide => prevSlide + 1);
              }}
            />

          </div>
          <div className="product__id grid_item_column--21-25">
            {`#${productInfo?.id}`}
          </div>
          <div className="
            product__characteristics
            grid_item_column--14-21
            grid_item_rows--1-2
          "
          >
            <h5 className="product__characteristics__title">
              Available colors
            </h5>
            <div className="product__characteristics__colors">
              {colorsProduct.map((color) => {
                return (
                  <button
                    type="button"
                    className={classNames(
                      'product__characteristics__color',
                      {
                        'product__characteristics__color--selected':
                        color === selectedColor,
                      },
                    )}
                    style={{ background: color }}
                    aria-label="color"
                    onClick={() => {
                      setselectedColor(color);
                    }}
                    key={color}
                  />
                );
              })}
            </div>

            <div className="line" />

            <h5 className="product__characteristics__title">
              Select capacity
            </h5>
            <div className="product__characteristics__capacitys">
              {capacityProduct.map(capacity => (
                <button
                  type="button"
                  className={classNames(
                    'product__characteristics__capacity',
                    {
                      'product__characteristics__capacity--active':
                    capacity === selectedCapacity,
                    },
                  )}
                  onClick={() => {
                    setselectedCapacity(capacity);
                  }}
                  key={capacity}

                >
                  {`${capacity}GB`}
                </button>
              ))}
            </div>

            <div className="line" />

            <div className="product__characteristics__prices">
              {(activeproduct?.discount)
                ? (
                  <>
                    <h1 className="product__characteristics__mainPrice">
                      $
                      {getProductPrices().discount}
                    </h1>
                    <h2 className="product__characteristics__secondPrice">
                      $
                      {getProductPrices().price}
                    </h2>
                  </>
                ) : (
                  <h1 className="product__characteristics__mainPrice">
                    $
                    {getProductPrices().discount}
                  </h1>
                )}
            </div>

            <div className="product__characteristics__buttons">
              <ButtonAddToCart product={activeProduct} />

              <ButtonAddToFavorite product={activeProduct} />
            </div>

            <div className="product__characteristics__info">
              <p className="product__characteristics__info__name">Screen</p>
              <p className="product__characteristics__info__param">
                {productInfo.display.screenSize}
              </p>
              <p className="product__characteristics__info__name">Resolution</p>
              <p className="product__characteristics__info__param">
                {productInfo.display.screenResolution}
              </p>
              <p className="product__characteristics__info__name">Processor</p>
              <p className="product__characteristics__info__param">
                {productInfo.hardware.cpu}
              </p>
              <p className="product__characteristics__info__name">RAM</p>
              <p className="product__characteristics__info__param">
                {productInfo.storage.ram}
              </p>
            </div>
          </div>

          <div className="product__description__about grid_item_column--1-13">
            <h2 className="product__description__title">About</h2>
            <div className="line" />

            <h2 className="product__description__about__subtitle">
              Description
            </h2>
            <p className="product__description__text">
              {productInfo?.description}
            </p>

          </div>
          <div className="
          product__description__Tech_specs
          grid_item_column--14-25
          "
          >
            <h2 className="product__description__title">Tech specs</h2>
            <div className="line" />

            <div className="product__description__Tech_specs__info">
              <div className="product__description__Tech_specs__wrapper">
                <p className="product__description__Tech_specs__text">
                  Screen
                </p>
                <p className="product__description__Tech_specs__characteristic">
                  {productInfo?.display.screenSize}
                </p>
              </div>

              <div className="product__description__Tech_specs__wrapper">
                <p className="product__description__Tech_specs__text">
                  Resolution
                </p>
                <p className="product__description__Tech_specs__characteristic">
                  {productInfo?.display.screenResolution}
                </p>
              </div>

              <div className="product__description__Tech_specs__wrapper">
                <p className="product__description__Tech_specs__text">
                  Processor
                </p>
                <p className="product__description__Tech_specs__characteristic">
                  {productInfo?.hardware.cpu}
                </p>
              </div>

              <div className="product__description__Tech_specs__wrapper">
                <p className="product__description__Tech_specs__text">
                  RAM
                </p>
                <p className="product__description__Tech_specs__characteristic">
                  {productInfo?.storage.ram}
                </p>
              </div>

              <div className="product__description__Tech_specs__wrapper">
                <p className="product__description__Tech_specs__text">
                  Built in memory
                </p>
                <p className="product__description__Tech_specs__characteristic">
                  {productInfo?.storage.flash}
                </p>
              </div>

              <div className="product__description__Tech_specs__wrapper">
                <p className="product__description__Tech_specs__text">
                  Camera
                </p>
                <p className="product__description__Tech_specs__characteristic">
                  {productInfo?.camera.primary}
                </p>
              </div>

              <div className="product__description__Tech_specs__wrapper">
                <p className="product__description__Tech_specs__text">
                  Cell
                </p>
                <p className="product__description__Tech_specs__characteristic">
                  {productInfo?.connectivity.cell}
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="product__slider_also_like slider-cards grid">
          <h1 className="
          title
          grid_item_column--1-20
          grid_item_rows--1-2
          "
          >
            You may also like
          </h1>
          <div className="grid_item_column--1-25 grid_item_rows--2-3">
            <Slider {...sliderAlsoLike}>
              {getSuggestedProducts().map(productItem => {
                return (
                  <div key={productItem.id}>
                    <Card product={productItem} />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </main>
    ) : (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  );
};

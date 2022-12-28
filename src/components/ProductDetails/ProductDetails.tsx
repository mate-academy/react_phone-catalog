import {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from '../Context';
import { ProductCardButton } from '../ProductCardButton';
import { Icon } from '../Icon';
import { getProductDetails } from '../../api/products';
import { useWindowSize } from '../../utils/useWindowSize';
import { ProductDetailsType } from '../../types/ProductDetails';
import { SliderButtonType } from '../../types/SliderType';
import { IconType } from '../../types/Icon';
import { Error } from '../../types/Error';
import './ProductDetails.scss';

export const ProductDetails: React.FC = () => {
  const {
    products,
    selectedProduct,
    error,
    setError,
    setIsLoading,
  } = useContext(Context);

  const { productId = '' } = useParams();
  const { width } = useWindowSize();

  const capacityList = [16, 256, 512];
  const colourList = ['pink', 'grey', 'black', 'white'];

  const defaultProductOptions = {
    Screen: '',
    Resolution: '',
    Processor: '',
    RAM: '',
    'Built in memory': '',
    Android: '',
    Bluetooth: '',
    Battery: '',
  };

  const defaultImage = selectedProduct
    ? selectedProduct.images[0]
    : '';

  const defaultImagesLength = selectedProduct
    ? selectedProduct.images.length
    : 0;

  const [productInfo, setProductInfo] = useState<ProductDetailsType>();
  const [productOptions, setProductOptions] = useState(defaultProductOptions);
  const [selectedCapacity, setSelectedCapacity] = useState(capacityList[0]);
  const [selectedColour, setSelectedColour] = useState(colourList[0]);
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [itemsInSlider, setItemsInSlider] = useState(2);
  const [position, setPosition] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const productItem = products.find(
    item => item.id === productInfo?.id,
  ) || null;

  const optionsMainList = Object.entries(productOptions).slice(0, 4);
  const optionsTotalList = Object.entries(productOptions);

  const getDiscountPrice = (
    price: number,
    discount: number,
  ) => price - (price / 100) * discount;

  const getProductInfo = async (valueId: string) => {
    setError(null);

    try {
      const item = await getProductDetails(valueId);

      setProductInfo(item);
    } catch {
      setError(Error.GET_PRODUCT_DETAILS);
    } finally {
      setIsLoading(false);
    }
  };

  const sliderSettings = {
    step: 1,
    itemHeight: 97,
    itemsOnPage: itemsInSlider,
    animationDuration: 500,
    infinite: false,
  };

  const {
    step,
    itemHeight,
    itemsOnPage,
    animationDuration,
    infinite,
  } = sliderSettings;

  const disablePrevButton = (position <= 0) && !infinite;
  const disableNextButton = (
    position >= defaultImagesLength - itemsOnPage)
      && !infinite;

  const slideLimit = -((defaultImagesLength * itemHeight)
    - (itemHeight * itemsOnPage));

  const transformOptions = (position * itemHeight) >= slideLimit
    ? (position * itemHeight)
    : slideLimit;

  const handleClickButton = (arrowDirection: SliderButtonType) => {
    if (arrowDirection === 'prev') {
      if (position - step >= 0) {
        setPosition(position - step);
      } else {
        setPosition(defaultImagesLength + 1 - itemsOnPage - step);
      }
    }

    if (arrowDirection === 'next') {
      if ((position + step) < defaultImagesLength + 1 - itemsOnPage) {
        setPosition(position + step);
      } else {
        setPosition(0);
      }
    }
  };

  const sliderHeight = () => {
    if (width > 640) {
      if (defaultImagesLength < 4) {
        setItemsInSlider(defaultImagesLength);
      } else {
        setItemsInSlider(4);
      }
    }

    if (width < 640) {
      if (defaultImagesLength < 2) {
        setItemsInSlider(defaultImagesLength);
      } else {
        setItemsInSlider(2);
      }
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchDown = event.touches[0].clientY || null;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = event.touches[0].clientY;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      handleClickButton('next');
    }

    if (diff < -5) {
      handleClickButton('prev');
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    sliderHeight();
  }, [width]);

  useEffect(() => {
    setPosition(0);
  }, []);

  useEffect(() => {
    if (selectedProduct && productId.length > 0) {
      getProductInfo(productId);

      setProductOptions({
        Screen: selectedProduct.display.screenSize,
        Resolution: selectedProduct.display.screenResolution,
        Processor: selectedProduct.hardware.cpu,
        RAM: selectedProduct.storage.ram,
        'Built in memory': selectedProduct.storage.flash,
        Android: selectedProduct.android.os,
        Bluetooth: selectedProduct.connectivity.bluetooth,
        Battery: selectedProduct.battery.standbyTime,
      });
    }
  }, [productId]);

  useEffect(() => {
    if (!selectedProduct && productItem) {
      getProductInfo(productItem.id);
    }
  }, [productId]);

  return (
    <>
      {selectedProduct
        && productItem
        && !error
        && (
          <section
            className="
              page__section
              product-details
              grid__item--tablet-1-12
              grid__item--desktop-1-24"
          >
            <h1
              className="
                page__section-title
                section__title
                product-details__title"
            >
              {productInfo?.name}
            </h1>

            <div
              className="
                product-details__main-details
                main-details"
            >
              <div className="grid grid--desktop">
                <div
                  className="
                    main-details__product-id
                    grid__item--tablet-11-12
                    grid__item--desktop-23-24"
                >
                  ID: 890246
                </div>

                <div
                  className="
                    main-details__product-images
                    product-images
                    grid__item--tablet-1-6
                    grid__item--desktop-1-12"
                >
                  <div
                    className="
                      product-images__sidebar
                      images-sidebar"
                  >
                    <button
                      className="
                        images-sidebar__button
                        images-sidebar__button--prev"
                      type="button"
                      aria-label="PREV"
                      disabled={disablePrevButton}
                      onClick={() => handleClickButton('prev')}
                    >
                      {!disablePrevButton
                        && (
                          <Icon
                            type={IconType.ARROW_UP}
                            addClassName="images-sidebar__button--icon"
                          />
                        )}

                      {disablePrevButton
                        && (
                          <Icon
                            type={IconType.ARROW_UP_DISABLED}
                            addClassName="images-sidebar__button--icon"
                          />
                        )}
                    </button>

                    <div
                      className="small-images"
                      style={{
                        height: `${itemHeight * itemsOnPage}px`,
                        touchAction: 'none',
                      }}
                      onTouchStart={event => handleTouchStart(event)}
                      onTouchMove={event => handleTouchMove(event)}
                    >
                      <div
                        className="
                          product-images__small-images
                          images-sidebar__images
                          small-images__container"
                        style={{
                          transform: `translateY(-${transformOptions}px)`,
                          transition: `${animationDuration}ms`,
                        }}
                      >
                        {selectedProduct.images.map(
                          (imageItem, imageIndex) => (
                            <div
                              key={imageItem}
                              role="button"
                              className={classNames(
                                'small-images__image',
                                {
                                  'small-images__image--is-active':
                                  selectedImage === imageItem,
                                },
                              )}
                              tabIndex={imageIndex}
                              onClick={() => setSelectedImage(imageItem)}
                              onKeyDown={() => setSelectedImage(imageItem)}
                            >
                              <img
                                src={imageItem}
                                alt="smallImage"
                                className="additional-image"
                              />
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <button
                      className="
                        images-sidebar__button
                        images-sidebar__button--next"
                      type="button"
                      aria-label="NEXT"
                      disabled={disableNextButton}
                      onClick={() => handleClickButton('next')}
                    >
                      {!disableNextButton
                        && (
                          <Icon
                            type={IconType.ARROW_DOWN}
                            addClassName="images-sidebar__button--icon"
                          />
                        )}

                      {disableNextButton
                        && (
                          <Icon
                            type={IconType.ARROW_DOWN_DISABLED}
                            addClassName="images-sidebar__button--icon"
                          />
                        )}
                    </button>
                  </div>

                  <div className="product-images__main-image">
                    <img
                      src={selectedImage}
                      alt="mainImage"
                      className="main-image"
                    />
                  </div>
                </div>

                <div
                  className="
                    main-details__options
                    options
                    grid__item--tablet-8-11
                    grid__item--desktop-14-20"
                >
                  <div
                    className="
                      options__colors colors
                      grid__item--tablet-8-11
                      grid__item--desktop-14-22"
                  >
                    <h2 className="options__subtitle">
                      Available colors
                    </h2>

                    <ul className="colors__list">
                      {colourList.map((colourItem, colourIndex) => (
                        <div
                          key={colourItem}
                          role="button"
                          className={classNames(
                            'colors__item-circle',
                            {
                              'colors__item-circle--is-active':
                                selectedColour === colourItem,
                            },
                          )}
                          tabIndex={colourIndex}
                          onClick={() => setSelectedColour(colourItem)}
                          onKeyDown={() => setSelectedColour(colourItem)}
                        >
                          <li
                            className={classNames(
                              'colors__item',
                              `colors__item--${colourItem}`,
                            )}
                          />
                        </div>
                      ))}
                    </ul>
                  </div>

                  <div className="options__capacity capacity">
                    <h2 className="options__subtitle">
                      Select capacity
                    </h2>

                    <div className="capacity__list">
                      {capacityList.map(capacityItem => (
                        <button
                          key={capacityItem}
                          type="button"
                          className={classNames(
                            'capacity__item',
                            {
                              'capacity__item--is-active':
                                selectedCapacity === capacityItem,
                            },
                          )}
                          onClick={() => setSelectedCapacity(capacityItem)}
                        >
                          {`${capacityItem} GB`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="options__price prices">
                    <div className="prices__container">
                      <div className="prices__new-price">
                        {productItem?.discount > 0
                          ? `$${getDiscountPrice(
                            productItem?.price,
                            productItem?.discount,
                          )}`
                          : `$${productItem?.price}`}
                      </div>

                      {productItem?.discount > 0
                        && (
                          <div className="prices__old-price">
                            {`$${productItem?.price}`}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="options__buttons card-buttons">
                    <ProductCardButton
                      product={productItem}
                      type="cart"
                      size="big"
                    />

                    <ProductCardButton
                      product={productItem}
                      type="favorite"
                      size="big"
                    />
                  </div>

                  <div className="options__detail-options">
                    <ul className="detail-options__list">
                      {optionsMainList.map(item => (
                        <li
                          key={item[0]}
                          className="detail-options__item"
                        >
                          <div className="detail-options__item--title">
                            {item[0]}
                          </div>

                          <div className="detail-options__item--value">
                            {item[1] || 'N/A'}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="
                product-details__additional-details
                additional-details"
            >
              <div
                className="
                  grid
                  grid--desktop"
                data-cy="productDescription"
              >
                <div
                  className="
                    additional-details__about
                    grid__item--tablet-1-6
                    grid__item--desktop-1-12"
                >
                  <h1 className="additional-details__title">
                    About
                  </h1>

                  <div className="additional-details__text">
                    {selectedProduct.description}
                  </div>
                </div>

                <div
                  className="
                    additional-details__specs
                    grid__item--tablet-8-12
                    grid__item--desktop-14-24"
                >
                  <h1 className="additional-details__title">
                    Tech specs
                  </h1>

                  <div className="additional-details__options">
                    <ul className="detail-options__list">
                      {optionsTotalList.map(item => (
                        <li
                          key={item[0]}
                          className="detail-options__item"
                        >
                          <div
                            className="
                                detail-options__item--title
                                detail-options__item--title--big"
                          >
                            {item[0]}
                          </div>

                          <div
                            className="
                                detail-options__item--value
                                detail-options__item--value--big"
                          >
                            {item[1] || 'N/A'}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
    </>
  );
};

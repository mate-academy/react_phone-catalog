import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Context } from '../Context';
import { ProductCard } from '../ProductCard';
import { Icon } from '../Icon';
import { ErrorNotification } from '../ErrorNotification';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getSuggestedProducts,
} from '../../helpers/getProductsBy';
import productCategoryList from '../../api/productCategory.json';
import { useWindowSize } from '../../utils/useWindowSize';
import {
  SliderButtonType,
  SliderType,
} from '../../types/SliderType';
import { IconType } from '../../types/Icon';
import './ProductsSlider.scss';

type Props = {
  type: SliderType,
};

export const ProductsSlider: React.FC<Props> = ({ type }) => {
  const { products, error } = useContext(Context);

  const { productId = '' } = useParams();
  const location = useLocation();
  const { width } = useWindowSize();

  const [position, setPosition] = useState(0);
  const [itemsInSlider, setItemsInSlider] = useState(4);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const currentCategory = location.pathname.split('/').slice(1)[0];

  const productCategory = useMemo(() => {
    if (!currentCategory.length) {
      return 'home';
    }

    const category = productCategoryList.filter(
      item => item.type === currentCategory,
    )[0];

    return category
      ? category.itemType
      : 'phone';
  }, [location]);

  const sliderTitle = useMemo(() => {
    switch (type) {
      case 'hot-prices':
        return 'Hot prices';

      case 'new-models':
        return 'Brand new models';

      case 'recommendations':
        return 'You may also like';

      default:
        return '';
    }
  }, [type]);

  const sliderProductList = useMemo(() => {
    switch (type) {
      case 'hot-prices':
        return getHotPriceProducts(products);

      case 'new-models':
        return getBrandNewProducts(products);

      default:
      case 'recommendations':
        return getSuggestedProducts(products, productCategory, productId);
    }
  }, [type, productId]);

  const sliderSettings = {
    step: 1,
    itemWidth: 288,
    itemsOnPage: itemsInSlider,
    animationDuration: 500,
    infinite: false,
  };

  const {
    step,
    itemWidth,
    itemsOnPage,
    animationDuration,
    infinite,
  } = sliderSettings;

  const disablePrevButton = (position <= 0) && !infinite;
  const disableNextButton = (position >= sliderProductList.length - itemsOnPage)
    && !infinite;

  const slideLimit = -((sliderProductList.length * itemWidth)
    - (itemWidth * itemsOnPage));

  const transformOptions = (position * itemWidth) >= slideLimit
    ? (position * itemWidth)
    : slideLimit;

  const handleClickButton = (arrowDirection: SliderButtonType) => {
    if (arrowDirection === 'prev') {
      if (position - step >= 0) {
        setPosition(position - step);
      } else {
        setPosition(sliderProductList.length + 1 - itemsOnPage - step);
      }
    }

    if (arrowDirection === 'next') {
      if ((position + step) < sliderProductList.length + 1 - itemsOnPage) {
        setPosition(position + step);
      } else {
        setPosition(0);
      }
    }
  };

  const scrollSlider = () => {
    if ((position < sliderProductList.length - itemsOnPage)) {
      setPosition(position + 1);
    }

    if ((position === sliderProductList.length - itemsOnPage)) {
      setPosition(0);
    }
  };

  const sliderWidth = () => {
    if (width > 1175) {
      if (sliderProductList.length < 4) {
        setItemsInSlider(sliderProductList.length);
      } else {
        setItemsInSlider(4);
      }
    }

    if (width > 887 && width < 1176) {
      if (sliderProductList.length < 3) {
        setItemsInSlider(sliderProductList.length);
      } else {
        setItemsInSlider(3);
      }
    }

    if (width > 599 && width < 888) {
      if (sliderProductList.length < 2) {
        setItemsInSlider(sliderProductList.length);
      } else {
        setItemsInSlider(2);
      }
    }

    if (width < 599) {
      setItemsInSlider(1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchDown = event.touches[0].clientX || null;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = event.touches[0].clientX;
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
    sliderWidth();
  }, [width]);

  useEffect(() => {
    setPosition(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollSlider();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [position]);

  return (
    <section
      className="
        page__section
        product-slider
        grid__item--tablet-1-12
        grid__item--desktop-1-24"
    >
      <div className="product-slider__header">
        <h1
          className="
            page__section-title
            product-slider__title"
        >
          {sliderTitle}
        </h1>

        <div
          className="
            product-slider__buttons
            grid__item--tablet-10-12
            grid__item--desktop-21-24"
        >
          <button
            className="
              product-slider__button
              grid__item--tablet-10-11
              grid__item--desktop-21-22"
            type="button"
            aria-label="PREV"
            disabled={disablePrevButton}
            onClick={() => handleClickButton('prev')}
          >
            {!disablePrevButton
              && (
                <Icon
                  type={IconType.ARROW_LEFT}
                />
              )}

            {disablePrevButton
              && (
                <Icon
                  type={IconType.ARROW_LEFT_DISABLED}
                />
              )}
          </button>

          <button
            className="
              product-slider__button
              grid__item--tablet-11-12
              grid__item--desktop-23-24"
            type="button"
            aria-label="NEXT"
            disabled={disableNextButton}
            onClick={() => handleClickButton('next')}
          >
            {!disableNextButton
              && (
                <Icon
                  type={IconType.ARROW_RIGHT}
                />
              )}

            {disableNextButton
              && (
                <Icon
                  type={IconType.ARROW_RIGHT_DISABLED}
                />
              )}
          </button>
        </div>
      </div>

      {!error && (
        <div
          className="
            product-slider__body
            grid__item--tablet-1-12
            grid__item--desktop-1-24"
          style={{
            maxWidth: `${itemsOnPage * itemWidth}px`,
          }}
          onTouchStart={event => handleTouchStart(event)}
          onTouchMove={event => handleTouchMove(event)}
        >
          <div
            className="product-slider__container"
            data-cy="cardsContainer"
            style={{
              transform: `translateX(-${transformOptions}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {sliderProductList.map(productItem => (
              <ProductCard
                key={productItem.id}
                product={productItem}
              />
            ))}
          </div>
        </div>
      )}

      {error && (
        <ErrorNotification
          error={error}
        />
      )}
    </section>
  );
};

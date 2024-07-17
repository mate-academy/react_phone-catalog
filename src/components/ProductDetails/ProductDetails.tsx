import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductSpecs } from '../../types/ProductSpecs';
import { Product } from '../../types/Product';
import { CartContext, DispatchCartContext } from '../../store/CartContext';
import { TouchSlider } from '../TouchSlider';
import {
  DispatchLikedContext,
  LikedContext,
} from '../../store/FavouritesContext';
import { DEVICE_COLORS } from '../../constants';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

type Props = {
  productDetails: ProductSpecs;
  product: Product;
};

export const ProductDetails: React.FC<Props> = ({
  productDetails,
  product,
}) => {
  const {
    id,
    name,
    images,
    colorsAvailable,
    color,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    description,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = productDetails;

  const { t } = useTranslation();

  const [displayedImageIndex, setDisplayedImageIndex] = useState<number>(0);

  const cartState = useContext(CartContext);
  const dispatchCart = useContext(DispatchCartContext);
  const favouritesState = useContext(LikedContext);
  const dispatchFavourites = useContext(DispatchLikedContext);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [product, productDetails]);

  const isItemInCart = !!cartState.find(item => item.itemId === id);
  const isItemLiked = !!favouritesState.find(item => item.itemId === id);

  const handleAddToCart = (item: Product) => {
    if (!isItemInCart) {
      dispatchCart({ type: 'add', payload: item });
    } else {
      dispatchCart({ type: 'deleteProduct', payload: id });
    }
  };

  const ariaLabelCartBtn = isItemInCart
    ? t(TRANSLATIONS.productCard.button.cart.ariaLabel.rm, { name })
    : t(TRANSLATIONS.productCard.button.cart.ariaLabel.add, { name });

  const ariaLabelFavBtn = isItemLiked
    ? t(TRANSLATIONS.productCard.button.fav.ariaLabel.rm, { name })
    : t(TRANSLATIONS.productCard.button.fav.ariaLabel.add, { name });

  return (
    <section className="details">
      <h2 className="details__title">{name}</h2>
      <div className="details__content">
        <ul className="details__images-list">
          {images.map((img, index) => {
            return (
              <li
                key={img}
                style={{
                  backgroundImage: `url(${img})`,
                }}
                className={classNames('details__images-item', {
                  'details__images-item--active': index === displayedImageIndex,
                })}
              >
                <button
                  type="button"
                  className="btn btn--image-preview"
                  onClick={() => setDisplayedImageIndex(index)}
                ></button>
              </li>
            );
          })}
        </ul>

        <div className="details__slider">
          <TouchSlider
            imageUrls={images}
            order={displayedImageIndex}
            setOrder={setDisplayedImageIndex}
          />
        </div>

        <div className="details__controls">
          <div className="details__selectors">
            <p className="details__selectors-title">
              {t(TRANSLATIONS.productDetails.colors)}
            </p>
            <div className="details__selectors-options">
              {colorsAvailable.map(item => {
                const bgColor = {
                  backgroundColor:
                    DEVICE_COLORS[item as keyof typeof DEVICE_COLORS],
                };

                const desiredColorInTheLink = item.replace(/\s/, '-');
                const currentColorInTheLink = color.replace(/\s/, '-');

                return (
                  <div
                    key={item}
                    className={classNames('details__color', {
                      'details__color--active': item === color,
                    })}
                  >
                    <Link
                      to={`../${id.replace(currentColorInTheLink, desiredColorInTheLink)}`}
                      replace
                      className="btn btn--color"
                      style={bgColor}
                    ></Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="divider"></div>

          <div className="details__selectors">
            <p className="details__selectors-title">
              {t(TRANSLATIONS.productDetails.capacity)}
            </p>
            <div className="details__selectors-options">
              {capacityAvailable.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={`../${id.replace(capacity.toLowerCase(), item.toLowerCase())}`}
                    replace
                    className={classNames('btn--capacity', {
                      'btn--capacity--active': capacity === item,
                    })}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="divider"></div>

          <div>
            <div className="price-block">
              <h2 className="price-block__current">
                <span className="visually-hidden">
                  {t(TRANSLATIONS.productDetails.price.current)}
                </span>
                {priceDiscount}
              </h2>
              <p className="price-block__full-price">
                <span className="visually-hidden">
                  {t(TRANSLATIONS.productDetails.price.full)}
                </span>
                {priceRegular}
              </p>
            </div>

            <div className="details__actions">
              <button
                type="button"
                className={classNames('btn', {
                  'btn--selected': isItemInCart,
                  'btn--primary': !isItemInCart,
                })}
                onClick={() => handleAddToCart(product)}
                aria-label={ariaLabelCartBtn}
              >
                {isItemInCart
                  ? t(TRANSLATIONS.productCard.button.cart.text.added)
                  : t(TRANSLATIONS.productCard.button.cart.text.add)}
              </button>
              <button
                type="button"
                className={classNames('btn btn--square-lg', {
                  'btn--liked': isItemLiked,
                })}
                onClick={() =>
                  dispatchFavourites({ type: 'toggle', payload: product })
                }
                aria-label={ariaLabelFavBtn}
              >
                <span
                  className={classNames('icon', {
                    'icon--heart-stroke': !isItemLiked,
                    'icon--heart-filled': isItemLiked,
                  })}
                ></span>
              </button>
            </div>
          </div>

          <ul className="specifications-list">
            <li className="specifications-list__item--sm">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.screen)}
              </p>
              <p>{screen}</p>
            </li>

            <li className="specifications-list__item--sm">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.resolution)}
              </p>
              <p>{resolution}</p>
            </li>

            <li className="specifications-list__item--sm">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.processor)}
              </p>
              <p>{processor}</p>
            </li>

            <li className="specifications-list__item--sm">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.ram)}
              </p>
              <p>{ram}</p>
            </li>
          </ul>
        </div>

        <div className="details__about details__info-block">
          <h3>{t(TRANSLATIONS.productDetails.about)}</h3>
          <div className="divider"></div>
          <ul className="details__about-list">
            {description.map((item, index) => {
              return (
                <li key={index} className="details__about-item">
                  <h4>{item.title}</h4>
                  <p className="text-color-sec">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="details__specs details__info-block">
          <h3>{t(TRANSLATIONS.productDetails.specs)}</h3>
          <div className="divider"></div>
          <ul className="specifications-list">
            <li className="specifications-list__item">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.screen)}
              </p>
              <p>{screen}</p>
            </li>

            <li className="specifications-list__item">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.resolution)}
              </p>
              <p>{resolution}</p>
            </li>

            <li className="specifications-list__item">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.processor)}
              </p>
              <p>{processor}</p>
            </li>

            <li className="specifications-list__item">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.ram)}
              </p>
              <p>{ram}</p>
            </li>

            <li className="specifications-list__item">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.memory)}
              </p>
              <p>{capacity}</p>
            </li>

            <li className="specifications-list__item">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.camera)}
              </p>
              <p>{camera}</p>
            </li>

            <li className="specifications-list__item">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.zoom)}
              </p>
              <p>{zoom}</p>
            </li>

            <li className="specifications-list__item">
              <p className="text-color-sec">
                {t(TRANSLATIONS.productDetails.cell)}
              </p>
              <p>{cell.join(', ')}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

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
import styles from './ProductDetails.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import iconStyles from '../../styles/icons.module.scss';
import gStyles from '../../styles/general.module.scss';

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
    <section className={styles.block}>
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.content}>
        <ul className={styles.imagesList}>
          {images.map((img, index) => {
            return (
              <li
                key={img}
                style={{
                  backgroundImage: `url(${img})`,
                }}
                className={classNames(styles.imagesItem, {
                  [styles.imagesItem_m_active]: index === displayedImageIndex,
                })}
              >
                <button
                  type="button"
                  className={`${btnStyles.block} ${btnStyles.imagePreview}`}
                  onClick={() => setDisplayedImageIndex(index)}
                ></button>
              </li>
            );
          })}
        </ul>

        <div className={styles.slider}>
          <TouchSlider
            imageUrls={images}
            order={displayedImageIndex}
            setOrder={setDisplayedImageIndex}
          />
        </div>

        <div className={styles.controls}>
          <div className={styles.selectors}>
            <p className={styles.selectors__title}>
              {t(TRANSLATIONS.productDetails.colors)}
            </p>
            <div className={styles.selectors__options}>
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
                    className={classNames(styles.color, {
                      [styles.color_m_active]: item === color,
                    })}
                  >
                    <Link
                      to={`../${id.replace(currentColorInTheLink, desiredColorInTheLink)}`}
                      replace
                      className={`${btnStyles.block} ${btnStyles.color}`}
                      style={bgColor}
                    ></Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={gStyles.divider}></div>

          <div className={styles.selectors}>
            <p className={styles.selectors__title}>
              {t(TRANSLATIONS.productDetails.capacity)}
            </p>
            <div className={styles.selectors__options}>
              {capacityAvailable.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={`../${id.replace(capacity.toLowerCase(), item.toLowerCase())}`}
                    replace
                    className={classNames(btnStyles.capacity, {
                      [btnStyles.capacity_m_active]: capacity === item,
                    })}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={gStyles.divider}></div>

          <div>
            <div className={gStyles.price}>
              <h2 className={gStyles.price__current}>
                <span className={gStyles.visuallyHidden}>
                  {t(TRANSLATIONS.productDetails.price.current)}
                </span>
                ${priceDiscount}
              </h2>
              <p className={gStyles.price__full}>
                <span className={gStyles.visuallyHidden}>
                  {t(TRANSLATIONS.productDetails.price.full)}
                </span>
                ${priceRegular}
              </p>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={classNames(btnStyles.block, {
                  [btnStyles.selected]: isItemInCart,
                  [btnStyles.primary]: !isItemInCart,
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
                className={classNames(
                  `${btnStyles.block} ${btnStyles.squareLg}`,
                  {
                    [btnStyles.liked]: isItemLiked,
                  },
                )}
                onClick={() =>
                  dispatchFavourites({ type: 'toggle', payload: product })
                }
                aria-label={ariaLabelFavBtn}
              >
                <span
                  className={classNames(iconStyles.block, {
                    [iconStyles.heartStroke]: !isItemLiked,
                    [iconStyles.heartFilled]: isItemLiked,
                  })}
                ></span>
              </button>
            </div>
          </div>

          <ul className={gStyles.specsList}>
            <li className={gStyles.specsList__itemSm}>
              <p>{t(TRANSLATIONS.productDetails.screen)}</p>
              <p>{screen}</p>
            </li>

            <li className={gStyles.specsList__itemSm}>
              <p>{t(TRANSLATIONS.productDetails.resolution)}</p>
              <p>{resolution}</p>
            </li>

            <li className={gStyles.specsList__itemSm}>
              <p>{t(TRANSLATIONS.productDetails.processor)}</p>
              <p>{processor}</p>
            </li>

            <li className={gStyles.specsList__itemSm}>
              <p>{t(TRANSLATIONS.productDetails.ram)}</p>
              <p>{ram}</p>
            </li>
          </ul>
        </div>

        <div className={`${styles.about} ${styles.info}`}>
          <h3>{t(TRANSLATIONS.productDetails.about)}</h3>

          <div className={gStyles.divider}></div>

          <ul className={styles.about__list}>
            {description.map((item, index) => {
              return (
                <li key={index} className={styles.about__item}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={`${styles.specs} ${styles.info}`}>
          <h3>{t(TRANSLATIONS.productDetails.specs)}</h3>

          <div className={gStyles.divider}></div>

          <ul className={gStyles.specsList}>
            <li className={gStyles.specsList__item}>
              <p>{t(TRANSLATIONS.productDetails.screen)}</p>
              <p>{screen}</p>
            </li>

            <li className={gStyles.specsList__item}>
              <p>{t(TRANSLATIONS.productDetails.resolution)}</p>
              <p>{resolution}</p>
            </li>

            <li className={gStyles.specsList__item}>
              <p>{t(TRANSLATIONS.productDetails.processor)}</p>
              <p>{processor}</p>
            </li>

            <li className={gStyles.specsList__item}>
              <p>{t(TRANSLATIONS.productDetails.ram)}</p>
              <p>{ram}</p>
            </li>

            <li className={gStyles.specsList__item}>
              <p>{t(TRANSLATIONS.productDetails.memory)}</p>
              <p>{capacity}</p>
            </li>

            <li className={gStyles.specsList__item}>
              <p>{t(TRANSLATIONS.productDetails.camera)}</p>
              <p>{camera}</p>
            </li>

            <li className={gStyles.specsList__item}>
              <p>{t(TRANSLATIONS.productDetails.zoom)}</p>
              <p>{zoom}</p>
            </li>

            <li className={gStyles.specsList__item}>
              <p>{t(TRANSLATIONS.productDetails.cell)}</p>
              <p>{cell.join(', ')}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

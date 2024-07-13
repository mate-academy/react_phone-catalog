import { Link, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { Category } from '../../enums/Category';
import { useContext } from 'react';
import { Gadgets } from '../../types/ContextType/Gadgets';
import { AvailableColors } from '../../enums/AvailableColors';
import { IconFavorites } from '../../components/Icons/IconFavorites';
import { ThemeContext } from '../../store/ThemeProvider';
import { CardsSlider } from '../../components/Main/SliderCards';
import { ProductsContext } from '../../store/ProductsProvider';
import { changeIdsParams } from '../../utils/changeIdsParams';
import { LanguageContext } from '../../store/LanguageProvider';
import classNames from 'classnames';
import style from './ProductDetails.module.scss';
import { BackButton } from '../BackButton';
import { StateContext } from '../../store/StateProvider';
import { ShoppingCartContext } from '../../store/ShoppingCartProvider';
import { handleCheckCarts } from '../../utils/handleCheckCards';
import { availableFav } from '../../utils/availableFav';
import Heart from '../../image/Favorites/heart.svg';

type Props = {
  type: Category;
  gadget: Gadgets;
};
export const ProductDetails: React.FC<Props> = ({ gadget }) => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useContext(ProductsContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const { imageProduct, setImageProduct, favorites, handleAddToFavorites } =
    useContext(StateContext);
  const { handleAddToCart } = useContext(ShoppingCartContext);
  const { cartItems } = useContext(ShoppingCartContext);

  const {
    id,
    category,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = gadget;

  const recomended = products.filter(item => item.category === category);
  const findProduct = products.find(item => item.itemId === id);

  const CARD_TECH_SPECS_PARAMS = {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  };

  return (
    <div
      className={classNames(style.product, {
        [style.product__darkTheme]: theme,
      })}
    >
      <BreadCrumbs />
      <BackButton />

      <h1 className={style.product__phoneName}>{name}</h1>

      <div className={style.product__gridContainer}>
        <ul className={style.product__imagesList}>
          {images.map(image => (
            <li
              className={classNames(style.product__borderImage, {
                [style.product__activeBorderImage]: imageProduct === image,
              })}
              key={image}
            >
              <button
                className={style.product__buttonForImage}
                onClick={() => setImageProduct(image)}
              >
                <img
                  src={image}
                  alt="Gadget"
                  className={style.product__smallImage}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className={style.product__mainImageWrapper}>
          <img
            src={imageProduct}
            alt="Gadget"
            className={style.product__mainImage}
          />
        </div>

        <div className={style.product__paramsContainer}>
          <p className={style.product__namesParams}>{t('availableColors')}</p>
          <p className={style.product__ids}>ID: 802390</p>

          <div className={style.product__availableColors}>
            {colorsAvailable.map(currentColor => {
              const colorNew = {
                backgroundColor:
                  AvailableColors[currentColor as keyof typeof AvailableColors],
              };

              const newColorIds = changeIdsParams(
                color,
                currentColor,
                productId,
              );

              return (
                <Link
                  to={`../${newColorIds}`}
                  key={currentColor}
                  className={classNames(style.product__colorParam, {
                    [style.product__active]: currentColor === color,
                  })}
                  style={colorNew}
                ></Link>
              );
            })}
          </div>

          <span className={style.product__line} />

          <div className={style.product__capacityBlock}>
            <p className={style.product__namesParams}>{t('capacity')}</p>
            <div className={style.product__capacityList}>
              {capacityAvailable.map(item => {
                const newCapacityIds = changeIdsParams(
                  capacity,
                  item,
                  productId,
                );

                return (
                  <Link
                    to={`../${newCapacityIds}`}
                    className={classNames(style.product__capacityLink, {
                      [style.product__capacityActiveLink]: capacity === item,
                    })}
                    key={item}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
          <span className={style.product__line} />

          <div className={style.product__orderContainer}>
            <div className={style.product__sectionPrice}>
              <p className={style.product__priceRegular}>${priceRegular}</p>
              <p className={style.product__priceDiscount}>${priceDiscount}</p>
            </div>

            <div className={style.product__orderButtons}>
              <button
                className={classNames(style.product__addToCart, {
                  [style.product__addedToCart]:
                    findProduct && handleCheckCarts(findProduct, cartItems),
                })}
                onClick={() => findProduct && handleAddToCart(findProduct)}
              >
                {findProduct && handleCheckCarts(findProduct, cartItems)
                  ? t('addedToCart')
                  : t('addToCart')}
              </button>
              <button
                className={classNames(style.product__favorites, {
                  [style.product__selectedFavorite]:
                    findProduct && availableFav(findProduct, favorites),
                })}
                onClick={() => findProduct && handleAddToFavorites(findProduct)}
              >
                {findProduct && availableFav(findProduct, favorites) ? (
                  <img src={Heart} alt="LikeLogo" />
                ) : (
                  <IconFavorites />
                )}
              </button>
            </div>
            {Object.entries({ screen, resolution, processor, ram }).map(
              ([key, value]) => (
                <div className={style.product__shortDesription} key={key}>
                  <p className={style.product__shortDesKey}>{t(key)}</p>
                  <p className={style.product__shortDesValue}>{value}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className={style.product__gridContainer}>
        <section className={style.product__aboutSection}>
          <h2 className={style.product__sectionTitle}>{t('about')}</h2>
          <span className={style.product__line} />

          {description.map(({ title, text }) => (
            <article key={title}>
              <h2 className={style.product__articleTitle}>{title}</h2>
              <p className={style.product__sectionParagraph}>{text}</p>
            </article>
          ))}
        </section>
        <section className={style.product__techSpecsSection}>
          <h2 className={style.product__sectionTitle}>{t('techSpecs')}</h2>
          <span className={style.product__line} />

          {Object.entries(CARD_TECH_SPECS_PARAMS).map(([key, value]) => (
            <div className={style.product__techSpecsParams} key={key}>
              <div className={style.product__shortDesription}>
                <p className={style.product__shortDesKey}>{t(key)}</p>
                <p className={style.product__shortDesValue}>
                  {value ? value : '-'}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div>
        <CardsSlider products={recomended} title={t('youMayAlsoLike')} />
      </div>
    </div>
  );
};

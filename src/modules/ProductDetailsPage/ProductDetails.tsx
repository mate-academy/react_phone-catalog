/* eslint-disable import/no-extraneous-dependencies */
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './ProductDetails.module.scss';
import { useProducts } from '../shared/context/ProductsContext';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductOptions } from './ProductOptions';
import { useFavourites } from '../shared/context/FavouritesContext';
import { SuggestedProducts } from './SuggestedProducts';
import { Loader } from '../shared/Loader';
import { useCart } from '../shared/context/CartContext';
import { useTheme } from '../shared/context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const ProductDetails = () => {
  const { productId } = useParams();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { phones, tablets, accessories, loading } = useProducts();
  const navigate = useNavigate();
  const allProducts = [...phones, ...tablets, ...accessories];
  const product = allProducts.find(item => item.id === productId);
  const { favourites, toggleFavourite } = useFavourites();
  const [chosenPhoto, setChosenPhoto] = useState<string | undefined>(
    product?.images[0],
  );
  const [isLoading, setIsLoading] = useState<boolean>(loading);
  const { addProduct, products } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(products.some(p => p.id === product?.id));
  }, [products, product?.id]);

  const handleAddProduct = (prodId: string) => {
    addProduct(prodId);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [productId]);

  useEffect(() => {
    setChosenPhoto(product?.images[0]);
  }, [product]);

  if (loading || isLoading) {
    return <Loader />;
  }

  if (!product && !loading) {
    return (
      <div className={style.error}>
        <p className={style.error__message}>Product was not found</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.breadcrumbs}>
        <Link to="/" className={style.breadcrumbs__home}>
          <img
            src={
              theme === 'light'
                ? './icons/home.png'
                : './icons/home-dark-theme.png'
            }
            alt="Home"
          />
        </Link>
        <img src="./icons/arrow-right.png" alt="Right" />
        <Link
          to={`/${product?.category}`}
          className={style.breadcrumbs__category}
        >
          <span>{t(`categories.${product?.category}`)}</span>
        </Link>
        <img src="./icons/arrow-right.png" alt="Right" />
        <span className={style.breadcrumbs__name}>{product?.name}</span>
      </div>
      <div className={style.back}>
        <div className={style.back__image}>
          <img src="./icons/arrow-left.png" alt="Back" />
        </div>
        <span className={style.back__word} onClick={() => navigate(-1)}>
          {t('back')}
        </span>
      </div>
      <h1 className={style.title}>{product?.name}</h1>
      <div className={style.details}>
        <div className={style.details__images}>
          <div className={style.details__small}>
            {product?.images.map(image => (
              <img
                className={classNames(style.details__s, {
                  [style.details__active]: image === chosenPhoto,
                })}
                src={image}
                alt="Photo of gadget"
                key={image}
                onClick={() => setChosenPhoto(image)}
              />
            ))}
          </div>
          <div className={style.details__large}>
            <img className={style.details__l} src={chosenPhoto} />
          </div>
        </div>
        <div className={style.details__description}>
          <ProductOptions
            colors={product!.colorsAvailable}
            color={product!.color}
            capacities={product!.capacityAvailable}
            capacity={product!.capacity}
            id={product!.id}
          />
          <div className={style.details__price}>
            <p className={style.details__discount}>${product?.priceDiscount}</p>
            <p className={style.details__regular}>${product?.priceRegular}</p>
          </div>
          <div className={style.details__controls}>
            <button
              className={isAdded ? style.details__added : style.details__add}
              disabled={isAdded}
              onClick={() => handleAddProduct(product!.id)}
            >
              {isAdded ? t('added') : t('add')}
            </button>
            <button
              className={style.details__heart}
              onClick={() => toggleFavourite(product!.id)}
            >
              <img
                src={
                  favourites.includes(product!.id)
                    ? 'icons/heart-red.png'
                    : theme === 'light'
                      ? './icons/heart.png'
                      : './icons/heart-dark-theme.png'
                }
                alt="Like"
              />
            </button>
          </div>
          <div className={style.details__charachteristics}>
            <div className={style.details__keys}>
              <span>{t('screen')}</span>
              <span>{t('resolution')}</span>
              <span>{t('processor')}</span>
              <span>{t('RAM')}</span>
            </div>
            <div className={style.details__values}>
              <span>{product?.screen}</span>
              <span>{product?.resolution}</span>
              <span>{product?.processor}</span>
              <span>{product?.ram}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.information}>
        <div className={style.about}>
          <h2 className={style.subtitle}>{t('about')}</h2>
          {product?.description.map(item => (
            <div className={style.about__info} key={item.title}>
              <h3 className={style.about__title}>
                {t(`titles.${item.title}`)}
              </h3>
              <p className={style.about__text}>
                {t(
                  `texts.${item.title.includes('Powerful Performance') ? product.id.split('-').slice(0, 3).join('-') : item.title}`,
                )}
              </p>
            </div>
          ))}
        </div>
        <div className={style.tech}>
          <h2 className={style.subtitle}>{t('techSpecs')}</h2>
          <div className={style.tech__info}>
            <div className={style.tech__keys}>
              <span>{t('screen')}</span>
              <span>{t('resolution')}</span>
              <span>{t('processor')}</span>
              <span>{t('RAM')}</span>
              <span>{t('builtInMemory')}</span>
              {product?.category !== 'accessories' && (
                <>
                  <span>{t('camera')}</span>
                  <span>{t('zoom')}</span>
                </>
              )}
              <span>{t('cell')}</span>
            </div>
            <div className={style.tech__values}>
              <span>{product?.screen}</span>
              <span>{product?.resolution}</span>
              <span>{product?.processor}</span>
              <span>{product?.ram}</span>
              <span>{product?.capacity}</span>
              {product?.category !== 'accessories' && (
                <>
                  <span>{product?.camera}</span>
                  <span>{product?.zoom}</span>
                </>
              )}
              <span>{product?.cell.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
      <SuggestedProducts />
    </div>
  );
};

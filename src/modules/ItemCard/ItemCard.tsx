import s from './ItemCard.module.scss';
import { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import { ProductContext } from '../../shared/context/ProductsContext';
import { CatalogHeaderPath } from '../../shared/CatalogHeaderPath';
import { ProductSlider } from '../../shared/ProductSlider';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { RightButtonContext } from '../../shared/context/RightButtonContext';
import { LoadingSpinner } from '../../shared/LoadingSpiner';
import { useTranslation } from 'react-i18next';

export const ItemCard = () => {
  const { t } = useTranslation('ItemCard');
  const { product } = useProduct();
  const { products } = useContext(ProductContext);
  const [indexOfPhoto, setIndexOfPhoto] = useState(0);
  const [productColor, setProductColor] = useState(0);
  const [productCapacity, setProductCapacity] = useState(0);
  const { favourites, setFavourites, shoppingBag, setShoppingBag } =
    useContext(RightButtonContext);
  const { productId } = useParams();

  const getProductId = useCallback(
    (id: string) => {
      return products.find(item => item.itemId === id)?.id || 0;
    },
    [products],
  );

  const toggleFavourites = useCallback(
    (id: string) => {
      const newItem = getProductId(id);

      if (!newItem) {
        return;
      }

      if (!favourites.find(item => item === newItem)) {
        return setFavourites([...favourites, newItem]);
      } else {
        const deleteFavourites = favourites.filter(item => item !== newItem);

        return setFavourites(deleteFavourites);
      }
    },
    [favourites, setFavourites, getProductId],
  );

  const addToShoppingBag = useCallback(
    (id: string) => {
      const newItem = getProductId(id);

      if (!newItem) {
        return;
      }

      setShoppingBag({
        ...shoppingBag,
        [newItem]: 1,
      });
    },
    [shoppingBag, setShoppingBag, getProductId],
  );

  if (!productId || !+productId || Number.isInteger(productId)) {
    return <Navigate to="/not-found" />;
  }

  if (!product) {
    return <LoadingSpinner />;
  }

  const filteredProducts = [...products]
    .filter(item => item.price >= product?.priceDiscount)
    .sort((a, b) => a.price - b.price);

  return (
    <div className={s.header}>
      <div className="container">
        <CatalogHeaderPath />
        <div className={s.header__title}>
          <Link to={'..'} className={s.header__title_back}>
            <img src="./img/icons/prev.png" alt="back" />
            <p>{t('Back')}</p>
          </Link>
          <h2>{product.name}</h2>
        </div>
        <div className={s.previews__wrapper}>
          <div className={s.previews__photo}>
            <img src={product.images[indexOfPhoto]} alt={product.id} />
          </div>
          <div className={s.previews__photo_catalog}>
            {product.images.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`photo ${index}`}
                onClick={() => {
                  setIndexOfPhoto(index);
                }}
              />
            ))}
          </div>
          <div className={s.previews__controls}>
            <div className={s.previews__controls_colors}>
              <p>{t('Available colors')}</p>
              <div className={s.previews__controls_colors_choose}>
                {product.colorsAvailable.map((color, index) => (
                  <div
                    key={index}
                    className={classNames(
                      s.previews__controls_colors_choose_color,
                      {
                        [s.active]: productColor === index,
                      },
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(index)}
                  ></div>
                ))}
              </div>
            </div>
            <div className={s.previews__controls_capacity}>
              <p>{t('Select capacity')}</p>
              <div className={s.previews__controls_capacity_choose}>
                {product.capacityAvailable.map((capacity, index) => (
                  <div
                    key={index}
                    className={classNames(
                      s.previews__controls_capacity_choose_memory,
                      {
                        [s.active]: productCapacity === index,
                      },
                    )}
                    onClick={() => setProductCapacity(index)}
                  >
                    {capacity}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.previews__controls_price}>
              <p>${product.priceDiscount}</p>
              <div className={s.previews__controls_price_regular}>
                ${product.priceRegular}
              </div>
            </div>
            <div className={s.previews__controls_buttons}>
              <button
                className={s.previews__controls_buttons_add}
                aria-label="Add to cart"
                onClick={() => addToShoppingBag(product.id)}
                disabled={Object.hasOwn(
                  shoppingBag,
                  `${getProductId(product.id)}`,
                )}
              >
                {Object.hasOwn(shoppingBag, `${getProductId(product.id)}`)
                  ? t('Added to cart')
                  : t('Add to cart')}
              </button>
              <button
                className={classNames(s.previews__controls_buttons_like, {
                  [s.added]: favourites.includes(getProductId(product.id)),
                })}
                aria-label="Add to favourites"
                onClick={() => toggleFavourites(product.id)}
              >
                {favourites.includes(getProductId(product.id)) ? (
                  <img
                    src="./img/icons/likeActive.png"
                    alt="remove from favourites"
                  />
                ) : (
                  <img src="./img/icons/like.png" alt="add to favourites" />
                )}
              </button>
            </div>
            <div className={s.previews__controls_characteristic}>
              <div className={s.previews__controls_characteristic_category}>
                {t('Screen')} <p>{product.screen}</p>
              </div>
              <div className={s.previews__controls_characteristic_category}>
                {t('Resolution')} <p>{product.resolution}</p>
              </div>
              <div className={s.previews__controls_characteristic_category}>
                {t('Processor')} <p>{product.processor}</p>
              </div>
              <div className={s.previews__controls_characteristic_category}>
                {t('RAM')} <p>{product.ram}</p>
              </div>
            </div>
          </div>
          <div className={classNames(s.about, 'block-margin')}>
            <div className={s.about__title}>
              <h3>{t('About')}</h3>
            </div>
            {product.description.map((item, index) => (
              <div key={index}>
                <h4>{item.title}</h4>
                {item.text.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
          <div className={classNames(s.specs, 'block-margin')}>
            <div className={s.specs__title}>
              <h3>{t('Tech specs')}</h3>
            </div>
            <div className={s.specs__category}>
              {t('Screen')} <p>{product.screen}</p>
            </div>
            <div className={s.specs__category}>
              {t('Resolution')} <p>{product.resolution}</p>
            </div>
            <div className={s.specs__category}>
              {t('Processor')} <p>{product.processor}</p>
            </div>
            <div className={s.specs__category}>
              {t('RAM')} <p>{product.ram}</p>
            </div>
            <div className={s.specs__category}>
              {t('Built in memory')} <p>{product.capacity}</p>
            </div>
            <div className={s.specs__category}>
              {t('Camera')} <p>{product.camera}</p>
            </div>
            <div className={s.specs__category}>
              {t('Zoom')} <p>{product.zoom}</p>
            </div>
            <div className={s.specs__category}>
              {t('Cell')} <p>{product.cell}</p>
            </div>
          </div>
        </div>
      </div>
      <ProductSlider title={'You may also like'} products={filteredProducts} />
    </div>
  );
};

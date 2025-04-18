import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Product } from '../../../../types/Products';
import s from './ProductCards.module.scss';
import { Link } from 'react-router-dom';
import { RightButtonContext } from '../../../context/RightButtonContext';
import { SkeletonCard } from '../SkeletonCard';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  products: Product[];
  cardWidth?: React.RefObject<HTMLDivElement>;
};

export const ProductCards: React.FC<Props> = ({ products, cardWidth }) => {
  const { t } = useTranslation('ProductCards');
  const { favourites, setFavourites, shoppingBag, setShoppingBag } =
    useContext(RightButtonContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => [...prev, id]);
  };

  const toggleFavourites = useCallback(
    (id: number) => {
      const newItem = products.find(item => item.id === id)?.id;

      if (!newItem) {
        return;
      }

      if (!favourites.find(item => item === id)) {
        setFavourites([...favourites, newItem]);
      } else {
        const deleteFavourites = favourites.filter(item => item !== newItem);

        setFavourites(deleteFavourites);
      }
    },
    [products, favourites, setFavourites],
  );

  const addToShoppingBag = useCallback(
    (id: number) => {
      const newItem = products.find(item => item.id === id)?.id;

      if (!newItem) {
        return;
      }

      setShoppingBag({
        ...shoppingBag,
        [newItem]: 1,
      });
    },
    [products, shoppingBag, setShoppingBag],
  );

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  return (
    <>
      {isLoading && products.map((_, i) => <SkeletonCard key={i} />)}
      {!isLoading &&
        products.map(product => (
          <div
            className={s.card}
            key={product.id}
            ref={products[0].id === product.id ? cardWidth : null}
          >
            <Link to={`../${product.itemId}`} className={s.card__link}></Link>
            <Link to={`../${product.itemId}`} className={s.card__img}>
              {!loadedImages.includes(product.id) && (
                <div className={s.card__img_loading}></div>
              )}
              <img
                src={product.image}
                alt={product.name}
                style={{
                  display: loadedImages.includes(product.id) ? 'block' : 'none',
                }}
                onLoad={() => handleImageLoad(product.id)}
              />
            </Link>
            <div className={s.card__title}>{product.name}</div>
            <div className={s.card__price}>
              <h3>${product.price}</h3>
              <h3 className={s.card__full_price}>{product.fullPrice}</h3>
            </div>
            <div className={s.card__divider}></div>
            <div className={s.card__specs}>
              <div className={s.card__specs_screen}>
                <p>{t('Screen')}</p>
                {product.screen}
              </div>
              <div className={s.card__specs_capacity}>
                <p>{t('Capacity')}</p>
                {product.capacity}
              </div>
              <div className={s.card__specs_ram}>
                <p>{t('RAM')}</p>
                {product.ram}
              </div>
            </div>
            <div className={s.card__buttons}>
              <button
                className={s.card__buttons_add}
                onClick={() => addToShoppingBag(product.id)}
                disabled={Object.hasOwn(shoppingBag, `${product.id}`)}
              >
                {Object.hasOwn(shoppingBag, `${product.id}`)
                  ? t('Added to cart')
                  : t('Add to cart')}
              </button>
              <button
                className={classNames(s.card__buttons_like, {
                  [s.added]: favourites.includes(product.id),
                })}
                onClick={() => {
                  toggleFavourites(product.id);
                }}
              >
                {favourites.includes(product.id) ? (
                  <img
                    src="./img/icons/likeActive.png"
                    alt="remove from favourites"
                  />
                ) : (
                  <img src="./img/icons/like.png" alt="add to favourites" />
                )}
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

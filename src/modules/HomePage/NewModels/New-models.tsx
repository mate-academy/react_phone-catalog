import { useState, useEffect, useRef } from 'react';
import type { Product } from '../../../Types/type';
import style from './New-models.module.scss';
import { Link, useLocation } from 'react-router-dom';
import useAddToFavourite from '../../Hooks/UseAddToFavourite';

export const NewModels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const { favourites, toggleFavourite } = useAddToFavourite();

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const getCardWidth = () => {
    if (cardRef.current) {
      const card = cardRef.current;
      const cardWidth = card.offsetWidth;
      const gap = 16;
      return cardWidth + gap;
    }
    return 272;
  };

  const sortedProduct = Array.from(
    products
      .reduce((map, product) => {
        const baseId = product.itemId.split('-').slice(0, -2).join('-');

        if (!map.has(baseId)) {
          map.set(baseId, product);
        }
        return map;
      }, new Map())
      .values()
  ).sort((a, b) => b.year - a.year);

  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;

    if (path.includes('/phones')) {
      return 'phones';
    } else if (path.includes('/tablets')) {
      return 'tablets';
    } else if (path.includes('/accessories')) {
      return 'accessories';
    }

    return 'phones';
  };

  const currentPage = getCurrentPage();

  return (
    <div className={`${style['newmodels']} ${style['newmodels--margin']}`}>
      <div className={style.newmodels__topbar}>
        <h2 className={style.newmodels__topbar__title}>
          Brand new
          <br />
          {' '}models
        </h2>
        <div className={style.newmodels__topbar__buttons}>
          <button
            className={style.newmodels__topbar__buttons__left}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className={style.newmodels__topbar__buttons__right}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className={style.newmodels__products}>
        <div
          className={style.newmodels__products__slider}
          style={{
            transform: `translateX(-${currentIndex * getCardWidth()}px)`,
          }}
        >
          {sortedProduct.map((product: Product, index: number) => {
            const isFavourite = favourites.has(product.itemId);
            return (
            <article
              className={style.newmodels__product}
              key={product.id}
              ref={index === 0 ? cardRef : null}
            >
              <Link to={`/${currentPage}/${product.itemId}`}>
                <img
                  className={style.newmodels__product__image}
                  src={product.image}
                  alt={product.itemId}
                />
              </Link>
              <p className={style.newmodels__product__name}>{product.name}</p>
              <h4 className={style.newmodels__product__price}>${product.price}</h4>
              <hr className={style['newmodels__product--line']} />

              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__screen}>
                  Screen
                </p>
                <p className={style['newmodels__product__description__screen--number']}>
                  {product.screen}
                </p>
              </div>
              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__capacity}>
                  Capacity
                </p>
                <p className={style['newmodels__product__description__capacity--number']}>
                  {product.capacity}
                </p>
              </div>
              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__ram}>RAM</p>
                <p className={style['newmodels__product__description__ram--number']}>
                  {product.ram}
                </p>
              </div>

              <div className={style.newmodels__product__buttons}>
                <button className={style.newmodels__product__buttons__button__add}>
                  Add to cart
                </button>
                <button
                className={style.newmodels__product__buttons__button__favourites}
                onClick={() => toggleFavourite(product.itemId)}
                >
                  <span className={`
                  ${style['newmodels__product__buttons__button__favourites--heart']}
                  ${isFavourite ? style['newmodels__product__buttons__button__favourites--heart--active'] : ''}
                  `}></span>
                </button>
              </div>
            </article>
          );
})}
        </div>
      </div>
    </div>
  );
};
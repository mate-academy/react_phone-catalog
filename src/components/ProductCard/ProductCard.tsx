import { Link } from 'react-router-dom';
import style from './ProductCatd.module.scss';
import React from 'react';
import { Products } from '../../types/Types';
import { Icon } from '../ui/Icon/Icon';
import { useFavorite } from '../../context/FavoriteContext';

type Props = {
  product: Products;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { isFavorite, toggleFavorite } = useFavorite();
  const isAddedToFavorite = isFavorite(product.id);
  const { image, name, price, screen, fullPrice, capacity, ram, itemId } =
    product;
  const spec = [
    { nameSpec: 'Screen', value: screen },
    { nameSpec: 'Capacity', value: capacity },
    { nameSpec: 'RAM', value: ram },
  ];
  const productCardLink = `/product/${itemId}`;

  const handleOnClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <article className={style.productCard}>
      <Link
        to={productCardLink}
        className={style.productCard__imageLink}
        onClick={handleOnClick}
      >
        <img className={style.productCard__img} src={image} alt={name} />
      </Link>

      <p className={style.productCard__name}>
        <Link
          to={productCardLink}
          className={style.productCard__nameLink}
          onClick={handleOnClick}
        >
          {name}
        </Link>
      </p>

      <h3 className={style.productCard__priceContainer}>
        <span className={style.productCard__price}>${price}</span>
        {fullPrice !== price && (
          <span className={style.productCard__fullPrice}>${fullPrice}</span>
        )}
      </h3>

      <hr className={style.productCard__hr} />

      <div className={style.productCard__specContainer}>
        {spec.map(({ nameSpec, value }) => (
          <div key={nameSpec} className={style.productCard__spec}>
            <span className={style.productCard__specName}>{nameSpec}</span>
            <span className={style.productCard__specValue}>{value}</span>
          </div>
        ))}
      </div>

      <div className={style.productCard__actionContainer}>
        <button className={style.productCard__actionAdd}>Add to cart</button>

        <button
          className={style.productCard__actonFavorite}
          onClick={() => toggleFavorite(product)}
        >
          {isAddedToFavorite ? (
            <Icon
              className={style.productCard__favoriteIcon}
              nameIcon="addedToFavorite"
            />
          ) : (
            <Icon
              className={style.productCard__favoriteIcon}
              nameIcon="addFavorite"
            />
          )}
        </button>
      </div>
    </article>
  );
};

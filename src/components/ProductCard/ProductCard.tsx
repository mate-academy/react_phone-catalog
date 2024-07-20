import classNames from 'classnames';
import { Button } from '../Button/Button';
import style from './ProductCard.module.scss';
import { FavouritesButton } from '../FavouritesButton/FavouritesButton';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  type: string;
};

export const ProductCard: React.FC<Props> = ({ product, type }) => {
  const { name, fullPrice, price, screen, capacity, ram, image } = product;
  const techValueClassName = classNames(
    'text-small',
    style.productCard__techValue,
  );

  return (
    <div className={style.productCard}>
      <a className={style.productCard__imgWrapper}>
        <img className={style.productCard__img} src={image} alt="product" />
      </a>
      <div>
        <p className="text-body">{name}</p>

        {type === 'brandNew' ? (
          <h3>${fullPrice}</h3>
        ) : (
          <div className={style.productCard__priceWrapper}>
            <h3>${price}</h3>
            <h3 className={style.productCard__fullPrice}>${fullPrice}</h3>
          </div>
        )}

        <div className={style.productCard__divider}></div>

        <div className={style.productCard__information}>
          <div className={style.productCard__info}>
            <p className="text-small">Screen</p>
            <p className={techValueClassName}>{screen}</p>
          </div>
          <div className={style.productCard__info}>
            <p className="text-small">Capacity</p>
            <p className={techValueClassName}>{capacity}</p>
          </div>
          <div className={style.productCard__info}>
            <p className="text-small">RAM</p>
            <p className={techValueClassName}>{ram}</p>
          </div>
        </div>
        <div className={style.productCard__btns}>
          <Button text="Add to cart" />
          <FavouritesButton />
        </div>
      </div>
    </div>
  );
};

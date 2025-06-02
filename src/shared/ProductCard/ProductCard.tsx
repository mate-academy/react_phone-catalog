import { Link } from 'react-router-dom';
import { HeartSVG } from '../../assets/HeartSVG';
import { Product } from '../../types/product';
import s from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={s.card}>
      <img className={s.img} src={product.image} alt="Product image" />
      <span className={s.product__name}>{product.name}</span>

      <span>{product.price}</span>

      <div className={s.card__line}></div>

      <div className={s.card__parametrs}>
        <span className={s.card__parametrs__names}>Screen</span>
        <span className={s.product__parametr}>{product.screen}</span>
      </div>
      <div className={s.card__parametrs}>
        <span className={s.card__parametrs__names}>Capacity</span>
        <span className={s.product__parametr}>{product.capacity}</span>
      </div>
      <div className={s.card__parametrs}>
        <span className={s.card__parametrs__names}>Ram</span>
        <span className={s.product__parametr}>{product.ram}</span>
      </div>

      <div className={s.card__buttons}>
        <Link
          to={{
            pathname: '/phones',
            search: `?productId=${product.itemId}`,
          }}
        >
          <button className={s.card__button_buy}>Add to cart</button>
        </Link>
        <button className={s.card__button}>
          <HeartSVG />
        </button>
      </div>
    </div>
  );
};

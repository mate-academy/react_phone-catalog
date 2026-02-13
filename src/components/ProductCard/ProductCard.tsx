import { Product } from '../../types/Product';
import s from './ProductCard.module.scss';
import icon from '../../assets/images/icons/Favourites (Heart Like).svg';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={s.container}>
      <div className={s.productImage}>
        <img className={s.image} src={product.image} alt={product.name} />
      </div>

      <h3 className={s.productName}>{product.name}</h3>

      <div className={s.productPrice}>
        <span className={s.newPrice}>${product.price}</span>
        <span className={s.price}>${product.fullPrice}</span>
      </div>

      <div className={s.line}></div>

      <div className={s.description}>
        <div className={s.descriptionItem}>
          <span className={s.label}>Screen</span>
          <span className={s.value}>{product.screen}</span>
        </div>
        <div className={s.descriptionItem}>
          <span className={s.label}>Capacity</span>
          <span className={s.value}>{product.capacity}</span>
        </div>
        <div className={s.descriptionItem}>
          <span className={s.label}>RAM</span>
          <span className={s.value}>{product.ram}</span>
        </div>
      </div>

      <div className={s.productButton}>
        <button className={s.selected}>Add to cart</button>
        <button className={s.favorites}>
          <img src={icon} alt="favorites" />
        </button>
      </div>
    </article>
  );
};

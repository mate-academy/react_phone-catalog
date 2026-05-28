import { Products } from '../../types/Products';
import styles from './ProductCard.module.scss';
// import addSpaces from '../../hooks/addSpaces';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import ProductPrice from '../ProductPrice/ProductPrice';
import ProductAction from '../ProductAction/ProductAction';
import ProductSpec, { Spec } from '../ProductSpec/ProductSpec';

type Props = {
  product: Products;
  showDiscount: boolean;
  variant?: 'grid' | 'slider';
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount,
  variant = 'slider',
}) => {
  const specTech: Spec[] = [
    ['Screen', product.screen],
    ['Capacity', product.capacity],
    ['RAM', product.ram],
  ];

  return (
    <article className={classNames(styles.card, styles[variant])}>
      <NavLink to={`/product/${product.itemId}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.img} />
        </div>
        <h4 className={styles.title}>{product.name}</h4>
      </NavLink>

      <div className={styles.price}>
        <ProductPrice
          oldPrice={product.fullPrice}
          newPrice={product.price}
          showDiscount={showDiscount}
        />
      </div>

      <ProductSpec spec={specTech} />

      <div className={styles.buttonsDown}>
        <ProductAction variant={'smallButtonSize'} />
      </div>
    </article>
  );
};

export default ProductCard;

import { Products } from '../../../types/Products';
import { Buttons } from '../Buttons/Buttons';
import { Details } from '../Details/Details';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import styles from './productItem.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  product: Products;
};

const details = ['Screen', 'Capacity', 'RAM'];

export const ProductItem: React.FC<Props> = ({ product }) => {
  const link = `/${product.category}/${product.itemId}`;

  return (
    <div className={styles.product}>
      <Link to={link} className={styles['product__image-link']}>
        <div className={styles.product__image}>
          <img src={product.image} alt="product" />
        </div>
      </Link>

      <Link to={link} className={styles['product__title-link']}>
        <div className={styles.product__title}>{product.name}</div>
      </Link>

      <ProductPrice
        fullPrice={product.fullPrice}
        price={product.price}
        withPseudo={true}
      />

      <Details
        product={product}
        details={details}
        customStyles={'small-font'}
      />

      <Buttons productId={product.id.toString()} />
    </div>
  );
};

import styles from './HomeCatalog.module.scss';
import { Product } from '../../../types/Product';
import ProductCard from '../../shared/ProductCard';
import Icon from '../../shared/Icon';

interface Props {
  title: string;
  products: Product[];
}

const HomeCatalog: React.FC<Props> = ({ title, products }) => {
  const moveLeft = () => {
    // eslint-disable-next-line no-console
    console.log('left');
  };

  const moveRight = () => {
    // eslint-disable-next-line no-console
    console.log('left');
  };

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__top}>
        <h2 className={styles.catalog__title}>{title}</h2>
        <div className={styles.catalog__buttons}>
          <Icon
            onClick={moveLeft}
            iconStyles={{ border: false, image: ['arrowLeft', 'disabled'] }}
          />
          <Icon
            onClick={moveRight}
            iconStyles={{ border: true, image: 'arrowRight' }}
          />
        </div>
      </div>
      <div className={styles.catalog__slider}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeCatalog;

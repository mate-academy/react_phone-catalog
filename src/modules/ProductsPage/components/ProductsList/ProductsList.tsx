import { NotFound } from '../../../../components/NotFound';
import { ProductCard } from '../../../../components/ProductCard';
import { Product } from '../../../../types/Product';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
  productsType: string;
};

export const ProductsList: React.FC<Props> = ({ products, productsType }) => {
  return (
    <>
      {products.length > 0 ? (
        <div className={styles.products_list}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} isDiscountVisible />
          ))}
        </div>
      ) : (
        <NotFound
          title={`There are no ${productsType} yet...`}
          mode="noResults"
        />
      )}
    </>
  );
};

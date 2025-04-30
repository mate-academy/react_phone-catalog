import { CategoryType } from '../../types/CategoryType';
import { ProductType } from '../../types/ProductType';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: ProductType[];
  category: CategoryType;
  itemsPerPage: number;
  currentPage?: number;
}

export const ProductsList = ({
  products,
  itemsPerPage,
  currentPage = 1,
}: Props) => {
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = products.slice(startIdx, endIdx);

  return (
    <>
      <div className={styles.products__row}></div>
      {currentItems.map(product => (
        <div key={product.id} className={styles.products__card_container}>
          <ProductCard product={product} />
        </div>
      ))}
    </>
  );
};

import styles from './ProductsList.module.scss';
import { ProductCard } from 'components/ProductCard';
import { PageSelector } from '../PageSelector';
import { Product } from 'types/Product';
import { useContext, useEffect, useMemo } from 'react';
import { ProductsContext } from 'store/ProductsContext';
import { useParams } from 'react-router-dom';

type ProductsListProps = {
  products: Product[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const ProductsList = ({
  products,
  perPage,
  currentPage,
  onPageChange,
}: ProductsListProps) => {
  const { searchProduct } = useContext(ProductsContext);
  const { type } = useParams();

  const filteredProducts = useMemo(() => {
    if (!searchProduct) {
      return products;
    }

    const searchTerm = searchProduct.toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm),
    );
  }, [products, searchProduct]);

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;

  const currentItems = useMemo(() => {
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, indexOfFirstItem, indexOfLastItem]);

  useEffect(() => {
    onPageChange(1);
  }, [filteredProducts, onPageChange]);

  return (
    <>
      <div className={styles.container}>
        {currentItems.length > 0 ? (
          currentItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className={styles.container__empty}>
            <span>{`There are no ${type} products matching the query`}</span>
            <img src="img/product-not-found.png" alt="No products found" />
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <PageSelector
          listSize={filteredProducts.length}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

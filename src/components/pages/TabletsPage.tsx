import { useState, useEffect, useMemo } from 'react';
import { ProductType, getProductsWithType } from '../../api/getProducts';
import { Product } from '../../types/Phone';
import ProductsCatalog from '../ProductsCatalog';
import NoProductsMessage from '../NoProductsMessage';
import { CatalogProps } from '../../types/CatalogProps';
import { filteredProductsByName } from '../../utils/filterProductsByName';
import Loader from '../Loader';

const TabletsPage: React.FC<CatalogProps> = ({
  searchQuery, setCurrentProduct,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const title = 'Tablets';

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProductsWithType(ProductType.TABLET)
      .then(productsFromApi => setProducts(productsFromApi))
      .finally(() => setIsLoading(false));
    setCurrentProduct('tablets');
  }, []);

  const filteredProducts = useMemo(() => filteredProductsByName(
    products, searchQuery,
  ), [searchQuery, products]);

  return (
    !isLoading
      ? (
        products.length > 0
          ? (
            <ProductsCatalog
              title={title}
              products={filteredProducts}
            />
          ) : (
            <NoProductsMessage title={title} />
          )
      ) : (
        <Loader />
      )
  );
};

export default TabletsPage;

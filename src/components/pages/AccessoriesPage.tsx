/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { useEffect, useState, useMemo } from 'react';
import { Product } from '../../types/Phone';
import { ProductType, getProductsWithType } from '../../api/getProducts';
import ProductsCatalog from '../ProductsCatalog';
import NoProductsMessage from '../NoProductsMessage';
import { CatalogProps } from '../../types/CatalogProps';
import { filteredProductsByName } from '../../utils/filterProductsByName';
import Loader from '../Loader';

const AccessoriesPage: React.FC<CatalogProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const title = 'Accessories';

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProductsWithType(ProductType.ACCESSORY).then(productsFromApi => setProducts(productsFromApi)).finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = useMemo(() => filteredProductsByName(products, searchQuery), [searchQuery, products]);

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

export default AccessoriesPage;

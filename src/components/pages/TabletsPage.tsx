import { useState, useEffect, useMemo } from 'react';

import Loader from '../Blocks/Loader';
import ProductsCatalog from '../Blocks/ProductsCatalog';
import NoProductsMessage from './NoProductsMessage';

import { Product } from '../../types/Phone';
import { CatalogProps } from '../../types/CatalogProps';

import { ProductType, getProductsWithType } from '../../api/getProducts';

import { filteredProductsByName } from '../../utils/filterProductsByName';

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
    <>
      {isLoading && (<Loader />)}

      {!isLoading
      && (
        products.length > 0
          ? (
            <ProductsCatalog
              title={title}
              products={filteredProducts}
            />
          ) : (
            <NoProductsMessage title={title} />
          ))}
    </>
  );
};

export default TabletsPage;

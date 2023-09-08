import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';

import ProductsCatalog from '../Blocks/ProductsCatalog';
import Loader from '../Blocks/Loader';
import NoProductsMessage from './NoProductsMessage';

import { Product } from '../../types/Phone';
import { CatalogProps } from '../../types/CatalogProps';

import { ProductType, getProductsWithType } from '../../api/getProducts';

import { filteredProductsByName } from '../../utils/filterProductsByName';

const PhonesPage: React.FC<CatalogProps> = ({
  searchQuery, setCurrentProduct,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const title = 'Mobile phones';

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProductsWithType(ProductType.PHONE)
      .then(productsFromApi => setProducts(productsFromApi))
      .finally(() => setIsLoading(false));
    setCurrentProduct('phones');
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

export default PhonesPage;

import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';

import { ProductType, getProductsWithType } from '../../api/getProducts';
import { Product } from '../../types/Phone';
import '../../styles/pages/PhonesPage.scss';
import ProductsCatalog from '../ProductsCatalog';
import NoProductsMessage from '../NoProductsMessage';
import { CatalogProps } from '../../types/CatalogProps';
import { filteredProductsByName } from '../../utils/filterProductsByName';
import Loader from '../Loader';

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

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../helpers/fetchProducts';
import { ProductType } from '../../types/ProductType';
import { ProductsPage } from '../ProductsPage';

import './PhonesPage.scss';
import { motionParametr } from '../../helpers/motionParametr';

export const PhonesPage = () => {
  const [productsPhone, setProductsPhone] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPhones = async () => {
    setIsLoading(true);

    try {
      const getPhonesFromServer = (await getAllProducts())
        .filter(currentProduct => (
          currentProduct.category === ProductType.Phone
        ));

      setProductsPhone(getPhonesFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <motion.section
      className="phones"
      {...motionParametr}
    >
      <div className="container">
        <ProductsPage
          title="Mobile phones"
          isError={isError}
          isLoading={isLoading}
          products={productsPhone}
          category={ProductType.Phone}
        />
      </div>
    </motion.section>
  );
};

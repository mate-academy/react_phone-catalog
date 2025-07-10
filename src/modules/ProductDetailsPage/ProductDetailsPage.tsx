import { useContext, useEffect, useState } from 'react';
import { CurrentPage } from '../../shared/components/CurrentPage/CurrentPage';
import { ProductSlider } from '../../shared/components/ProductsSlider/ProductSlider';
import styles from './ProductDetailsPage.module.scss';
import { ProductContext } from '../../shared/store/GlobalProvider';
import { getRandom } from './utils/getRandom';
import { Product } from '../../shared/types/Product/Product';
import { useLocation } from 'react-router-dom';
import { getAllProducts } from '../../shared/services/apiServices';
import { set } from 'cypress/types/lodash';
import { getProduct } from './utils/getProduct';
import { ProductInfo } from './components/ProductInfo/ProductInfo';
import { ProductOverview } from './components/ProductOverview/ProductOverview';
import { Loader } from '../../shared/components/Loader/Loader';
import { ProductNotFound } from './components/ProductNotFound/ProductNotFound';

export const ProductDetailsPage = () => {
  const { data } = useContext(ProductContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();
  const [, path, slug] = pathname.split('/');

  const randomProducts = getRandom(data, 30);
  const currentProduct = getProduct(products, slug);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getAllProducts(`/${path}.json`);

        setProducts(response.data);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [path]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentProduct) {
    return <ProductNotFound />;
  }

  return (
    <main className={styles.details}>
      <div className={styles.details__container}>
        <CurrentPage
          showProductsCount={products.length}
          currentProduct={currentProduct}
        />

        <ProductOverview product={currentProduct!} />
        <ProductInfo productInfo={currentProduct!} />
      </div>
      <ProductSlider
        title="You may also like"
        products={randomProducts}
        sliderId="like"
        isHotPrice={true}
      />
    </main>
  );
};

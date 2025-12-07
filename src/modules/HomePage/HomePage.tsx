import { useEffect, useState } from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import styles from './HomePage.module.scss';
import { Product } from '../../types/Product';
// import { ProductDetails } from "../../types/ProductFull";
import { getProducts } from '../../api/products';
import { ShopByCategory } from './components/ShopByCategory';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(p => {
        setProducts(p);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const sortedByAge = [...products].sort((a, b) => b.year - a.year);
  const sortedByPrice = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
  const phonesFromProducts = [...products].filter(
    product => product.category === 'phones',
  );
  const tabletsFromProducts = [...products].filter(
    product => product.category === 'tablets',
  );
  const accessoriesFromProducts = [...products].filter(
    product => product.category === 'accessories',
  );

  return (
    <>
      <div className="container">
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>
      <PicturesSlider />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <ProductsSlider
            products={sortedByAge}
            title="Brand new model"
            priceView="fullOnly"
          />
          <ShopByCategory
            phonesQnt={phonesFromProducts.length}
            tabletsQnt={tabletsFromProducts.length}
            accessoriesQnt={accessoriesFromProducts.length}
          />
          <ProductsSlider
            products={sortedByPrice}
            title="Hot prices"
            priceView="default"
          />
        </div>
      )}
    </>
  );
};

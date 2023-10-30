import { useEffect, useState } from 'react';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { getHotPriceProducts } from '../../helpers/getHotPriceProducts';
import { getBrandNewProducts } from '../../helpers/getBrandNewProducts';

import { CategoryList } from '../../components/CategoryList/CategoryList';

import { PicturesSlider } from '../../components/PicturesSlider';
import './Home.scss';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const loadedProducts = await getProducts();

        setProducts(loadedProducts);
      } catch (e) {
        throw new Error('getProducts error');
      } finally {
        setIsLoaded(true);
      }
    }

    fetchProducts();
  }, []);

  const getCount = (type: string) => {
    return products.reduce((sum, product) => {
      if (product.type === type) {
        return sum + 1;
      }

      return sum;
    }, 0);
  };

  const hotPriceProducts = getHotPriceProducts(products);
  const brandNewProducts = getBrandNewProducts(products);

  const phonesCount = getCount('phone');
  const tabletsCount = getCount('tablet');
  const accessoriesCount = getCount('accessory');

  const count = {
    phonesCount,
    tabletsCount,
    accessoriesCount,
  };

  return (
    <main className="home">
      <section className="home__pictures">
        <PicturesSlider />
      </section>
      <section className="home__hot-prices">
        <ProductsSlider
          title="Hot prices"
          products={hotPriceProducts}
          isLoaded={isLoaded}
        />
      </section>
      <section className="home__categories">
        <CategoryList count={count} />
      </section>
      <section className="home__brand-new-models">
        <ProductsSlider
          title="Brand new models"
          products={brandNewProducts}
          isLoaded={isLoaded}
        />
      </section>
    </main>
  );
};

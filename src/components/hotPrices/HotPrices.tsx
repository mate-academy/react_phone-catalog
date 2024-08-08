import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../productsSlider/ProductsSlider';
import { ProductsContext } from '../../context/ProductsContext';
import { getProductsWithDelay } from '../../services/api/api';

export const HotPrices = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { setIsLoading } = useContext(ProductsContext);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getProductsWithDelay();

        setAllProducts(products);
      } catch {
        throw new Error('Something went wrong while fetching products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [setIsLoading]);

  const hotPrices = allProducts.sort((a, b) => a.fullPrice - b.fullPrice);

  return (
    <section className="hot__prices">
      <ProductsSlider title="Hot prices" products={hotPrices} />
    </section>
  );
};

import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../productsSlider/ProductsSlider';
import { ProductsContext } from '../../context/ProductsContext';
import { getProductsWithDelay } from '../../services/api/api';

export const BrandNewModels = () => {
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

  const brandNew = allProducts
    .filter(product => product.year === 2022)
    .sort((a, b) => b.price - a.price);

  return (
    <section className="brand-new-models">
      <ProductsSlider newModels title="Brand new models" products={brandNew} />
    </section>
  );
};

import { useMemo } from 'react';
import { ProductsSlider } from '../../../../components/ProductsSlider';
import { useProducts } from '../../../../context/ProductsContext';

export const BrandNewModels = () => {
  const { products } = useProducts();

  const brandNew = useMemo(() => {
    const withoutDiscount = products.filter(
      product => product.fullPrice === product.price,
    );

    const targetProducts =
      withoutDiscount.length > 0 ? withoutDiscount : products;

    return [...targetProducts]
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, 8);
  }, [products]);

  return (
    <ProductsSlider title="Brand new models" products={brandNew} hideDiscount />
  );
};

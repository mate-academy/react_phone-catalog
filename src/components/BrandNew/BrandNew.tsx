import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types/Product';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const BrandNew = () => {
  const { products } = useProducts();
  const getBrandNewProducts = (prods: Product[]) => {
    const newProducts = prods
      .filter(p => p.discount === 0);

    newProducts.sort((a, b) => {
      const productA = a.price;
      const productB = b.price;

      return productB - productA;
    });

    return newProducts;
  };

  const title = 'Brand new models';
  const brandNewProducts = getBrandNewProducts(products);

  return (
    <div className="container">
      <ProductSlider products={brandNewProducts} title={title} />
    </div>
  );
};

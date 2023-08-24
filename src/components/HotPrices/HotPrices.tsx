import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types/Product';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const HotPrices = () => {
  const { products } = useProducts();

  const getHotPriceProducts = (prods: Product[]) => {
    const discountedProducts = prods
      .filter(p => p.discount !== 0);

    discountedProducts.sort((a, b) => {
      const discountA = a.price * (a.discount / 100);
      const discountB = b.price * (b.discount / 100);

      return discountB - discountA;
    });

    return discountedProducts;
  };

  const hotPriceProducts = getHotPriceProducts(products);
  const title = 'Hot prices';

  return (
    <div className="container">
      <ProductSlider
        products={hotPriceProducts}
        title={title}
      />
    </div>
  );
};

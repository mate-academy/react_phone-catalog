import './RandomProducts.scss';
import { useProducts } from '../../store/ProductsContext';
import { getSuggestedProducts } from '../../services/products';
import { ProductsSlider } from '../ProductsSlider';

export const RandomProducts = () => {
  const products = useProducts();
  const randomList = getSuggestedProducts(products);

  return (
    <section className="random-products">
      <div className="random-products__content">
        <h1 className="title">
          You may also like
        </h1>

        <ProductsSlider products={randomList} />
      </div>
    </section>
  );
};

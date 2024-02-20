import './BrandNew.scss';
import { useProducts } from '../../store/ProductsContext';
import { getBrandNewProducts } from '../../services/products';
import { ProductsSlider } from '../ProductsSlider';

export const BrandNew = () => {
  const products = useProducts();
  const brandNewProducts = getBrandNewProducts(products);

  return (
    <section className="brand-new">
      <div className="brand-new__content">
        <h1 className="title">
          Brand new models
        </h1>

        <ProductsSlider products={brandNewProducts} />
      </div>
    </section>
  );
};

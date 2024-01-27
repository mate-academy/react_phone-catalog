import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

import { ProductsSlider } from '../../components/ProductsSlider';
import { ProductDetails } from '../../components/ProductDetails';
import { NoResults } from '../../components/NoResults';

import './ProductDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { items: products } = useAppSelector(state => state.products);

  return (
    <div className="ProductDetailsPage page__container">
      {productId ? (
        <ProductDetails productItemId={productId} />
      ) : (
        <NoResults title="Invalid product ID" />
      )}
      <div className="ProductDetailsPage__you-may">
        <ProductsSlider
          title="You may also like"
          products={products.slice(0, 16)}
        />
      </div>

    </div>
  );
};

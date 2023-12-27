import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ProductsSlider } from '../../components/ProductsSlider';
import { ProductDetails } from '../../components/ProductDetails';
import { AppContext } from '../../store/AppProvider';
import { NoResults } from '../../components/NoResults';

import './ProductDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { products } = useContext(AppContext);

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

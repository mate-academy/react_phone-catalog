import { useContext, FC } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductsSlider } from '../shared/ProductsSlider';
import { ButtonBack } from '../shared/ButtonBack';
import { Loader } from '../shared/Loader';
import { ProductContentTop } from './components/ProductContentTop';
import { ProductContentBottom } from './components/ProductContentBottom';
import { GlobalContext } from '../../context/GlobalContext';
import { useProductData } from './hooks/useProductData';
import './ProductDetailsPage.scss';

const shuffleProducts = (products: Product[]): Product[] =>
  [...products].sort(() => 0.5 - Math.random());

const getSuggestedProducts = (
  allProducts: Product[],
  category: string,
  excludeProductId: string,
): Product[] => {
  const categoryProducts = allProducts.filter(
    product =>
      product.category === category && product.itemId !== excludeProductId,
  );

  return shuffleProducts(categoryProducts);
};

const ErrorMessage: FC<{ error: string }> = ({ error }) => (
  <div className="detailsPage__error-message">
    <span>{error}</span>
    <Link to="/" className="detailsPage__error-link">
      Go to HomePage
    </Link>
  </div>
);

const LoadingState: FC = () => (
  <div className="detailsPage">
    <Loader />
  </div>
);

export const ProductDetailsPage: FC = () => {
  const { allProducts } = useContext(GlobalContext);
  const { productId = '' } = useParams();
  const location = useLocation();

  const currentCategory = location.pathname.split('/')[1];
  const { currentProduct, categoryProducts, isLoading, error } = useProductData(
    currentCategory,
    productId,
  );

  const suggestedProducts = currentProduct
    ? getSuggestedProducts(allProducts, currentCategory, productId)
    : [];

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !currentProduct) {
    return (
      <div className="detailsPage">
        <ErrorMessage error={error || 'Product not found'} />
      </div>
    );
  }

  return (
    <div className="detailsPage">
      <Breadcrumbs
        productType={currentCategory}
        productName={currentProduct.name}
      />

      <ButtonBack />

      <h2 className="detailsPage__title">{currentProduct.name}</h2>

      <ProductContentTop
        selectedProduct={currentProduct}
        specificProducts={categoryProducts}
      />

      <ProductContentBottom selectedProduct={currentProduct} />

      {suggestedProducts.length > 0 && (
        <div className="detailsPage__like-block">
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
            displayType="with-discount"
          />
        </div>
      )}
    </div>
  );
};

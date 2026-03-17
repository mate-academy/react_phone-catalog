import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProductSpecs } from '../types/Product';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getCategoryProducts } from '../api/categoryProducts';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { Loader } from '../components/Loader';
import { Container } from '../components/Container';
import { ProductsContext } from '../store/ProductsContext';
import { RecommendedProducts } from '../components/RecomendedProducts';
import { useRecommendedProducts } from '../hooks/useRecommendedProducts';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { products } = useContext(ProductsContext);
  const [productsDetails, setProductsDetails] = useState<ProductSpecs[]>([]);
  const product = products.find(item => item.itemId === productId);
  const selectedProduct = productsDetails.find(item => item.id === productId);

  const recommendedProducts = useRecommendedProducts(product);

  const { name } = selectedProduct || {};

  const category = location.pathname.split('/')[1];

  useEffect(() => {
    setIsLoading(true);

    getCategoryProducts(category)
      .then(setProductsDetails)
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  const showProductDetails = !isLoading && selectedProduct && product;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Breadcrumbs name={name} />

        {showProductDetails && (
          <ProductDetails
            productDetails={selectedProduct}
            product={product}
            productVariants={productsDetails}
          />
        )}

        <RecommendedProducts recommendedProducts={recommendedProducts} />
      </Container>
    </>
  );
};

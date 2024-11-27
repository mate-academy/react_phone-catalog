import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Product, ProductSpecs } from '../types/Product';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getProducts } from '../api/products';
import { getCategoryProducts } from '../api/categoryProducts';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { Loader } from '../components/Loader';
import { Container } from '../components/Container';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsDetails, setProductsDetails] = useState<ProductSpecs[]>([]);
  
  const product = products.find(item => item.itemId === productId);
  const selectedProduct = productsDetails.find(item => item.id === productId);

  const { name } = selectedProduct || {};

  const category = location.pathname.split('/')[1];

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));

    getCategoryProducts(category)
      .then(setProductsDetails)
      .finally(() => setIsLoading(false));
  }, [category]);

  const showProductDetails = !isLoading && selectedProduct && product;

  console.log(showProductDetails);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Breadcrumbs name={name} />

        {showProductDetails && (
          <ProductDetails productDetails={selectedProduct} product={product} />
        )}
      </Container>
    </>
  );
};

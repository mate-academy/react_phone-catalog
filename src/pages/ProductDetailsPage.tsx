import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCategoryProducts } from '../api/categoryProducts';
import { ProductSpecs } from '../types/ProductSpecs';
import { ProductDetails } from '../components/ProductDetails';
import { getRandomProductsList } from '../utils/helper';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';
import { Recommendations } from '../components/Recommendations';
import { Loader } from '../components/Loader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Back } from '../components/Back';
import { ProductsDetailsError } from '../components/ProductDetailsError';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const { itemId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsDetails, setProductsDetails] = useState<ProductSpecs[]>([]);

  const product = products.find(item => item.itemId === itemId);
  const selectedProduct = productsDetails.find(item => item.id === itemId);
  const { name } = selectedProduct || {};
  const category = location.pathname.split('/')[1];
  const recommendationProducts = getRandomProductsList(products);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));

    getCategoryProducts(category)
      .then(setProductsDetails)
      .finally(() => setIsLoading(false));
  }, [category]);

  const showProductDetailsError = !isLoading && !selectedProduct;
  const showProductDetails = !isLoading && selectedProduct && product;

  return (
    <>
      <Breadcrumbs name={name} />
      <Back />

      {isLoading && <Loader />}

      {showProductDetailsError && <ProductsDetailsError />}

      {showProductDetails && (
        <ProductDetails productDetails={selectedProduct} product={product} />
      )}

      {!isLoading && <Recommendations products={recommendationProducts} />}
    </>
  );
};

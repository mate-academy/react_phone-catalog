import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { ProductDetails } from '../../components/ProductDetails';
import { getProducts, getProductsDetails } from '../../api/products';
import { Product } from '../../types/Product';
import { Details } from '../../types/Details';
import { getSuggestedProducts } from '../../helpers/getSuggestedProducts';
import { ProductsSlider } from '../../components/ProductsSlider';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [
    productDetails, setProductDetails,
  ] = useState<Details | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const product = products
    .find(currentProduct => currentProduct.id === productId);
  const availableColors = ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'];
  const availableCapacity = ['64', '256', '512'];

  const suggestProducts = getSuggestedProducts(products);

  useEffect(() => {
    async function getProductDetails() {
      if (typeof productId === 'string') {
        const loadedProducts = await getProducts();
        const loadedProductDetails = await getProductsDetails(productId);

        setProducts(loadedProducts);
        setProductDetails(loadedProductDetails);
        setIsLoaded(true);
      }
    }

    getProductDetails();
  }, []);

  return (
    <div className="details-page">
      {!isLoaded ? (
        <div className="details-page__loader">
          <ReactLoading type="bubbles" color="#313237" />
        </div>
      ) : (
        <>
          <ProductDetails
            product={product}
            productDetails={productDetails}
            availableColors={availableColors}
            availableCapacity={availableCapacity}
          />
          <ProductsSlider
            title="You may also like"
            products={suggestProducts}
            isLoaded={isLoaded}
          />
        </>
      )}
    </div>
  );
};

import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, getProducts } from '../../helpers/fetchClient';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductDetails } from '../../components/ProductDetails';
import { ProdDetails } from '../../types/ProdDetails';
import { Product } from '../../types/Product';
import { ProductNotFound } from '../../components/ProductNotFound';
import { Recommendations } from '../../components/Recommendations';

export const ProductDetailsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [details, setDetails] = useState<ProdDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { productId } = useParams();

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      throw new Error('Loading Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProductDetails = async () => {
    setIsLoading(true);
    try {
      const detailsFromServer = await getProductDetails(productId || '');

      setDetails(detailsFromServer);
    } catch {
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  const selectedProduct = useMemo(() => {
    return products.find(product => product.id === productId);
  }, [products, productId]);

  return (
    <section className="product-details__container">
      {notFound ? (
        <ProductNotFound />
      ) : (
        <>
          {isLoading && <Loader />}
          {details && selectedProduct && (
            <>
              <Breadcrumbs />
              <BackButton />
              <ProductDetails details={details} product={selectedProduct} />
              <Recommendations products={products} />
            </>
          )}
        </>
      )}
    </section>
  );
};

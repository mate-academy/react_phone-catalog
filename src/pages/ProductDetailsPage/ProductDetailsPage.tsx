import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../helpers/fetchClient';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductDetails } from '../../components/ProductDetails';
import { ProdDetails } from '../../types/ProdDetails';
import { Product } from '../../types/Product';
import { ProductNotFound } from '../../components/ProductNotFound';
import { Recommendations } from '../../components/Recommendations';

type Props = {
  products: Product[],
};

export const ProductDetailsPage: FC<Props> = ({ products }) => {
  const [details, setDetails] = useState<ProdDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { productId } = useParams();

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

  // console.log(products);
  // console.log(selectedProduct);

  return (
    <section className="product-details__container">
      {notFound ? (
        <ProductNotFound />
      ) : (
        <>
          <Breadcrumbs />
          <BackButton />
          {isLoading && <Loader />}
          {details && selectedProduct && (
            <>
              <ProductDetails details={details} product={selectedProduct} />
              <Recommendations products={products} />
            </>
          )}
        </>
      )}
    </section>
  );
};

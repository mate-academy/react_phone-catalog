import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../shared/components/Loader';
import { checkResponse } from '../shared/utils/apiHelper';
import { Product } from '../shared/types/Product';
import { ProductDetails } from '../shared/types/ProductDetails';
import ErrorMessage from '../shared/components/ErrorMessage/ErrorMessage';
import { NotFoundPage } from '../NotFoundPage';
import { STATUS, Status } from '../shared/utils/status';
import { NotFoundError, ServerError } from '../shared/utils/errorTypes';
import { ProductDetailsView } from './ProductDetailsView/ProductDetailsView';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{
    productId?: string;
  }>();

  const [status, setStatus] = useState<Status>(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );

  useEffect(() => {
    const load = async () => {
      try {
        setErrorMessage('');

        const productsRes = checkResponse(await fetch('api/products.json'));
        const products: Product[] = await productsRes.json();

        const product = products.find(p => p.itemId === productId);

        if (!product) {
          throw new NotFoundError('Product not found');
        }

        const detailsRes = checkResponse(
          await fetch(`api/${product.category}.json`),
        );

        const details: ProductDetails[] = await detailsRes.json();
        const pDetails = details.find(p => p.id === productId);

        if (!pDetails) {
          throw new NotFoundError('Product details not found');
        }

        pDetails.product = product;

        const sProducts = products
          .filter(p => p.category.toLowerCase() === pDetails.category)
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        setProductDetails(pDetails);
        setSuggestedProducts(sProducts);
        setStatus(STATUS.SUCCESS);
      } catch (err) {
        if (err instanceof NotFoundError) {
          setStatus(STATUS.NOT_FOUND_PRODUCT);
        } else if (err instanceof ServerError) {
          setErrorMessage(`Server error (${err.status})`);
          setStatus(STATUS.ERROR);
        } else {
          setErrorMessage('Something went wrong');
          setStatus(STATUS.ERROR);
        }
      }
    };

    load();
  }, [productId]);

  switch (status) {
    case STATUS.LOADING:
      return <Loader />;

    case STATUS.NOT_FOUND_PRODUCT:
      return <NotFoundPage type="product" />;

    case STATUS.ERROR:
      return <ErrorMessage errorMessage={errorMessage} />;

    case STATUS.SUCCESS:
      return (
        <ProductDetailsView
          suggestedProducts={suggestedProducts}
          productDetails={productDetails!}
        />
      );

    default:
      return null;
  }
};

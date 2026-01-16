import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../shared/components/Loader';
import { checkResponse, wait } from '../shared/utils/apiHelper';
import { Product } from '../shared/types/Product';
import { ProductDetails } from '../shared/types/ProductDetails';
import ErrorMessage from '../shared/components/ErrorMessage/ErrorMessage';
import { NotFoundProduct } from '../NotFoundProduct';
import { STATUS, Status } from '../shared/utils/status';
import { NotFoundError, ServerError } from '../shared/utils/errorTypes';
import { ProductDetailsView } from './ProductDetailsView/ProductDetailsView';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{
    productId?: string;
  }>();

  const [status, setStatus] = useState<Status>(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );

  useEffect(() => {
    const load = async () => {
      try {
        setStatus(STATUS.LOADING);
        setErrorMessage('');

        await wait(500);

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

        setProductDetails(pDetails);
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
      return <NotFoundProduct />;

    case STATUS.ERROR:
      return <ErrorMessage errorMessage={errorMessage} />;

    case STATUS.SUCCESS:
      return <ProductDetailsView productDetails={productDetails!} />;

    default:
      return null;
  }
};

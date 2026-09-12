import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import {ProductDetails} from '../../components/Content/ProductDetails';
import {Loader} from '../../components/Loader';
import {Products} from '../../type/Productes';
import {fetchDetails, getProducts} from '../../api';
import {Details} from '../../type/Details';

export const ProductDetailsPage = () => {
  const {productId = ''} = useParams();
  const normalizedProductId = productId.replace(/^:/, '');
  const [product, setProduct] = useState<Products>();
  const [details, setDetails] = useState<Details>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Phone Catalog`;
    }
  }, [product]);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);
    setProduct(undefined);
    setDetails(undefined);

    getProducts()
      .then(products => {
        const selectedProduct = products.find(
          item => item.itemId === normalizedProductId,
        );

        if (!selectedProduct) {
          return undefined;
        }

        if (active) {
          setProduct(selectedProduct);
        }

        return fetchDetails(selectedProduct.category, selectedProduct.itemId);
      })
      .then(selectedDetails => {
        if (active && selectedDetails) {
          setDetails(selectedDetails);
        }
      })
      .catch(cause => {
        if (active) {
          setError(cause instanceof Error ? cause.message : 'Unknown error');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [normalizedProductId, requestId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div role="alert">
        <h1>Could not load product</h1>
        <p>{error}</p>
        <button type="button" onClick={() => setRequestId(id => id + 1)}>
          Try again
        </button>
      </div>
    );
  }

  if (!product || !details) {
    return (
      <div>
        <h1>Product not found</h1>
        <p>The requested product does not exist or is no longer available.</p>
        <Link to="/">Return to catalog</Link>
      </div>
    );
  }

  const categoryName =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <ProductDetails
      backUrl={product.category}
      details={details}
      path={[categoryName, product.name]}
    />
  );
};

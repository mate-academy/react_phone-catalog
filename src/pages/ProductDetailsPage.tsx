/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ProductItem } from '../types/ProductItem';
import { Loader } from '../components/Loader/Loader';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const getItemInfo = async (id: string | undefined) => {
    const fetchJson = await fetch(`${BASE_URL}/products/${id}.json`);
    const data = await fetchJson.json();

    return data;
  };

  useEffect(() => {
    setLoading(true);
    getItemInfo(itemId)
      .then(productInfo => {
        setProduct(productInfo);
      })
      .finally(() => setLoading(false));
  }, []);

  // const productName = product?.name.replace(/\u2122/g, '');

  return (
    <>
      <div className="page Breadcrumbs">
        <Link to="/" className="page__iconContainer">
          <div className="page__iconContainer--icon" />
        </Link>
        <span className="arrow arrow--right-disabled" />
        <span className="page__text">
          {`${pathname.slice(1, 2).toUpperCase() + pathname.slice(2)}`}
        </span>
      </div>

      {loading && <Loader />}

      {!loading && (
        <div className="productInfo">
          <div className="productInfo_photoContainer">
            <img src={`../_new/${product?.images[0]}`} alt={product?.name} />
          </div>
          <div className="productInfo_baseInfo">
            <p>{product?.name}</p>
          </div>
        </div>
      )}

    </>
  );
};

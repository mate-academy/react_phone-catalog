/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { ProductDetails } from '../types/ProductDetails';
import { Loader } from '../components/Loader/Loader';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { SuggestedProducts } from '../components/SuggestedProducts/SuggestedProducts';
import { Details } from '../components/Details/Details';
import { GoBackButton } from '../components/GoBackButton/GoBackButton';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [isError, setIsError] = useState(false);

  const getItemInfo = async (id: string | undefined) => {
    const fetchJson = await fetch(`${BASE_URL}/products/${id}.json`);
    const data = await fetchJson.json();

    return data;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemId]);

  useEffect(() => {
    setLoading(true);
    setIsError(false);

    getItemInfo(itemId)
      .then(productInfo => {
        setProduct(productInfo);
        setCurrentImage(productInfo.images[0]);
      })
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, [itemId]);

  useEffect(() => {
    const splitedItemId = itemId?.split('-');

    setCurrentCapacity(splitedItemId?.slice(-2, -1).toString().toUpperCase() || '');
    setCurrentColor(splitedItemId?.slice(-1).toString() || '');
  }, [itemId]);

  const path = pathname.slice(1, 2).toUpperCase() + pathname.slice(2);
  const slashIndex = path.indexOf('/');
  const pathLink = path.slice(0, slashIndex);

  const rout = `/${pathLink.toLocaleLowerCase()}/${itemId?.split('-').slice(0, -2).join('-')}`;

  return (
    <div className="container">
      <Breadcrumbs pathname={pathLink} name={product?.name || ''} />
      <GoBackButton />

      {loading && <Loader />}
      {isError && (
        <h2 className="noResults">
          Sorry, there is no phone with a given Id on the server.
        </h2>
      )}
      {!loading && !isError && product && (
        <>
          <Details
            product={product}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            rout={rout}
            currentCapacity={currentCapacity}
            currentColor={currentColor}
          />
          <SuggestedProducts />
        </>
      )}
    </div>
  );
};

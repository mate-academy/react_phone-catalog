import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { ProductDetailsInfo } from '../../components/ProductDetailsInfo';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ErrorNotification } from '../../components/ErrorNotification';
import { getDetails } from '../../features/selectedProductSlice';
import { Slider } from '../../types/Slider';

export const ProductDetailsPage = () => {
  const { loaded, isError } = useAppSelector(state => state.selectedProduct);
  const dispatch = useAppDispatch();

  const { productId = '' } = useParams();

  useEffect(() => {
    dispatch(getDetails(productId));
  }, [productId]);

  return (
    <>
      {loaded ? (
        <>
          <Breadcrumbs />

          <BackButton />

          {isError ? (
            <ErrorNotification error={isError} />
          ) : (
            <>
              <ProductDetailsInfo />

              <ProductsSlider type={Slider.SUGGESTIONS} />
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

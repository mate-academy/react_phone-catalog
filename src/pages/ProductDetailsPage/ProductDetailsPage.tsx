import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../helpers/getData';
import { ErrorContext } from '../../helpers/ErrorContext';
import { ErrorText } from '../../types/ErrorText';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { Loader } from '../../components/Loader';
import { ProductDetails } from '../../components/ProductDetails';

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const { setError } = useContext(ErrorContext);
  const [details, setDetails] = useState<ProductDetailsType | null>(null);
  const [isLoad, setIsLoad] = useState(false);

  const loadDetail = async () => {
    try {
      setIsLoad(true);
      const currentDetails = await getProductDetail(productId);

      setDetails(currentDetails);
    } catch {
      setError(ErrorText.LOAD_ProductDetails);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [productId]);

  return (
    isLoad
      ? (<Loader />)
      : (
        <>
          <ProductDetails
            details={details}
          />
        </>
      )
  );
};

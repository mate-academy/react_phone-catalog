import {
  useContext, useEffect, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { getProductDetails } from 'src/api/products';
import { ProductContext } from 'src/contexts/ProductContext';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { getRandomId } from 'src/utils/helpers';
import { DetailsContent } from './DetailsContent';

export const ProductsDetails = () => {
  const products = useContext(ProductContext);
  const [
    selectedProductDetails,
    setSelectedProductDetails,
  ] = useState<ProdcutDetails>();
  const location = useLocation();
  const arrOfLocation = location.pathname.split('/').filter(a => !!a);
  const selectedProductId = arrOfLocation.at(-1);
  const [isLoader, setIsLoader] = useState(false);

  const fetchDetails = async (productId: string) => {
    try {
      setIsLoader(true);
      const data = await getProductDetails(productId);

      setSelectedProductDetails(data);
      setIsLoader(false)

      return data;
    } catch {
      setIsLoader(false); // TODO: error page handler
    }

    return 0;
  };

  useEffect(() => {
    if (arrOfLocation.length > 1 && selectedProductId) {
      fetchDetails(selectedProductId);
    }
  }, [selectedProductId]);

  const selectedProductGeneralInfo = products
    .find(el => el.id === selectedProductId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProductDetails]);

  return (
    <>
      {isLoader
        ? <div>Loader</div>
        : (
          selectedProductDetails && selectedProductGeneralInfo && (
            <DetailsContent
              selectedProductGeneralInfo={selectedProductGeneralInfo}
              selectedProductDetails={
                { ...selectedProductDetails, id: getRandomId() }
              }
            />
          )
        )}
    </>
  );
};

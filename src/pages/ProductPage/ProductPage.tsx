import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

export const ProductPage = () => {
  const { handleActiveProduct, activeProduct } = useContext(AppContext)!;
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      handleActiveProduct(productId);
    }
  }, [productId, handleActiveProduct]);

  return (
    <div className="container">
      <Breadcrumbs productName={activeProduct?.name} />

      <div>
        Phone: {activeProduct?.name}
        Price: {activeProduct?.priceRegular}
      </div>
    </div>
  );
};

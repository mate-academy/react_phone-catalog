import { useParams } from 'react-router-dom';
import { Category } from '../enums/Category';
import { getGadgets } from '../utils/fetchMethods';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Gadgets } from '../types/ContextType/Gadgets';

import { Loader } from '../components/Loader';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { StateContext } from '../store/StateProvider';

type Props = {
  type: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ type }) => {
  const { productId } = useParams<{ productId: string }>();
  const { setImageProduct } = useContext(StateContext);
  const [categoryProduct, setCategoryProduct] = useState<Gadgets>();

  useEffect(() => {
    async function fetchData() {
      const response = await getGadgets(type);

      let detailsProduct;

      if (response) {
        detailsProduct = response.find(item => item.id === productId);

        if (detailsProduct) {
          setCategoryProduct(detailsProduct);
          setImageProduct(detailsProduct.images[0]);
        }
      }
    }

    fetchData();
  }, [type, productId]);

  return (
    <>
      {!categoryProduct ? (
        <Loader />
      ) : (
        <ProductDetails type={type} product={categoryProduct} />
      )}
    </>
  );
};

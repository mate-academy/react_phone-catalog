import { useEffect, useReducer } from 'react';
import {
  productDetailsActionInitialState,
  productDetailsReducer,
} from '../reducers/productDetailsReducer';
import { getCategory } from '@/api/api';
import { useLocation, useParams } from 'react-router-dom';
import { Categories } from '@/types/Categories';

export const useProductDetails = () => {
  const [productDetailsState, productDetailsDispatch] = useReducer(
    productDetailsReducer,
    productDetailsActionInitialState,
  );

  const { pathname } = useLocation();
  const { productId } = useParams();

  const category = pathname.split('/').at(-2) as Categories;

  useEffect(() => {
    const fetchProductsDetails = async () => {
      try {
        productDetailsDispatch({ type: 'FETCH_START' });

        const productsDetailsResponse = await getCategory(category);

        const product = productsDetailsResponse.find(
          item => item.id === productId,
        );

        productDetailsDispatch({
          type: 'FETCH_SUCCESS',
          payload: product ? product : null,
        });
      } catch {
        productDetailsDispatch({ type: 'FETCH_ERROR' });
      }
    };

    fetchProductsDetails();
  }, [category, productId]);

  return productDetailsState;
};

import { AppDispatch } from '../store';
import { setError, setLoading, setProducts } from './productsSlice';
import { getProducts } from '../../api/api';

export const getProductsAction = () => (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    setTimeout(() => {
      getProducts()
        .then((products) => {
          dispatch(setProducts(products));
        })
        .catch((e) => {
          dispatch(setError(`Error - ${e}`));
        });
    }, 500);

    dispatch(setLoading(false));
    dispatch(setError(''));
  } catch (e) {
    dispatch(setError(`Error - ${e}`));
    dispatch(setLoading(false));
  }
};

import { useEffect } from 'react';
import { getProdutcs } from '../api/api';
import { useStateContext } from '../state/state';
import { ActionTypes } from '../enums/action-types.enum';
import { useParams } from 'react-router-dom';

export const useLoadProducts = () => {
  const { state, dispatch } = useStateContext();
  const { category } = useParams();

  useEffect(() => {
    if (state.products.length > 0) {
      return;
    }

    const loadProducts = async () => {
      dispatch({ type: ActionTypes.FETCH_PRODUCTS_REQUEST });

      try {
        const data = await getProdutcs();

        dispatch({ type: ActionTypes.FETCH_PRODUCTS_SUCCESS, payload: data });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: ActionTypes.FETCH_PRODUCTS_FAILURE,
            payload: error.message,
          });
        } else {
          dispatch({
            type: ActionTypes.FETCH_PRODUCTS_FAILURE,
            payload: 'An unknown error occurred',
          });
        }
      }
    };

    loadProducts();
  }, [dispatch, state, category]);
};

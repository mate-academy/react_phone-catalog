import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../store/productsSlice';
import { getProducts } from '../api/products';

export const useFetchProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        dispatch(setProducts(data));
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProducts();
  }, [dispatch]);
};

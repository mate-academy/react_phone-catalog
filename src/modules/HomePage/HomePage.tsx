//#region imports
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLoading } from '../shared/hooks/useLoading';
import {
  HomePageContent,
  HomePageSkeleton,
} from './components/HomePageContent';
import { loadProducts } from '../../store/slices/productsSlice';
import { ErrorPage } from './components/ErrorPage';
//#endregion

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const {
    items,
    isLoading: productLoading,
    isError: productError,
  } = useAppSelector(state => state.products);
  const delay = useLoading();

  const isLoading = productLoading || delay;
  const isError = !isLoading && (productError || items.length === 0);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadProducts());
    }
  }, [items.length, dispatch]);

  return (
    <>
      {isError && <ErrorPage />}

      {isLoading && <HomePageSkeleton />}

      {!isLoading && !isError && <HomePageContent />}
    </>
  );
};

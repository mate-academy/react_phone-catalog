import './PhonesPage.scss';
import { ProductsList } from '../../components/ProductsList';
import { init as phonesFetch } from '../../features/phonesSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const { phones } = useAppSelector(state => state.phones);

  useEffect(() => {
    dispatch(phonesFetch());
  }, [dispatch]);

  return (
    <>
      <ProductsList products={phones} category="Phones" />
    </>
  );
};

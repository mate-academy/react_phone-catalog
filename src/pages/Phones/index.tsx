import { FC, useEffect } from 'react';
import './PhonesPage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPhones } from '../../features/phonesSlice';
import { Catalog } from '../../components/Catalog';

export const PhonesPage: FC = () => {
  const dispatch = useAppDispatch();

  const { phones } = useAppSelector(state => state.phones);

  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  return (
    <div className="phones">
      <h1>Phones Page</h1>

      <Catalog products={phones} />
    </div>
  );
};

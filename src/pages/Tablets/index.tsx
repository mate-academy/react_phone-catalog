import { FC, useEffect } from 'react';
import './TabletsPage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchTablets } from '../../features/tabletsSlice';
import { Catalog } from '../../components/Catalog';

export const TabletsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { tablets } = useAppSelector(state => state.tablets);

  useEffect(() => {
    dispatch(fetchTablets());
  }, [dispatch]);

  return (
    <div className="tablets">
      <h1>Tablets Page</h1>

      <Catalog products={tablets} />
    </div>
  );
};

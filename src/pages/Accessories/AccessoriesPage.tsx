import React, { useEffect } from 'react';
import './AccessoriesPage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAccessories } from '../../features/accessoriesSlice';
import { Catalog } from '../../components/Catalog';

export const AccessoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { accessories } = useAppSelector(state => state.accessories);

  useEffect(() => {
    dispatch(fetchAccessories());
  }, [dispatch]);

  return (
    <div className="accessories">
      <h1>Accessories Page</h1>

      <Catalog products={accessories} />
    </div>
  );
};

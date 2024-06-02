import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './modules/shared/hooks/hooks';
import { useEffect } from 'react';
import * as productAction from './features/ProductSlice';
import './App.scss';
export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productAction.fetchProduct());
  }, [dispatch]);

  return (
    <div className="App" id="nuv">
      <Outlet />
    </div>
  );
};

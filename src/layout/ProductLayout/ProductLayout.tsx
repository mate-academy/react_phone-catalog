import { Outlet } from 'react-router-dom';
import { Path } from '../../components/Path/Path';

export const ProductLayout = () => {
  return (
    <div>
      <div>
        <Path />
      </div>
      <Outlet />
    </div>
  );
};

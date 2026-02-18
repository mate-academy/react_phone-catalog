import { Outlet } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import type { FC } from 'react';

export const CartLayout: FC = () => {
  return (
    <div className="">
      <BackButton className="mt-10" />
      <Outlet />
    </div>
  );
};

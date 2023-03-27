import { FC } from 'react';
import './HotPrices.scss';

export const HotPrices: FC = ({ children }) => {
  return (
    <>
      <h1 className="page__title">
        Hot prices
      </h1>
      {children}
    </>
  );
};

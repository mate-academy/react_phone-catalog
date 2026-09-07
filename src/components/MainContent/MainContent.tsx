/* eslint-disable max-len */

import { Category } from '../Category';
import { HotPrice } from '../HotPrice';
import { Product } from '../Product';
import './MainContent.scss';

export const MainContent = () => {
  return (
    <div className="main-content">
      <Product />
      <Category />
      <HotPrice />
    </div>
  );
};

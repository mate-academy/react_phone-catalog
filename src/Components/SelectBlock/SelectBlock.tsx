import React from 'react';
import { SelectPerPage } from './SelectPerPage';
import { SelectByType } from './SelectByType';
import { useLocation } from 'react-router-dom';
import { Search } from '../Search/Search';
import { Product } from '../../types/Product';

import './SelectBlock.scss';

type Props = {
  visibleProducts: Product[];
};

export const SelectBlock: React.FC<Props> = ({ visibleProducts }) => {
  const { pathname } = useLocation();

  const searchField =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories' ||
    pathname === '/favorites';

  return (
    <div className="select">
      <div className="select__container">
        {searchField && <Search />}

        {!!visibleProducts.length && (
          <>
            <SelectByType />
            <SelectPerPage />
          </>
        )}
      </div>
    </div>
  );
};

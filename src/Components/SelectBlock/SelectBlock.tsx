import React from 'react';
import { SelectPerPage } from './SelectPerPage';
import { SelectByType } from './SelectByType';
import { Product } from '../../types/Product';

import './SelectBlock.scss';

type Props = {
  visibleProducts: Product[];
};

export const SelectBlock: React.FC<Props> = ({ visibleProducts }) => {
  return (
    <div className="select">
      <div className="select__container">
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

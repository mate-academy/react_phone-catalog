import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-pagination-bar';
import { Products } from '../../../types/Products';
import { PerPage } from '../../../types/ItemsPerPage';
import '../../../../src/App';

interface Props {
  products: Products[];
  perPage: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const Paginations: React.FC<Props> = ({
  products,
  perPage,
  currentIndex,
  setCurrentIndex,
}) => {
  const [onPage, setOnPage] = useState(0);

  useEffect(() => {
    if (perPage === PerPage.All) {
      setOnPage(1);
    } else {
      setOnPage(+perPage);
    }
  }, [perPage, onPage]);

  return (
    <div className="paginations">
      <Pagination
        currentPage={currentIndex}
        itemsPerPage={onPage}
        onPageChange={index => setCurrentIndex(index)}
        totalItems={products.length}
        pageNeighbours={2}
        prevLabel={'<'}
        nextLabel={'>'}
        customClassNames={{
          rpbItemClassName: 'custom-item',
          rpbItemClassNameActive: 'custom-item--active',
          rpbItemClassNameDisable: 'custom-item--disable',
          rpbRootClassName: 'custom-root',
        }}
      />
    </div>
  );
};

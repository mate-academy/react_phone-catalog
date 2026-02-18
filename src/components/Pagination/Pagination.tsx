import { Pagination } from '@heroui/react';
import React from 'react';

type Props = {
  total: number; // кількість сторінок
  page: number; // поточна сторінка
  onChange: (page: number) => void;
};

export const ProductsPagination: React.FC<Props> = ({
  total,
  page,
  onChange,
}) => {
  return (
    <div className="flex justify-center py-6">
      <Pagination
        page={page}
        total={total}
        siblings={1}
        boundaries={1}
        showControls
        radius="full"
        variant="bordered"
        onChange={onChange}
        classNames={{
          item: 'font-mont',
        }}
      />
    </div>
  );
};

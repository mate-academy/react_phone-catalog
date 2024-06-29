/* eslint-disable  @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC } from 'react';

import { Pagination as GenericPagination } from '../../../shared/Pagination';
import { usePageQuery } from '../../hooks/usePageQuery';
import { getInRange } from '../../../../utils/getInRange';

type Props = Omit<
  ComponentPropsWithoutRef<typeof GenericPagination>,
  'select' | 'currentSelectedIndex' | 'nextButton' | 'prevButton' | 'crumbs'
>;

export const Pagination: FC<Props> = ({ pageCount, ...props }) => {
  const [page, setPageQuery] = usePageQuery();
  const validPageIndex = getInRange(page, 1, pageCount) - 1;

  return (
    <GenericPagination
      {...props}
      currentSelectedIndex={validPageIndex}
      pageCount={pageCount}
      select={setPageQuery}
      nextButton={<GenericPagination.NextButton />}
      prevButton={<GenericPagination.PrevButton />}
      crumbs={<GenericPagination.Crumbs take={4} />}
    />
  );
};

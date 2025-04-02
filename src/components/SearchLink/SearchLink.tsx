import React, { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../helpers/searchHelper';

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  params: SearchParams;
  className?: string;
};

export const SearchLink: React.FC<Props> = ({
  children,
  isDisabled = false,
  params,
  className = '',
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{ search: getSearchWith(searchParams, params) }}
      // onClick={}
      aria-disabled={isDisabled}
      className={className}
    >
      {children}
    </Link>
  );
};

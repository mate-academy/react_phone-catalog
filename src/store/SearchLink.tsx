import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import React from 'react';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink = ({ children, params, ...props }: Props) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return (
    <Link
      to={{ search: getSearchWith(searchParams, params) }}
      {...props} // copy all the other props
    >
      {children}
    </Link>
  );
};

import React, { memo } from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../helpers/searchHelpers';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams,
};

export const SearchLink: React.FC<Props> = memo(({
  children,
  params,
  ...props
}) => {
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
});

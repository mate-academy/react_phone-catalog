import { FC } from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';

import { SearchParams, getSearchWith } from '@utils/helpers/searchHelpers';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink: FC<Props> = ({ children, params, ...props }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(params, searchParams),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

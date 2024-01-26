import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { SearchParamsType } from '../types';
import { getSearchWith } from '../helpers';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParamsType,
};

export const SearchLink: React.FC<Props> = ({
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
};

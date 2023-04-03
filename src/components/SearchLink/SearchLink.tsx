import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/calc/helper';
import { SearchParams } from '../../types/SearchParams';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams,
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

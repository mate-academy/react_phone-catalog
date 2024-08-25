import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../helpers/getSearchWith';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: '.',
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

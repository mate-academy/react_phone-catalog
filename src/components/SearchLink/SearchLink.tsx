import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../helpers/getSearchWith';

type Props = Omit<LinkProps, 'to'> & {
  newParams: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  newParams,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link {...props} to={{ search: getSearchWith(searchParams, newParams) }}>
      {children}
    </Link>
  );
};

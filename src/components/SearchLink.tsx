import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, CustomSearchParams } from '../helpers/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: CustomSearchParams,
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

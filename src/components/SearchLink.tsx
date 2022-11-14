import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../helpers/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams,
  setIsSortOpened: (value: boolean) => void,
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  setIsSortOpened,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
      onClick={() => {
        setIsSortOpened(false);
      }}
    >
      {children}
    </Link>
  );
};

import { LinkProps, NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

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
    <NavLink
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </NavLink>
  );
};

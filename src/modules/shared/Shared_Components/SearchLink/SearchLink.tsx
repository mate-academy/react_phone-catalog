import { Link, LinkProps, useLocation } from 'react-router-dom';
import {
  getSearchWith,
  SearchParams,
} from '../ProductPage/utils/getSearchWith';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink = ({ children, params, ...props }: Props) => {
  const { search } = useLocation();

  return (
    <Link to={{ search: getSearchWith(params, search) }} {...props}>
      {children}
    </Link>
  );
};

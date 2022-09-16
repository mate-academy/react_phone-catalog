import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../helpers/searchHelper';

/**
 * To replace the the standard `Link` we take all it props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams,
  setIsSortOpened: (value: boolean) => void,
};

/**
 * SearchLink updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  children, // this is the content between the open and closing tags
  params, // the params to be updated in the `search`
  setIsSortOpened,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      // to={{ search: getSearchWith(searchParams, { query: 'sdf' }) }}
      // to={{ search: getSearchWith(searchParams, { query: null }) }}
      // to={{ search: getSearchWith(searchParams, { centuries: ['16', '18'] }) }}
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props} // copy all the other props
      onClick={() => {
        setIsSortOpened(false);
      }}
    >
      {children}
    </Link>
  );
};

import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, CustomSearchParams } from '../helpers/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: CustomSearchParams,
};

export const SearchLink: React.FC<Props> = ({
  children, // this is the content between the open and closing tags
  params, // the params to be updated in the `search`
  ...props // all usual Link props like `className`, `style` and `id`
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
    >
      {children}
    </Link>
  );
};

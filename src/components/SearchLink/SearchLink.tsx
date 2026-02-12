import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/search/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  disabled?: boolean;
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  disabled = false,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  if (disabled) {
    return (
      <span aria-disabled={true} {...props}>
        {children}
      </span>
    );
  }

  return (
    <Link to={{ search: getSearchWith(searchParams, params) }} {...props}>
      {children}
    </Link>
  );
};

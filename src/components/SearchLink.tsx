import { Link, LinkProps, useLocation } from 'react-router-dom';

export type SearchParams = {
  [key: string]: string | string[] | null;
};

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export function getSearchWith(
  paramsToUpdate: SearchParams,
  search?: string | URLSearchParams,
): string {
  const newParams = new URLSearchParams(search);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(part => {
        newParams.append(key, part);
      });
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}

export const SearchLink = ({ children, params, ...props }: Props) => {
  const { search } = useLocation();

  return (
    <Link to={{ search: getSearchWith(params, search) }} {...props}>
      {children}
    </Link>
  );
};

import { Link, LinkProps, useSearchParams } from 'react-router-dom';

type Props = Omit<LinkProps, 'to'> & {
  params: {
    [key: string]: string | string[] | null;
  };
};

export function getSearchWith(
  searchParasm: URLSearchParams,
  params: {
    [key: string]: string | string[] | null;
  },
): string {
  const newParams = new URLSearchParams(searchParasm);

  Object.entries(params).filter(([key, value]) => {
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

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const [serachParams] = useSearchParams();

  return (
    <Link to={{ search: getSearchWith(serachParams, params) }} {...props}>
      {children}
    </Link>
  );
};

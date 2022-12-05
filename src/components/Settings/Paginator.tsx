import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { updateSearch } from '../../helpers/updateSearch';

type Props = {
  pagesList: number[];
};

export const Paginator:FC<Props> = ({ pagesList }) => {
  const [searchParams] = useSearchParams();

  return (
    <ul>
      <li>
        <button
          type="button"
          aria-label="paginator-prev"
        >
          prev
        </button>
      </li>
      {pagesList.map(page => (
        <li key={page}>
          <Link
            to={{ search: updateSearch(searchParams, { page: `${page}` }) }}
          >
            {page}
          </Link>
        </li>
      ))}
      <li>
        <button
          type="button"
          aria-label="paginator-next"
        >
          next
        </button>
      </li>
    </ul>
  );
};

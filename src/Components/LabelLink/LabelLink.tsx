import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelpers';

type PropTypes = {
  currentPage: number;
  value: string;
};

export const LabelLink: React.FC<PropTypes> = ({ currentPage, value }) => {
  const [searchParams] = useSearchParams();

  const getSearch = ((title: string) => {
    switch (title) {
      case '>':
        return getSearchWith(searchParams, {
          page: `${currentPage + 1}`,
        });

      case '<':
        return getSearchWith(searchParams, {
          page: `${currentPage - 1}`,
        });

      default:
        return getSearchWith(searchParams, {
          page: `${currentPage}`,
        });
    }
  });

  return (
    <Link
      to={{
        search: getSearch(value),
      }}
    >
      {value}
    </Link>
  );
};

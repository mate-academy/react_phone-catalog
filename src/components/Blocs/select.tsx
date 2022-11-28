import React from 'react';

import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  to: string | null
  text: string
  setopenSort: (x: boolean) => void
  setSortBy: (x: string) => void
  sortParams: string
}

const OptionsInSelect: React.FC<Props> = ({
  to,
  text,
  setopenSort,
  setSortBy,
  sortParams,
}) => {
  const [searchParams] = useSearchParams();
  const searchParam = { [sortParams]: to, page: null };

  return (
    <Link
      to={{
        search: getSearchWith(
          searchParams,
          searchParam,
        ),
      }}
      type="button"
      className="selectBlock__option"
      onClick={() => {
        setopenSort(false);
        setSortBy(text);
      }}
    >
      {text}
    </Link>
  );
};

type SelectProps = {
  name: string,
  setopenSort: (x: boolean) => void,
  openSort: boolean,
  text: string,
  setSortBy: (x: string) => void,
  options: ({
    to: string | null
    textOption: string
  } | null)[]
  sortParams: string
};

export const Select: React.FunctionComponent<SelectProps> = ({
  name,
  setopenSort,
  openSort,
  text,
  setSortBy,
  options,
  sortParams,
}) => {
  return (
    <div className="selectBlock">
      <h5>{name}</h5>
      <button
        type="button"
        className="selectBlock__select"
        onClick={() => {
          setopenSort(!openSort);
        }}
      >
        {text}
      </button>
      <div
        className={classNames(
          'selectBlock__options',
          { none: !openSort },
        )}
      >
        {options.map(option => {
          if (option === null) {
            return null;
          }

          const { to, textOption } = option;

          return (
            <OptionsInSelect
              to={to}
              text={textOption}
              setopenSort={setopenSort}
              setSortBy={setSortBy}
              sortParams={sortParams}
            />
          );
        })}
      </div>
    </div>
  );
};

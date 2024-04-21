import './Search.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import { IconType } from '../../types/IconTypes';
import { Icon } from '../Icon';

interface Props {
  searchName: string;
  onBlur?: () => void;
  onDelete?: () => void;
  showSearchIcon?: boolean;
}

export const Search: React.FC<Props> = ({
  searchName,
  onBlur = () => {},
  onDelete = () => {},
  showSearchIcon = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParameter = searchParams.get(searchName) || '';

  return (
    <div className="search">
      <input
        type="text"
        value={searchParameter}
        className="search__input"
        placeholder="Search product"
        onChange={(event) => {
          setSearchParams(
            getSearchWith({
              [searchName]: event.target.value || null,
            }, searchParams),
          );
        }}
        onBlur={onBlur}
      />

      {(searchParameter || !showSearchIcon) && (
        <button
          type="button"
          data-cy="searchDelete"
          aria-label="delete query"
          className="search__delete-button"
          onClick={() => {
            onDelete();

            setSearchParams(
              getSearchWith({ [searchName]: null }, searchParams),
            );
          }}
        >
          <Icon iconType={IconType.close} />
        </button>
      )}

      {!searchParameter && showSearchIcon && (
        <Icon iconType={IconType.search} />
      )}
    </div>
  );
};

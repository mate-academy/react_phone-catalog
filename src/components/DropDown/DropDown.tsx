import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchWith';

import './DropDown.scss';
import { SortOption } from '../../types/SortOption';

type Props = {
  currentOption: string;
  searchName: string;
  options: SortOption[];
};

function getLabel(
  options: SortOption[],
  value: string,
): string | undefined {
  const option = options.find(selection => selection.value === value);

  return option ? option.label : undefined;
}

export const DropDown: React.FC<Props> = ({
  options,
  currentOption,
  searchName,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div className={classNames('dropdown', { 'is-active': expanded })}>
      <div className="dropdown-trigger">
        <button
          type="button"
          className={classNames('button button--dropdown dropdown', {
            'button--dropdown-focus': expanded,
          })}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setExpanded((current) => !current);
          }}
        >
          <span className="dropdown__current">
            {getLabel(options, currentOption) || 'Choose a option'}
          </span>

          <span className="icon icon--arrow--gray--down" />
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <ul
          className={classNames('dropdown__list', {
            'dropdown__list--visible': expanded,
          })}
        >
          {options.map(({ label, value }) => (
            <Link
              key={value}
              to={{
                search: getSearchWith(searchParams, { [searchName]: value }),
              }}
              className="dropdown__link"
              onClick={() => setExpanded(false)}
            >
              {label}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import './DropDown.scss';
import { PerPageOptions } from '../types/PerPageOptions';
import { SearchParamsKeys } from '../types/SearchParamsKeys';

type Props = {
  title: string;
  values: string[];
  sortKey: string;
  onPageChange?: (page: number) => void;
};

export const DropDown: React.FC<Props> = ({
  title,
  values,
  sortKey,
  onPageChange,
}) => {
  const [showList, setShowList] = useState(false);
  const [searchParams] = useSearchParams();
  const param = searchParams.get(sortKey);
  const pageParam = searchParams.get(SearchParamsKeys.page);
  const [buttonValue, setButtontValue] = useState(param || values[0]);
  const dropDownSelect = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (dropDownSelect.current
        && !dropDownSelect.current.contains(event.target as Node)
        && event.clientX < document.documentElement.offsetWidth) {
        setShowList(false);
      }
    };

    document.addEventListener('mousedown', onClick);

    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function handleParamChange(value: string) {
    const newParams = new URLSearchParams(searchParams);

    if ((pageParam && param !== value)
      || (value !== PerPageOptions.all
        && sortKey === SearchParamsKeys.perPage)) {
      newParams.set(SearchParamsKeys.page, '1');
    }

    if (value !== PerPageOptions.all) {
      newParams.set(sortKey, value);
    } else {
      newParams.delete(sortKey);
      newParams.delete(SearchParamsKeys.page);
    }

    return newParams.toString();
  }

  function handleChangeValue(value: string) {
    setButtontValue(value);
    setShowList(false);

    if (onPageChange) {
      onPageChange(1);
    }
  }

  return (
    <div className="drop-down">
      <span className="drop-down__title">
        {title}
      </span>

      <div ref={dropDownSelect}>
        <button
          type="button"
          className={classNames(
            'drop-down__button',
            { 'drop-down__button--active': showList },
          )}
          onClick={() => setShowList(current => !current)}
        >
          {buttonValue}
        </button>

        {showList && (
          <ul className="drop-down__list">
            {values.map(value => (
              <li className="drop-down__item" key={value}>
                <Link
                  className="drop-down__item-link"
                  to={{ search: handleParamChange(value) }}
                  onClick={() => handleChangeValue(value)}
                >
                  {value}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import './Select.scss';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { OptionsForSort } from '../../types/OptionsForSort';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../types/SearchParams';
import { DEF_START_PAGE } from '../../helpers/consts';

type Props = {
  options: { key: OptionsForSort, name: OptionsForSort }[],
  searchParam: SearchParams,
};

export const Select: React.FC<Props> = ({
  options, searchParam,
}) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get(searchParam) || '';
  const ref = useRef<HTMLDivElement>(null);

  const handlerClickSelect = () => {
    setIsShowing(current => !current);
  };

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (ref.current && !ref.current?.contains(target as Node)) {
      setIsShowing(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="select" ref={ref}>
      <button
        type="button"
        className="select__button"
        onClick={handlerClickSelect}
      >
        <p>
          {options.find(op => op.key === sort)?.name || 'Choose param'}
        </p>

        <div className={classNames(
          'select__arrow', { 'arrow-top': isShowing },
        )}

        />
      </button>

      <div className="select__options">
        {isShowing && options.map(option => {
          const { key, name } = option;

          return (
            <SearchLink
              key={key}
              params={{
                [searchParam]: key,
                [SearchParams.PageNumber]: `${DEF_START_PAGE}`,
              }}
              className="select__button select__option"
              onClick={handlerClickSelect}
            >
              {name}
            </SearchLink>
          );
        })}
      </div>
    </div>
  );
};

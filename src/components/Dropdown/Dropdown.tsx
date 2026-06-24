import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { useLocation } from 'react-router-dom';
import './bulmaScoped.scss';

type Option = {
  value: string;
  title: string;
};

type Params = Record<string, Option>;

type AdditionalParam = {
  name: string;
  defaultValue: string;
};

type Props = {
  searchParamsConfig: { main: string; additional?: AdditionalParam };
  items: Params;
  defaultValue: Option;
};

export const Dropdown: React.FC<Props> = ({
  items,
  defaultValue,
  searchParamsConfig: searchParamNames,
}) => {
  const { search } = useLocation();

  const searchParams = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  const [expanded, setExpanded] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const selectedItem = useMemo(() => {
    return (
      Object.values(items).find(
        item => item.value === searchParams.get(searchParamNames.main),
      ) || defaultValue
    );
  }, [defaultValue, items, searchParams, searchParamNames]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const buildParams = (value: string) => {
    const params: Record<string, string> = {
      [searchParamNames.main]: value,
    };

    if (
      searchParamNames.additional &&
      !searchParams.has(searchParamNames.additional.name)
    ) {
      params[searchParamNames.additional.name] =
        searchParamNames.additional.defaultValue;
    }

    return params;
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => !prev);
  };

  return (
    <div className="bulma-scope">
      <div
        className={classNames('bulma-scope', 'dropdown', styles.dropdown, {
          [styles.dropdown_active]: expanded,
          'is-active': expanded,
        })}
        ref={ref}
      >
        <div className={classNames('dropdown-trigger', styles.box)}>
          <button
            type="button"
            className={classNames('button', styles.button)}
            style={{
              border: 'none',
              borderRadius: '0',
              justifyContent: 'space-between',
            }}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleToggleDropdown}
          >
            <span>{selectedItem?.title || 'Choose a sort param'}</span>
            <span className="icon is-small">
              <i
                className={classNames('fas fa-angle-down', styles.arrow)}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
        <div
          className={classNames('dropdown-menu', styles.options)}
          id="dropdown-menu"
          role="menu"
        >
          <div className={classNames('dropdown-content', styles.option_box)}>
            {Object.values(items).map(item => (
              <SearchLink
                key={item.value}
                params={buildParams(item.value)}
                className={classNames('dropdown-item', styles.option, {
                  [styles.option_active]: item.value === selectedItem.value,
                })}
                onClick={() => setExpanded(false)}
              >
                {item.title}
              </SearchLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

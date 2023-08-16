import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';
import { getSearchWith } from '../../utils/searchHelper';
import './DropdownSelect.scss';

type Props = {
  paramName: string;
  label: string;
};

type Option = {
  props: {
    value: string,
    children: string,
  }
};

export const DropdownSelect: React.FC<Props> = ({
  children,
  paramName,
  label,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectValue = searchParams.get(paramName) || '';

  const options = useMemo(() => {
    return React.Children.toArray(children) as Option[];
  }, []);

  const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  const handleSetValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = {
      [paramName]: event.target.value,
    };

    setSearchParams(
      getSearchWith(searchParams, params),
    );
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsActive(active => !active);
  };

  const handleLinkClick = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (!ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
  }, [isActive]);

  return (
    <div
      ref={ref}
      className={classNames(
        'DropdownSelect',
        { 'is-active': isActive },
      )}
    >
      <label
        htmlFor={paramName}
        className="DropdownSelect__label"
      >
        {label}
        <select
          name={paramName}
          id={paramName}
          className="DropdownSelect__select"
          value={selectValue}
          onChange={handleSetValue}
          onMouseDown={handleToggleDropdown}
        >
          {children}
        </select>

        <ul>
          {options.map(({ props }) => (
            <li key={props.value}>
              <SearchLink
                params={{ [paramName]: props.value, page: '1' }}
                onClick={handleLinkClick}
              >
                {props.children}
              </SearchLink>
            </li>
          ))}
        </ul>
      </label>
    </div>
  );
};

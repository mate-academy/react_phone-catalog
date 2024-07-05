import { Link, useSearchParams } from 'react-router-dom';
import './Dropdown.scss';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { getSearchWith } from '../../../../../utils/searchHelper';
import classNames from 'classnames';
import { useClickOutside } from '../../../../../utils/useClickOutside';
import { getIconSrc } from '../../../../../helpers/getIconSrc';
/* eslint-disable max-len */
import {
  ThemeContext,
  ThemeType,
} from '../../../../../contexts/ThemeContext/ThemeContext';

type Props = {
  values: { name: string; title: string }[];
  param: string;
  label: string;
};

export const Dropdown: React.FC<Props> = ({ values, param, label }) => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedItem = useMemo(() => {
    const currentParam = searchParams.get(param) || values[0].title;

    return values.find(item => item.name === currentParam) || values[0];
  }, [searchParams, param, values]);

  useClickOutside(
    menuRef,
    () => {
      if (isOpen) {
        setIsOpen(false);
      }
    },
    buttonRef,
  );

  return (
    <div className="dropdown">
      <span className="dropdown__label small-text">{label}</span>

      <button
        className={classNames('dropdown__select buttons-text', {
          'dropdown__select--focus': isOpen,
          dark: theme === ThemeType.DARK,
        })}
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
      >
        <p className="dropdown__select-title">{selectedItem.title}</p>
        <img
          src={getIconSrc(isOpen ? 'arrow-up' : 'arrow-down', theme)}
          alt="close dpordown"
          className="icon"
        />
      </button>

      {isOpen && (
        <div className="dropdown__menu" ref={menuRef}>
          {values.map(sort => (
            <Link
              key={sort.name}
              to={{
                search: getSearchWith(
                  { [param]: sort.name, ['page']: null },
                  searchParams,
                ),
              }}
              className="dropdown__menu-item"
              onClick={() => setIsOpen(!isOpen)}
            >
              {sort.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

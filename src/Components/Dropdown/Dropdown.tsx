import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  title: string;
  items: string[];
  initialItem: string;
  isForItemsOnPage: boolean;
};

export const Dropdown: React.FC<Props> = ({
  title,
  items,
  initialItem,
  isForItemsOnPage,
}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleItemClick = (value: string) => {
    setSelectedItem(value);
    setIsVisible(false);

    if (!isForItemsOnPage) {
      setSearchWith({ sortBy: value === 'Newest' ? null : value });
    } else {
      setSearchWith({ perPage: value === 'all' ? null : value });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <p className="dropdown__title">{title}</p>
      <div className="dropdown__triger">
        <button
          className="dropdown__button"
          onClick={() => setIsVisible(!isVisible)}
        >
          <span className="dropdown__text">
            {selectedItem ? selectedItem : initialItem}
          </span>
          <div className="dropdown__icon">
            <div className="dropdown__icon__down"></div>
          </div>
        </button>
      </div>

      <div
        className={classNames('dropdown__menu', {
          'dropdown__menu--is-active': isVisible,
        })}
      >
        <div className="dropdown__menu--content">
          {items.map(content => (
            <p
              className="dropdown__menu--item"
              key={content}
              onClick={() => handleItemClick(content)}
            >
              {content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';

import './SelectOptions.scss';

interface SelectOptionsProps {
  onSortChange?: (sortBy: string) => void;
  onItemsPerPageChange?: (itemsPerPage: string | number) => void;
  initialSort?: string;
  initialItemsPerPage?: string | number;
}

export const SelectOptions: React.FC<SelectOptionsProps> = ({
  onSortChange,
  onItemsPerPageChange,
  initialSort = 'Newest',
  initialItemsPerPage = '16',
}) => {
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [selectedItems, setSelectedItems] = useState<string | number>(
    initialItemsPerPage,
  );
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [isItemsOpen, setIsItemsOpen] = useState<boolean>(false);

  const sortOptions: string[] = ['Newest', 'Alphabetically', 'Cheapest'];
  const itemsOptions: (string | number)[] = [4, 8, 16, 'all'];

  useEffect(() => {
    setSelectedSort(initialSort);
  }, [initialSort]);

  useEffect(() => {
    setSelectedItems(initialItemsPerPage);
  }, [initialItemsPerPage]);

  const handleSortSelect = (optionName: string) => {
    setSelectedSort(optionName);
    setIsSortOpen(false);
    onSortChange?.(optionName);
  };

  const handleItemsSelect = (optionQuantity: string | number) => {
    setSelectedItems(optionQuantity);
    setIsItemsOpen(false);
    onItemsPerPageChange?.(optionQuantity);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target.closest('.select__menu')) {
      setIsSortOpen(false);
      setIsItemsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="select">
      <div
        className="select__menu"
        onClick={() => {
          setIsSortOpen(!isSortOpen);
          setIsItemsOpen(false);
        }}
      >
        <div className="select__name">Sort by</div>
        <div
          className={`select__active select__active--sort ${isSortOpen ? 'select__active--open' : ''}`}
        >
          {selectedSort}
        </div>
        <ul
          className={`select__options
            select__options--sort
            ${isSortOpen ? 'select__options--open' : 'select__options--closed'}`}
        >
          {sortOptions.map((optionName, index) => (
            <li
              key={index}
              className="select__option"
              onClick={() => handleSortSelect(optionName)}
            >
              {optionName}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="select__menu"
        onClick={() => {
          setIsItemsOpen(!isItemsOpen);
          setIsSortOpen(false);
        }}
      >
        <div className="select__name">Items on page</div>
        <div
          className={`select__active select__active--items ${isItemsOpen ? 'select__active--open' : ''}`}
        >
          {selectedItems}
        </div>
        <ul
          className={`select__options
            select__options--items
            ${isItemsOpen ? 'select__options--open' : 'select__options--closed'}`}
        >
          {itemsOptions.map((optionQuantity, index) => (
            <li
              key={index}
              className="select__option"
              onClick={() => handleItemsSelect(optionQuantity)}
            >
              {optionQuantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

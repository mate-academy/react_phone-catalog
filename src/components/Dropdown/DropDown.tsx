import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { GoChevronDown } from 'react-icons/go';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './DropDown.module.scss';
import { useTheme } from '../ThemeContext/ThemeContext';

interface DropdownItem {
  id: string;
  name: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  onSelect?: (id: string) => void;
  setSort: (arg: string) => void;
  searchParams: URLSearchParams;
}

export const DropDown: React.FC<DropdownProps> = ({
  id,
  title = 'Select',
  data,
  onSelect,
  setSort,
  searchParams,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const { theme } = useTheme();

  const handleChange = (item: DropdownItem) => {
    if (onSelect) {
      onSelect(item.id);
    }

    setSort(item.name);
    setIsOpen(false);
  };

  useEffect(() => {
    if (id === '0') {
      const sortParam = searchParams.get('sortBy');
      const newSelectedItem = data.find(item => item.name === sortParam);

      setSelectedItem(newSelectedItem || null);
    } else if (id === '1') {
      const countParam = searchParams.get('count');
      const newSelectedItem = data.find(item => item.name === countParam);

      setSelectedItem(newSelectedItem || null);
    }
  }, [searchParams, data, id]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  return (
    <>
      <div
        ref={dropdownRef}
        className={classNames([styles.select_container], {
          [styles.dropdown_button_first]: id === '0',
        })}
      >
        <button
          id={id}
          aria-label="Toggle dropdown"
          aria-haspopup="true"
          aria-expanded={isOpen}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={classNames([styles.dropdown_button], {
            [styles.dropdown_button_first]: id === '0',
          })}
        >
          <span>{selectedItem?.name || title}</span>
          <GoChevronDown
            className={classNames([styles.dropdown_arrow], {
              [styles.rotate_180]: isOpen,
            })}
          />
        </button>
        {/* Open */}
        {isOpen && (
          <div
            aria-label="Dropdown menu"
            className={classNames(`${styles.main_option_container}`, {
              [styles.dropdown_button_first]: id === '0',
            })}
          >
            <ul
              role="menu"
              aria-labelledby={id}
              aria-orientation="vertical"
              className={`${styles.dropdown_list}`}
            >
              {data?.map(item => (
                <li
                  key={item.id}
                  onClick={() => handleChange(item)}
                  className={classNames([styles.dropdown_item], {
                    [styles.dropdown_item_hover_dark]: theme === 'dark',
                    [styles.dropdown_button_first_hover]: id === '0',
                  })}
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

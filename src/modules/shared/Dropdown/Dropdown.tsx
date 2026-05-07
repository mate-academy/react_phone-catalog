import { useEffect, useRef, useState } from 'react';
import type { SelectOption } from '../../../types/SelectOption';
import s from './Dropdown.module.scss';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';
import { getDropdownParams } from '../../../utils/getDropdownParams';

type Props = {
  options: SelectOption[];
  value: string;
  paramKey: string;
};

export const Dropdown = ({ options, value, paramKey }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={s.select} ref={selectRef}>
      <button
        type="button"
        className={classNames([
          s.select__trigger,
          {
            [s['select__trigger--open']]: isOpen,
          },
        ])}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selectedOption?.label}
      </button>

      {isOpen && (
        <ul className={s.select__dropdown}>
          {options.map(option => (
            <li key={option.value} className={s.select__option}>
              <Link
                className={s.select__optionLink}
                to={{
                  search: getSearchWith(
                    searchParams,
                    getDropdownParams({
                      paramKey,
                      optionValue: option.value,
                      options,
                    }),
                  ),
                }}
                onClick={() => setIsOpen(false)}
              >
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

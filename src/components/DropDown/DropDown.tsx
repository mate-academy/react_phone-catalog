/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import classes from './DropDown.module.scss';

type Sort = { name: string; key: string };

type Props = {
  title: string;
  options: Sort[];
  init: string;
  changeParams?: (params: string) => void;
};

export const DropDown: React.FC<Props> = ({
  title,
  options,
  init,
  changeParams = () => {},
}) => {
  const [selectedOption, setSelectedOption] = useState<Sort | null>(null);
  const [open, setOpen] = React.useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const celectedItem = options.find(item => item.key === init) || null;

    setSelectedOption(celectedItem);
  }, [init, options]);

  const handleSelectOption = (item: Sort) => {
    setSelectedOption(item);
    setOpen(false);
    changeParams(item.key);
  };

  return (
    <div className={classes.DropDown}>
      <h4 className={classes.DropDown__title}>{title}</h4>

      <div ref={ref}>
        <button
          type="button"
          className={classNames(classes.DropDown__select, {
            [classes['DropDown__select--open']]: open,
          })}
          onClick={() => setOpen(!open)}
        >
          {selectedOption?.name}
        </button>

        <div className={classes['DropDown__list-wrapper']}>
          <ul
            className={classNames(classes.DropDown__list, {
              [classes['DropDown__list--open']]: open,
            })}
          >
            {options.map(option => (
              <li key={option.key}>
                <button
                  type="button"
                  className={classNames(classes.DropDown__item, {
                    [classes['DropDown__item--selected']]:
                      selectedOption?.key === option.key,
                  })}
                  onClick={() => handleSelectOption(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './CustomSelect.scss';
import { Images } from '../../../images';
import * as Types from '../../../types';
import * as Service from '../../../utils/service';

type Props = {
  startParams: Types.DropDownValue;
  type: Types.DropDown;
  itemsCount?: number;
  onChange: (value: Types.DropDownValue) => void;
};

export const CustomSelect: React.FC<Props> = ({
  startParams,
  type,
  itemsCount = null,
  onChange,
}) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const dropDown = useRef<HTMLDivElement | null>(null);

  const handleChangeValue = useCallback(
    (value: Types.DropDownValue) => {
      onChange(value);
      setSelectOpen(false);
    },
    [onChange],
  );

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (dropDown.current && !dropDown.current.contains(event.target as Node)) {
      setSelectOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  return (
    <div
      className={classNames('select', {
        select__perPage: type === Types.DropDown.PerPage,
      })}
    >
      <p className="small-text select__title">
        {type === Types.DropDown.Sort ? 'Sort by' : 'Items on page'}
      </p>

      <div ref={dropDown}>
        <div
          className={classNames('buttons select__button', {
            'select__button--focus': selectOpen,
            'select__button--hover': !selectOpen,
          })}
          onClick={() => setSelectOpen(!selectOpen)}
        >
          <p className="select__button--text">{startParams.label}</p>

          <img
            src={Images.Arrow.Default}
            className={classNames('select__button--arrow', {
              'select__button--arrow-open': selectOpen,
            })}
          />
        </div>

        <div
          className={classNames('select__dropdown', {
            'select__dropdown--open': selectOpen,
          })}
        >
          {Service.getParamsForDropDown(itemsCount).map(param => (
            <p
              key={param.value}
              className="body-text select__dropdown--item"
              onClick={() => handleChangeValue(param)}
            >
              {param.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect, useCallback, useRef } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SelectOption } from '../../types/SelectOption';

interface Props {
  paramsKey?: string;
  options: SelectOption[];
  selectedOption?: SelectOption;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const Select: React.FC<Props> = ({
  paramsKey,
  options,
  selectedOption = options[0],
  searchParams,
  setSearchParams,
}) => {
  const [activeOption, setActiveOption] = useState(selectedOption);
  const [isSelectActive, setIsSelectActive] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const clickAwayHandler = useCallback(
    ({ target }) => {
      if (selectRef.current && !selectRef.current.contains(target)) {
        setIsSelectActive(false);
      }
    },
    [setIsSelectActive]
  );

  useEffect(() => {
    document.addEventListener('mousedown', clickAwayHandler);

    return () => {
      document.removeEventListener('mousedown', clickAwayHandler);
    };
  }, [clickAwayHandler]);

  const selectOption = useCallback(
    (option: SelectOption) => {
      setActiveOption(option);

      if (!paramsKey) {
        return;
      }

      const params = new URLSearchParams(searchParams);

      params.set(paramsKey, option.value);
      setSearchParams(params);
    },
    [paramsKey, searchParams]
  );

  return (
    <div
      className={cn('select', { 'select--active': isSelectActive })}
      onMouseDown={() => setIsSelectActive(!isSelectActive)}
      ref={selectRef}
    >
      <div className="select__label">{activeOption.name}</div>
      <div className="select__list">
        {options.map((option) => (
          <div
            className={cn('select__item', {
              'select__item--active': option.id === activeOption.id,
            })}
            onMouseDown={() => selectOption(option)}
            key={option.id}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import style from './Selector.module.scss';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../../types/SearchParams';

type Props = {
  searchParamName: string;
  options: string[];
  defaultValue?: number;
};
export const Selector: React.FC<Props> = ({
  searchParamName,
  options,
  defaultValue = 0,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [visible, setVisible] = useState(false);
  const [selection, setSelection] = useState(defaultValue);

  const selectBodyRef = useRef<HTMLInputElement>(null);
  const selectButtonRef = useRef<HTMLInputElement>(null);

  const handleSelect = (index: number) => {
    setVisible(() => false);
    setSelection(() => index);

    const params = new URLSearchParams(searchParams);

    params.set(searchParamName, options[index]);
    params.delete(SearchParams.page);
    setSearchParams(params);
  };

  const handleClicks = (eve: MouseEvent) => {
    if (selectBodyRef.current && selectButtonRef.current) {
      if (selectButtonRef.current?.contains(eve.target as Node)) {
        setVisible(prev => !prev);
      } else if (!selectBodyRef.current?.contains(eve.target as Node)) {
        setVisible(false);
      }
    }
  };

  useEffect(() => document.addEventListener('click', handleClicks), []);

  useEffect(() => {
    const curIndex = options.findIndex(
      opt => opt === searchParams.get(searchParamName),
    );

    if (curIndex >= 0) {
      setSelection(curIndex);

      return;
    }

    setSelection(defaultValue);
  }, [searchParams, defaultValue, options, searchParamName]);

  return (
    <div className={classNames(style.selector_container)}>
      <div
        ref={selectButtonRef}
        className={classNames(style.selector_button)}
      >
        <p className={classNames(style.selector_button_title)}>
          {options[selection]}
        </p>

        <div className={classNames(style.icon_container)}>
          <div
            className={classNames(style.icon, {
              [style.icon_down]: !visible,
              [style.icon_up]: visible,
            })}
          />
        </div>
      </div>

      <div className={classNames(style.selector_body_container)}>
        <div
          ref={selectBodyRef}
          className={classNames(style.selector_body, {
            [style.selection_hidden]: visible,
          })}
        >
          {options.map((opt, index) => {
            return (
              <p
                key={index}
                className={classNames(style.selector_body__text)}
                onClick={() => {
                  handleSelect(index);
                }}
              >
                {opt}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

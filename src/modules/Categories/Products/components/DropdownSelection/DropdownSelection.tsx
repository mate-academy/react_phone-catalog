/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../../../../../context/SearchContext';
import { Button } from './components/Button';
import { Dropdown } from './components/Dropdown';
import styles from './DropdownSelection.module.scss';
import { Props } from './types/Props';

export const DropdownSelection = <T extends string>({
  title,
  buttonValue,
  searchParam,
  searchParamStr,
  enumValues,
  defaultEnumValue,
  setButtonValue,
}: Props<T>) => {
  const { getSearchWith, transformToSearchValue } = useContext(SearchContext);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // #region handlers

  const setFocusHandler = useCallback(() => {
    if (isFocused) {
      setIsFocused(false);

      return;
    }

    setIsFocused(true);
  }, [isFocused]);

  // #endregion
  // #region useEffects

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    if (isFocused) {
      addEventListener('click', clickOutsideHandler);

      return () => removeEventListener('click', clickOutsideHandler);
    }

    return;
  }, [isFocused]);

  useEffect(() => {
    if (!searchParam) {
      setButtonValue(defaultEnumValue);
    } else {
      const result = enumValues.find(value => {
        const moddedValue = transformToSearchValue(value);

        if (moddedValue === searchParam) {
          setButtonValue(value);

          return true;
        }

        return false;
      });

      if (result === undefined) {
        navigate({
          search: getSearchWith({
            [searchParamStr]: transformToSearchValue(defaultEnumValue),
          }),
        });
      }
    }
  }, [searchParam]);

  // #endregion

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles['content-wrapper']} ref={dropdownRef}>
        <Button
          isFocused={isFocused}
          setFocusHandler={setFocusHandler}
          buttonValue={buttonValue}
        />

        <Dropdown
          searchParamStr={searchParamStr}
          isFocused={isFocused}
          enumValues={enumValues}
          searchParam={searchParam}
          buttonValue={buttonValue}
          setFocusHandler={setFocusHandler}
        />
      </div>
    </div>
  );
};

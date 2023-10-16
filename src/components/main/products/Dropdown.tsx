import classNames from 'classnames';
import {
  useEffect, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  SORT_KEY, PER_PAGE_KEY, PAGE_KEY,
} from '../../../helpers/constants/SearchParamsKeys';
import { DropdownId } from '../../../helpers/enums/DropdownId';
import { DropdownOption } from '../../../helpers/types/DropdownOption';

type DropdownProps = {
  id: DropdownId
  description: string
  options: DropdownOption[]
};

export const Dropdown = (
  { id, description, options }: DropdownProps,
) => {
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const [isBlured, setIsBlured] = useState(false);
  const [wasKeyPressed, setWasKeyPressed] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const secondOptionRef = useRef<HTMLButtonElement>(null);
  const thirdOptionRef = useRef<HTMLButtonElement>(null);
  const fourthOptionRef = useRef<HTMLButtonElement>(null);

  const selectClasses = classNames('dropdown__select', {
    'dropdown__select--big': id === DropdownId.features,
    'dropdown__select--small': id === DropdownId.pages,
  });
  const arrowClasses = classNames('dropdown__arrow-icon', {
    'dropdown__arrow-icon--big': id === DropdownId.features,
    'dropdown__arrow-icon--small': id === DropdownId.pages,
  });
  const optionsClasses = classNames('dropdown__list', {
    'dropdown__list--big': id === DropdownId.features,
    'dropdown__list--small': id === DropdownId.pages,
  });
  const imageSource = `img/arrows/arrow-${areOptionsVisible ? 'up' : 'down'}-dropdown.svg`;
  const dropdownKey = id === DropdownId.features ? SORT_KEY : PER_PAGE_KEY;
  const selectedValue = searchParams.get(dropdownKey);

  const selectedText = options.find(
    option => option.value === selectedValue,
  )?.text;

  const handleSelectClick = () => {
    if (!isBlured) {
      setAreOptionsVisible(!areOptionsVisible);
    }
  };

  const handleOptionClick = (value: string) => {
    setAreOptionsVisible(false);

    const keyName = id === DropdownId.features ? SORT_KEY : PER_PAGE_KEY;

    searchParams.set(keyName, value);

    if (keyName === PER_PAGE_KEY) {
      if (value === 'all') {
        searchParams.delete(PAGE_KEY);
      } else {
        searchParams.set(PAGE_KEY, '1');
      }
    }

    setSearchParams(searchParams);
  };

  const handleBlur = () => {
    if (!wasKeyPressed) {
      setIsBlured(true);
      setAreOptionsVisible(false);
      setFocusedOptionIndex(-1);
      window.setTimeout(() => setIsBlured(false), 500);
    }
  };

  if (searchParams.get(dropdownKey) === null) {
    searchParams.set(dropdownKey, options[0].value);
    setSearchParams(searchParams);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    setWasKeyPressed(true);

    const { key } = event;
    const isKeyUp = key === 'ArrowUp';
    const isKeyDown = key === 'ArrowDown';
    const isEnter = key === 'Enter';
    const isEsc = key === 'Escape';
    const isPagesDropdown = id === DropdownId.pages;

    if (areOptionsVisible && (isKeyUp || isKeyDown || isEnter || isEsc)) {
      event.preventDefault();

      switch (focusedOptionIndex) {
        case 0:
          if (isKeyDown) {
            secondOptionRef.current?.focus();
            setFocusedOptionIndex(prevIndex => prevIndex + 1);
          }

          break;
        case 1:
          if (isKeyUp) {
            firstOptionRef.current?.focus();
            setFocusedOptionIndex(prevIndex => prevIndex - 1);
          } else if (isKeyDown) {
            thirdOptionRef.current?.focus();
            setFocusedOptionIndex(prevIndex => prevIndex + 1);
          }

          break;
        case 2:
          if (isKeyUp) {
            secondOptionRef.current?.focus();
            setFocusedOptionIndex(prevIndex => prevIndex - 1);
          } else if (isKeyDown && isPagesDropdown) {
            fourthOptionRef.current?.focus();
            setFocusedOptionIndex(prevIndex => prevIndex + 1);
          }

          break;
        case 3:
          if (isKeyUp && isPagesDropdown) {
            thirdOptionRef.current?.focus();
            setFocusedOptionIndex(prevIndex => prevIndex - 1);
          }

          break;
        default:
          break;
      }

      if (isEnter) {
        handleOptionClick(options[focusedOptionIndex].value);
      }

      if (isEsc) {
        handleSelectClick();
      }
    }

    setWasKeyPressed(false);
  };

  useEffect(() => {
    if (areOptionsVisible) {
      setFocusedOptionIndex(0);

      if (firstOptionRef !== null) {
        firstOptionRef.current?.focus();
      }
    }
  }, [areOptionsVisible]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [areOptionsVisible, focusedOptionIndex]);

  return (
    <div className="dropdown">
      <p className="dropdown__title">{description}</p>

      <button
        className={selectClasses}
        type="button"
        onClick={handleSelectClick}
      >
        <div className="dropdown__select-content">
          <p
            className="dropdown__select-text"
          >
            {selectedText}
          </p>
        </div>

        <img
          className={arrowClasses}
          src={imageSource}
          alt="Dropdown arrow"
        />
      </button>

      {areOptionsVisible && (
        <div className={optionsClasses}>
          {options.map((selectOption, index) => {
            const { text, value } = selectOption;
            let optionRef;

            switch (index) {
              case 1:
                optionRef = secondOptionRef;
                break;
              case 2:
                optionRef = thirdOptionRef;
                break;
              case 3:
                optionRef = fourthOptionRef;
                break;
              default:
              case 0:
                optionRef = firstOptionRef;
                break;
            }

            return (
              <button
                className="dropdown__option"
                key={text}
                value={value}
                type="button"
                onMouseDown={() => handleOptionClick(value)}
                ref={optionRef}
                onBlur={handleBlur}
              >
                {text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

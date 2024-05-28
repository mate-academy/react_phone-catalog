import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

interface CustomSelectProps {
  options?: { label: string; value: string }[];
  defoultValue?: string;
  selectHandler?: (value: string) => void;
  optionsPerPage?: string[];
  defoultValuePerPage?: string;
  selectPerPage?: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defoultValue,
  selectHandler,
  optionsPerPage,
  selectPerPage,
  defoultValuePerPage,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [valuePerPage, setValuePerPage] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [indexPerPage, setIndexPerPage] = useState(-1);
  const [indexSort, setIndexSort] = useState(-1);
  const customRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOptionPerPage = optionsPerPage ? optionsPerPage.length : 4;
  const isOption = options ? options.length : 3;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setShowMenu(true);
        setIndexPerPage(prevIndex => (prevIndex + 1) % isOptionPerPage);
        setIndexSort(prevIndex => (prevIndex + 1) % isOption);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setShowMenu(true);
        setIndexPerPage(
          prevIndex => (prevIndex - 1 + isOptionPerPage) % isOptionPerPage,
        );
        setIndexSort(prevIndex => (prevIndex - 1 + isOption) % isOption);
        break;
      case 'Enter':
        if (showMenu && indexPerPage >= 0) {
          event.preventDefault();
          const selectedOptionPerPage =
            optionsPerPage && optionsPerPage[indexPerPage];

          if (selectedOptionPerPage && selectPerPage) {
            selectPerPage(selectedOptionPerPage);
            setValuePerPage(selectedOptionPerPage);
          }

          setShowMenu(false);
          setIndexPerPage(-1);
        }

        if (showMenu && indexSort >= 0) {
          const selectedOption = options && options[indexSort];

          if (selectedOption && selectHandler) {
            selectHandler(selectedOption.value);
            setSortValue(selectedOption.label);
          }
        }

        break;
      case 'Escape':
        setShowMenu(false);
        setIndexPerPage(-1);
        setIndexSort(-1);
        break;
      default:
        break;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      customRef.current &&
      !customRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return options && selectHandler ? (
    <div className="customSelect" ref={customRef}>
      <input
        readOnly
        className="customSelect__select"
        onKeyDown={handleKeyDown}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        placeholder={sortValue ? sortValue : defoultValue}
        aria-haspopup="listbox"
        aria-expanded={showMenu}
        ref={inputRef}
      />

      {!showMenu && (
        <div
          className="customSelect__img-box"
          onClick={() => {
            setShowMenu(true);
            inputRef.current?.focus();
          }}
        >
          <img
            src="img/Chevron(ArrowDown).png"
            className="customSelect__down-icon"
          />
        </div>
      )}

      {showMenu && (
        <div
          className="customSelect__img-box"
          onKeyDown={handleKeyDown}
          onClick={() => {
            setShowMenu(false);
            inputRef.current?.focus();
          }}
        >
          <img
            src="img/Chevron(ArrowUp).png"
            className="customSelect__up-icon"
          />
        </div>
      )}

      {showMenu && (
        <div className="customSelect__dropdown-menu">
          {options.map((opt, index) => (
            <div
              className={classNames('customSelect__dropdown-option', {
                highlighted: indexSort === index,
              })}
              key={opt.value}
              onClick={() => {
                setIndexSort(index);
                selectHandler(opt.value);
                setSortValue(opt.label);
                setShowMenu(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    optionsPerPage && selectPerPage && (
      <div className="customSelect" ref={customRef}>
        <input
          readOnly
          className="customSelect__select"
          onKeyDown={handleKeyDown}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          placeholder={valuePerPage ? valuePerPage : defoultValuePerPage}
          aria-haspopup="listbox"
          aria-expanded={showMenu}
          ref={inputRef}
        />

        {!showMenu && (
          <div
            className="customSelect__img-box"
            onClick={() => {
              setShowMenu(true);
              inputRef.current?.focus();
            }}
          >
            <img
              src="img/Chevron(ArrowDown).png"
              className="customSelect__down-icon"
            />
          </div>
        )}

        {showMenu && (
          <div
            className="customSelect__img-box"
            onClick={() => {
              setShowMenu(false);
              inputRef.current?.focus();
            }}
          >
            <img
              src="img/Chevron(ArrowUp).png"
              className="customSelect__up-icon"
              onClick={() => {
                setShowMenu(false);
              }}
            />
          </div>
        )}

        {showMenu && (
          <div className="customSelect__dropdown-menu">
            {optionsPerPage.map((opt, index) => (
              <div
                className={classNames('customSelect__dropdown-option', {
                  highlighted: indexPerPage === index,
                })}
                key={opt}
                onClick={() => {
                  selectPerPage(opt);
                  setValuePerPage(opt);
                  setShowMenu(false);
                  setIndexPerPage(index);
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

import { useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import './SortDropdown.scss';
import cn from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/Categories';

type Props = {
  label: string,
  defaultOption?: string,
  options: { [key: string]: string, },
  searchParam: SearchParams,
};

export const SortDropdown: React.FC<Props> = ({
  label,
  defaultOption,
  options,
  searchParam,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentOption = searchParams.get(searchParam) || '';
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelectOption = (newParam: { [key: string]: string }) => {
    if (searchParams.toString().includes(SearchParams.Page)) {
      setSearchParams(getSearchWith({
        ...newParam,
        [SearchParams.Page]: '1',
      }, searchParams));
    } else {
      setSearchParams(getSearchWith(newParam, searchParams));
    }

    setIsSelectOpen(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (
      event.relatedTarget
      && event.relatedTarget?.className.includes('select-option')
    ) {
      return;
    }

    setIsSelectOpen(false);
  };

  return (
    <div className="SortDropdown">
      <label htmlFor="triger" className="SortDropdown__label">
        {label}
      </label>

      <button
        id="triger"
        type="button"
        className="SortDropdown__triger"
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        onBlur={handleBlur}
      >

        {currentOption && (
          Object.keys(options)
            .find(key => options[key] === currentOption)
        )}

        {!currentOption && (
          defaultOption ? `${defaultOption}` : 'Choose option'
        )}

        <div className={cn('icon icon--down', {
          icon__rotate: isSelectOpen,
        })}
        />
      </button>

      {isSelectOpen && (
        <div className="SortDropdown__select">
          {Object.entries(options).map(([key, value]) => (
            <button
              type="button"
              onClick={() => handleSelectOption({ [searchParam]: value })}
              className="SortDropdown__select-option"
              key={key}
            >
              {key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

SortDropdown.defaultProps = {
  defaultOption: '',
};

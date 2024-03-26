import cn from 'classnames';
import { useState } from 'react';
import { SearchLink } from '../SearchLink';

import './DropDown.scss';

type DropParams = {
  sort?: string;
  perPage?: string | null;
};

type DropDownElement = {
  title: string;
  params: DropParams;
};

type Props = {
  title: string;
  dropDownArrayData: DropDownElement[];
  startedValue?: string;
};

export const DropDown: React.FC<Props> = ({
  title,
  dropDownArrayData,
  startedValue,
}) => {
  let initialDropDownValue = dropDownArrayData[0].title;

  if (startedValue && startedValue !== '0') {
    initialDropDownValue = startedValue;
  }

  if (startedValue === 'age') {
    initialDropDownValue = dropDownArrayData[0].title;
  }

  if (startedValue === 'name') {
    initialDropDownValue = dropDownArrayData[1].title;
  }

  if (startedValue === 'price') {
    initialDropDownValue = dropDownArrayData[2].title;
  }

  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialDropDownValue);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropDownActive(false);
    }
  };

  return (
    <div
      className={cn('dropdown', { 'is-active': isDropDownActive })}
      onBlur={handleBlur}
    >
      <div className="dropdown__label">{title}</div>
      <div className="dropdown__trigger">
        <button
          type="button"
          className="dropdown__button"
          onClick={() => setIsDropDownActive(!isDropDownActive)}
        >
          <span className="dropdown__title">{selectedItem}</span>
          <span>
            <i
              className={cn('ico', {
                'ico-down': !isDropDownActive,
                'ico-up': isDropDownActive,
              })}
            />
          </span>
        </button>
      </div>

      <div className="dropdown__menu">
        {dropDownArrayData.map(el => {
          return (
            <SearchLink
              params={el.params}
              className="dropdown__item"
              onClick={() => {
                setIsDropDownActive(false);
                setSelectedItem(el.title);
              }}
              key={el.title}
            >
              {el.title}
            </SearchLink>
          );
        })}
      </div>
    </div>
  );
};

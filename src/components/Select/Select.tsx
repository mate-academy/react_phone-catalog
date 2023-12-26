import { useRef } from 'react';
import './Select.scss';

type PropertyListType = string | number;

type Props = {
  label: string,
  property: string | number,
  searchName: string,
  setSearchWith: (key: string, value: string | number) => void,
  propertyList: PropertyListType[],
};

export const Select: React.FC<Props> = ({
  label, property, searchName,
  setSearchWith,
  propertyList,
}) => {
  const dropdown = useRef<HTMLUListElement>(null);
  const selectBtn = useRef<HTMLButtonElement>(null);

  const onSelectBtnBlur = () => {
    if (dropdown) {
      dropdown.current?.classList.remove('select__dropdown--visible');
    }

    if (selectBtn) {
      selectBtn.current?.classList.remove('select__button--active');
    }
  };

  const onSelectBtnClick = () => {
    if (dropdown) {
      dropdown.current?.classList.toggle('select__dropdown--visible');
    }

    if (selectBtn) {
      selectBtn.current?.classList.toggle('select__button--active');
    }
  };

  return (
    <div className="select__wrapper">
      <p className="select__label">
        {label}
      </p>

      <button
        ref={selectBtn}
        type="button"
        aria-label="select-button"
        name="sortBy"
        id="sortBy"
        className="select__button"
        onClick={onSelectBtnClick}
        onBlur={onSelectBtnBlur}
      >
        {property}
      </button>
      <ul className="select__dropdown" ref={dropdown}>
        {propertyList.map(prop => (
          <li key={prop}>
            <button
              type="button"
              className="select__option"
              onMouseDown={() => setSearchWith(searchName, prop)}
            >
              {prop}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

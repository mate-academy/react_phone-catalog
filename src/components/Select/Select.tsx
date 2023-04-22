import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './Select.scss';
import { SearchLink } from '../../helpers/searchLink';
import { Option } from '../../types/Option';

type Props = {
  options: Option[];
  width: number;
  height: number;
  subTitle: string;
  paramsName: string;
  initialName: string;
};

const Select: React.FC<Props> = ({
  width,
  height,
  subTitle,
  options,
  paramsName,
  initialName,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currName, setCurrName] = useState(initialName);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (selectRef.current
        && !selectRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectRef]);

  const onToggleHandle = () => {
    setIsActive(currIsActive => !currIsActive);
  };

  const onSelectHandle = (value: string) => {
    setCurrName(value);
    onToggleHandle();
  };

  return (
    <div className="select" ref={selectRef}>
      <span className="select__subtitle">
        {subTitle}
      </span>
      <div className="select__wrapper" style={{ width, height }}>
        <button
          type="button"
          className="select__button"
          onClick={onToggleHandle}
        >
          {currName}
          {isActive
            ? <img src="./icons/upDis.svg" alt="icon" />
            : <img src="./icons/downDis.svg" alt="icon" />}
        </button>

        {isActive && (
          <ul className="select__list">
            {options.map(({ name, value }) => (
              <li key={value}>
                <SearchLink
                  params={{ [paramsName]: value, page: '1' }}
                  type="button"
                  className={cn(
                    'select__item',
                    { 'select__item--active': currName === name },
                  )}
                  onClick={() => onSelectHandle(name)}
                >
                  {name}
                </SearchLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;

import { useState } from 'react';
import className from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import Arrow_down from '../../icons/Arrow_down.svg';
import Arrow_up from '../../icons/Arrow_up.svg';
import { Filter } from '../../Types/Filter';
import './DropDownMenu.scss';
import { getSearchWith } from '../../helpers/getSearch';

type Props = {
  options: Filter[],
  initialValue: string,
  title: string,
  searchParamsKey: string,
};

const DropDownMenu:React.FC<Props> = ({
  options,
  initialValue,
  title,
  searchParamsKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const toogleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="dropDownMenu__container"
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="dropDownMenu__title">{title }</span>
      <button
        type="button"
        className={className('dropDownMenu__button', {
          'dropDownMenu__button-active': isOpen,
        })}
        onClick={() => toogleOpen()}
      >
        {initialValue}
        {isOpen ? (
          <img
            src={Arrow_up}
            alt=""
            className="dropDownMenu__Arrow-down"
          />
        ) : (
          <img
            src={Arrow_down}
            alt=""
            className="dropDownMenu__Arrow-down"
          />
        )}
      </button>
      {isOpen && (
        <>
          <ul className="dropDownMenu__list">
            {options.map((option) => (
              <li className="dropDownMenu__item" key={option.name}>
                <Link
                  to={{
                    search: getSearchWith({
                      [searchParamsKey]: option.value,
                      page: '1',
                    }, searchParams),
                  }}
                  className="dropDownMenu__item__link"
                >
                  {option.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DropDownMenu;

import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './style.scss';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';
import { Option } from '../../types/Option';

type Props = {
  options: Option[];
  description: string;
};

export const ListSelect: React.FC<Props> = ({ options, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const curValue = searchParams.get(options[0].sortBy) || '';
  const buttonTitle = useMemo(() => {
    return options.find(({ value }) => value === curValue)?.title;
  }, [options, curValue]);

  const toggle = () => {
    setIsOpen(current => !current);
  };

  const handleOptionClick = () => {
    setIsOpen(current => !current);
  };

  return (
    <div className="select">
      <p className="select__description">{description}</p>
      <button
        className={classNames('select__button', {
          'select__button--active': isOpen,
        })}
        type="button"
        onClick={() => toggle()}
      >
        <span>
          {buttonTitle || options[0].title}
        </span>
        <img
          src={`${
            isOpen
              ? './icons/chevron-up.svg'
              : './icons/chevron-down.svg'
          }`}
          alt="Arrow"
          className="select__icon"
        />
      </button>
      {isOpen && (
        <div className="select__options">
          {options.map(option => (
            <SearchLink
              key={option.value}
              params={{ [option.sortBy]: option.value }}
              className="select__option"
              onClick={handleOptionClick}
            >
              {option.title}
            </SearchLink>
          ))}
        </div>
      )}
    </div>
  );
};

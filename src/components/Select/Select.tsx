import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Select.scss';

type Props = {
  currentOption: string;
  setCurrentOption: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
};

export const Select: React.FC<Props> = ({
  currentOption,
  setCurrentOption,
  options,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return (
    <div
      className="Select"
      onMouseLeave={() => setIsSelectOpen(false)}
    >
      <div className="Select__header ">
        <button
          type="button"
          data-cy="selectHeader"
          aria-label="selectHeader"
          className="Select__title text"
          onClick={() => setIsSelectOpen((prevState) => !prevState)}
        >
          {currentOption}
        </button>

        <button
          type="button"
          data-cy="toggle"
          aria-label="toggle"
          className="Select__button"
          onClick={() => setIsSelectOpen((prevState) => !prevState)}
        />
      </div>
      <div className={classNames(
        'Select__body',
        { 'Select__body--is-active': isSelectOpen },
      )}
      >
        {options.map(option => (
          <Link
            to="/phones"
            key={option}
            className="Select__item text text--light"
            onClick={(e) => {
              setIsSelectOpen(false);
              if (e.currentTarget.textContent) {
                setCurrentOption(e.currentTarget.textContent);
              }
            }}
          >
            {option}
          </Link>
        ))}
      </div>
    </div>
  );
};

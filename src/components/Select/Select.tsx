import classNames from 'classnames';
import { useState } from 'react';
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
        <option
          className="Select__title text"
          onClick={() => setIsSelectOpen((prevState) => !prevState)}
        >
          {currentOption}
        </option>
        <button
          type="button"
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
          <option
            key={option}
            value={option}
            className="Select__item text text--light"
            onClick={(e) => {
              setIsSelectOpen(false);
              setCurrentOption(e.currentTarget.value);
            }}
          >
            {option}
          </option>
        ))}
      </div>
    </div>
  );
};

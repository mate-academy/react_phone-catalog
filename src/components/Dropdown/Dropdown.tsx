import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './Dropdown.scss';
import iconVector from '../../helpers/icons/icon_vector_disabled.svg';
import { Option } from '../../helpers/types/Option';

type Props = {
  parameterOptions: Option[],
  currentOptionName: string,
  onChange: (optionName: string) => void,
};

export const Dropdown: React.FC<Props> = ({
  parameterOptions,
  currentOptionName,
  onChange,
}) => {
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (!isSelecting) {
      return;
    }

    const handleDocumentClick = () => {
      setIsSelecting(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isSelecting]);

  const handleSelection = () => {
    setIsSelecting(!isSelecting);
  };

  const handleSelectOption = (selectedOptionName: string) => {
    onChange(selectedOptionName);
    setIsSelecting(false);
  };

  const getAlias = (chosenOptionName: string) => {
    const selectedOption = parameterOptions
      .find(option => option.name === chosenOptionName);

    return selectedOption?.alias;
  };

  return (
    <div className="Dropdown">
      <button
        type="button"
        className={classNames('Dropdown__button', {
          'Dropdown__button--active': isSelecting,
        })}
        onClick={handleSelection}
      >
        <span className="Dropdown__text">
          {getAlias(currentOptionName)}
        </span>

        <img
          src={iconVector}
          alt="Vector Icon"
          className={classNames('Dropdown__arrow', {
            'Dropdown__arrow--active': isSelecting,
          })}
        />
      </button>

      {isSelecting && (
        <div className="Dropdown__content">
          {parameterOptions.map(option => (
            <button
              key={option.name}
              type="button"
              className="Dropdown__item"
              onClick={() => handleSelectOption(option.name)}
            >
              {option.alias}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

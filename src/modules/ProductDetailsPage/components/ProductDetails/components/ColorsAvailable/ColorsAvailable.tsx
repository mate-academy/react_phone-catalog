import React from 'react';
import './ColorsAvailable.scss';
import classNames from 'classnames';
import { useLanguage } from '../../../../../../context/LanguageContext';

type Props = {
  className: string;
  colorsAvailable: string[];
  activeColor: string;
  changeColor: (value: string) => void;
};

export const ColorsAvailable: React.FC<Props> = ({
  className,
  colorsAvailable,
  activeColor,
  changeColor,
}) => {
  const { texts } = useLanguage();

  return (
    <div className={`colors-available ${className}`}>
      <p className="colors-available__title">{texts.availableColors}</p>
      <div className="colors-available__options">
        {colorsAvailable.map((color, index) => (
          <div
            className={classNames('colors-available__color-option', {
              'colors-available__color-option--is-active':
                activeColor === color,
            })}
            style={{ backgroundColor: color }}
            key={index}
            onClick={() => changeColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

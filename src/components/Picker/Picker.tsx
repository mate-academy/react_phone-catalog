import React from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { PickerOption } from '../../types/PickerOption';

type Props = {
  isColor?: boolean;
  data: PickerOption[];
  title: string;
};

export const Picker: React.FC<Props> = (
  { isColor, data, title },
) => {
  const { pathname } = useLocation();
  const currentUrl = pathname.slice(1).split('/')[1].split('-');

  const capacityIndex = isColor
    ? currentUrl.length - 1
    : currentUrl.length - 2;

  function getNewLinkValue(newValue: string): string {
    const newUrl = [...currentUrl];

    newUrl[capacityIndex] = newValue;

    return newUrl.join('-');
  }

  const callBack = (option: PickerOption) => {
    const isOptionActive = isColor
      ? currentUrl[capacityIndex] === option.name
      : currentUrl[capacityIndex] === option.value;

    return isColor
      ? (
        <Link
          key={option.name}
          className={cn(
            'picker__button picker__button--color button button__color',
            { 'button__color--active': isOptionActive },
          )}
          to={`../${getNewLinkValue(option.name)}`}
        >
          <span
            style={{ backgroundColor: option.value }}
            className="
              picker__button--color-background
              button__color--background"
          />
        </Link>
      )
      : (
        <Link
          key={option.name}
          to={`../${getNewLinkValue(option.value)}`}
          className={cn(
            'picker__button button button__nav button__nav--pagination',
            { 'button__nav--pagination--active': isOptionActive },
          )}
        >
          {option.name}
        </Link>
      );
  };

  return (
    <div className="picker">
      <span className="picker__title">
        {title}
      </span>
      <div className="picker__options">
        {data.map(callBack)}
      </div>
    </div>
  );
};

Picker.defaultProps = {
  isColor: false,
};

import classNames from 'classnames';
import React, { useContext } from 'react';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

interface Props {
  title: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
  width?: string;
  height?: number;
}

export const PrimaryButton: React.FC<Props> = ({
  title,
  onClickHandler,
  isDisabled,
  width,
  height,
}) => {
  const { isDark } = useContext(DarkModeContext);

  return (
    <button
      onClick={onClickHandler}
      className={classNames('buttons__button-cart', {
        'buttons__button-cart--is-in-cart': isDisabled,
        'buttons__button-cart--is-Dark': isDark,
        'buttons__button-cart--is-Dark-Added': isDark && isDisabled,
      })}
      style={{ width: width, height: height }}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

import React from 'react';
import './ButtonIcon.scss';
import { Icon } from '../Icon';
import classNames from 'classnames';
import { icons } from '../../../constants/icons';

type Props = {
  icon: {
    title: string;
    path: string;
  };
  iconDisabled?: {
    title: string;
    path: string;
  };
  isDisabled?: boolean;
  handleOnClick?: () => void;
};

export const ButtonIcon: React.FC<Props> = ({
  icon,
  iconDisabled = icons.home,
  isDisabled = false,
  handleOnClick = () => {},
}) => {
  const handleButtonIconClass = () => {
    return classNames('button-icon', {
      'button-icon--disabled': isDisabled,
    });
  };

  return (
    <div className={handleButtonIconClass()} onClick={handleOnClick}>
      <Icon icon={isDisabled ? iconDisabled : icon} />
    </div>
  );
};

import React from 'react';
import { IconSvg } from '../../../IconSvg/IconSvg';
import classNames from 'classnames';

type Props = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  className?: string;
  iconDataPath: string[];
};

export const NavigationButton: React.FC<Props> = React.memo(
  ({ buttonRef, className = '', iconDataPath }) => {
    return (
      <button ref={buttonRef} className={classNames('button', className)}>
        <IconSvg dataPath={iconDataPath} />
      </button>
    );
  },
);

NavigationButton.displayName = 'NavigationButton';

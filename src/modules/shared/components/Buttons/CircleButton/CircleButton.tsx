import React from 'react';
import './CircleButton.scss';
import classNames from 'classnames';

type CircleButtonProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>> | string;
  isActive?: boolean;
  isDisabled?: boolean;
};

export const CircleButton: React.FC<CircleButtonProps> = React.memo(
  ({ icon, isActive, isDisabled }) => {
    const isString = typeof icon === 'string';
    const currentPage = icon as string;
    const IconMain = icon as React.FC<React.SVGProps<SVGSVGElement>>;

    return (
      <div
        className={classNames('btn-circle', {
          'btn-circle--active': isActive,
          'btn-circle--disabled': isDisabled,
        })}
      >
        {isString ? (
          <span className="btn-circle__content">{currentPage}</span>
        ) : (
          <IconMain className="btn-circle__image" />
        )}
      </div>
    );
  },
);

CircleButton.displayName = 'CircleButton';

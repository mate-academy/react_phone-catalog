import React from 'react';
import './TextButton.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  className: string;
  onClick: () => void;
  isActive?: boolean;
};

export const TextButton: React.FC<Props> = ({
  text,
  className,
  onClick,
  isActive = false,
}) => {
  return (
    <button
      className={classNames(`text-button ${className}`, {
        'text-button--is-active': isActive,
      })}
      onClick={() => onClick()}
    >
      <span className="text-button__text">{text}</span>
    </button>
  );
};

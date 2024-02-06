import React, { memo } from 'react';
import ArrowIcon from '../ArrowIcon';
import { useHeight } from '../../../enhancers/hooks/height';

import './ArrowButton.scss';

interface Props {
  onClick: (event: React.MouseEvent) => void,
  rotate?: number,
  disabled?: boolean,
  className?: string,
  children?: React.ReactNode,
  wrapperClassName?: string,
}

export const ArrowButton: React.FC<Props> = memo(({
  onClick,
  className,
  disabled,
  rotate,
  children,
  wrapperClassName,
}) => {
  const [buttonRef, height] = useHeight<HTMLButtonElement>();
  const arrowSize = height / 2;

  console.log(children);

  if (children) {
    return (
      <div className={wrapperClassName} onClick={onClick}>
        {children}

        <button
          className={`arrow-button ${className || ''}`}
          ref={buttonRef}
          disabled={disabled}
        >
          <ArrowIcon rotate={rotate} width={arrowSize} height={arrowSize} />
        </button>
      </div>
    );
  }

  return (
    <button
      className={`arrow-button ${className || ''}`}
      ref={buttonRef}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowIcon rotate={rotate} width={arrowSize} height={arrowSize} />
    </button>
  );
});

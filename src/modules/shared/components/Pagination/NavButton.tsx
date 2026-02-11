import React from 'react';
import { Icon } from '../Icon';

interface NavButtonProps {
  direction: 'left' | 'right';
  toPage: number;
  disabled: boolean;
  onPageChange: (page: number) => void;
}

export const NavButton: React.FC<NavButtonProps> = ({
  direction,
  toPage,
  disabled,
  onPageChange,
}) => {
  const icon =
    direction === 'left' ? (
      <Icon iconSlug="ChevronLeft" />
    ) : (
      <Icon iconSlug="ChevronRight" />
    );

  const onClick = () => onPageChange(toPage);

  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {icon}
    </button>
  );
};

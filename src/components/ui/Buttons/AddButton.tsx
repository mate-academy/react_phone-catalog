import React from 'react';
import { CustomButton } from '../CustomButton';
import { cn } from '@/lib/utils';
import type { ButtonSize } from '../types/Buttons';
import { useTranslation } from 'react-i18next';

interface AddButtonProps {
  onClick?: () => void;
  isSelected?: boolean;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

export const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  isSelected = false,
  size = 'itemCard',
  className,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <CustomButton
      onClick={onClick}
      state={isSelected ? 'selected' : 'primary'}
      size={size}
      className={cn(className)}
    >
      {children ?
        children
      : isSelected ?
        t('ui.added')
      : t('ui.addToCart')}
    </CustomButton>
  );
};

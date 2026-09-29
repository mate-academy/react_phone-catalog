import React from 'react';
import cn from 'classnames';
import { useProducts } from '@/shared/context/ProductsContext';
import { useProductDetails } from '@/modules/ProductDetailsPage/hooks';
import { useTheme } from '@/shared/context/ThemeContext';
import { IconButton } from '../Buttons/components/IconButton';

import { ThemeIcon } from '@/shared/assets/icons';

import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';

import './ThemeToggle.scss';

type Props = {
  className?: string;
};

export const ThemeToggle: React.FC<Props> = ({ className }) => {
  const isOnline = useOnlineStatus();
  const { hasError } = useProducts();
  const { hasErrorDetails } = useProductDetails();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const hasAnyError = hasError || hasErrorDetails;

  if (!isOnline || hasAnyError) {
    return null;
  }

  return (
    <IconButton
      type="button"
      className={cn('theme-toggle', className, {
        'theme-toggle--dark': isDark,
      })}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <ThemeIcon className="theme-toggle__icon" />
    </IconButton>
  );
};

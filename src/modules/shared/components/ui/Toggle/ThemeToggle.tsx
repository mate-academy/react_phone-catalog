import { FC } from 'react';
import { Theme, useTheme } from '../../../hooks/useTheme';
import { useTranslations } from 'use-intl';
import { Toggle, ToggleOption } from './Toggle';

interface Props {
  className?: string;
}

export const ThemeToggle: FC<Props> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('theme');

  const OPTIONS: ToggleOption<Theme>[] = [
    { label: t('system'), value: 'system' },
    { label: t('light'), value: 'light' },
    { label: t('dark'), value: 'dark' },
  ];

  return (
    <Toggle
      options={OPTIONS}
      value={theme}
      onChange={setTheme}
      ariaLabel="Color theme"
      className={className}
    />
  );
};

import { FC } from 'react';
import { useTheme, Theme } from '../../../hooks/useTheme';
import { Dropdown } from './Dropdown';
import { DropdownProvider } from '../../../providers/DropdownProvider';
import { useTranslations } from 'use-intl';

interface Props {
  className?: string;
}

export const ThemeDropdown: FC<Props> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('theme');

  const options = {
    [t('light')]: 'light',
    [t('dark')]: 'dark',
    [t('system')]: 'system',
  };

  return (
    <DropdownProvider>
      <Dropdown
        id="theme"
        label={t('label')}
        options={options}
        value={theme}
        onChange={val => setTheme(val as Theme)}
        className={className}
      />
    </DropdownProvider>
  );
};

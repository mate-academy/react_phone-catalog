import { FC } from 'react';
import { useLanguage, Language } from '../../../hooks/useLanguage';
import { Dropdown } from './Dropdown';
import { DropdownProvider } from '../../../providers/DropdownProvider';
import { useTranslations } from 'use-intl';

interface Props {
  className?: string;
}

export const LanguageDropdown: FC<Props> = ({ className }) => {
  const { language, changeLanguage } = useLanguage();
  const t = useTranslations('language');

  const options = {
    [t('en')]: 'en',
    [t('uk')]: 'uk',
  };

  return (
    <DropdownProvider>
      <Dropdown
        id="language"
        label={t('label')}
        options={options}
        value={language}
        onChange={val => changeLanguage(val as Language)}
        className={className}
      />
    </DropdownProvider>
  );
};

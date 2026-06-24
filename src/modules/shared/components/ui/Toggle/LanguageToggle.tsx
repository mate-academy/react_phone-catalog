import { FC } from 'react';
import { useLanguage, Language } from '../../../hooks/useLanguage';
import { Toggle, ToggleOption } from './Toggle';

const OPTIONS: ToggleOption<Language>[] = [
  { label: 'EN', value: 'en' },
  { label: 'UKR', value: 'uk' },
];

interface Props {
  className?: string;
}

export const LanguageToggle: FC<Props> = ({ className }) => {
  const { language, changeLanguage } = useLanguage();

  return (
    <Toggle
      options={OPTIONS}
      value={language}
      onChange={changeLanguage}
      ariaLabel="Language"
      className={className}
    />
  );
};

import { useTranslation } from 'react-i18next';
import { SelectOption } from '../types/SelectOptions';
import { siteLanguages } from './constants';

export function useLangSelect() {
  const { i18n } = useTranslation();

  const language: SelectOption = {
    value: i18n.language,
    label:
      siteLanguages[i18n.language as keyof typeof siteLanguages] ||
      i18n.language,
  };

  const selectLanguage = (selectedOption: SelectOption | null) => {
    let newOption = selectedOption;

    if (!newOption) {
      newOption = {
        value: i18n.language,
        label:
          siteLanguages[i18n.language as keyof typeof siteLanguages] ||
          i18n.language,
      };
    }

    i18n.changeLanguage(newOption.value);
  };

  const langOptions: SelectOption[] = Object.entries(siteLanguages).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  return {
    language,
    langOptions,
    selectLanguage,
  };
}

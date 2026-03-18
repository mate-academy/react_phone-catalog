import { dictionaries } from '../constants/dictionaries';
import { DEFAULT_LANGUAGE, LANG } from '../constants/lang';
import { Lang } from '../store/LangContext';
import { getUkrainianPluralForm } from './getUkrainianPluralForm';

export type TranslateParams = {
  count?: number;
};

export function translate(
  key: string,
  lang: Lang = DEFAULT_LANGUAGE,
  params?: TranslateParams,
) {
  const dictionary = dictionaries[lang];

  if (params?.count !== undefined) {
    if (lang === LANG.ua) {
      const pluralForm = getUkrainianPluralForm(params.count);

      return dictionary[`${key}_${pluralForm}`] || key;
    }

    const pluralForm = params.count === 1 ? 'one' : 'other';

    return dictionary[`${key}_${pluralForm}`] || key;
  }

  return dictionary[key] || key;
}

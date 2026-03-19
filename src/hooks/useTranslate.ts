import { translate, TranslateParams } from '../utils/translate';
import { useLang } from './useLang';

export const useTranslate = () => {
  const { lang } = useLang();

  return (key: string, params?: TranslateParams) =>
    translate(key, lang, params);
};

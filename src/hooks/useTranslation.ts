import { translations } from '../i18n';
import { useAppSelector } from '../store/hooks';

export const useTranslation = () => {
  const language = useAppSelector(state => state.language.current);

  return translations[language];
};

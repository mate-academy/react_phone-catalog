import { useAppState } from '../../contexts/AppContext';
import { getTranslation } from '../shared/utils/getTranslation';

export const NotFoundPage = () => {
  const { language } = useAppState();
  const t = getTranslation(language);

  return (
  <img src="../../public/img/page-not-found.png" alt={t.notFoundPage.pageNotFound} />
  );
};

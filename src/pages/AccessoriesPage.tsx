import { useContext } from 'react';
import { GadgetsList } from '../components/GadgetsList/GadgetsList';
import { LanguageContext } from '../store/LanguageProvider';

export const AccessoriesPage = () => {
  const { t } = useContext(LanguageContext);
  const title = t('accessories');

  return <GadgetsList title={title} />;
};

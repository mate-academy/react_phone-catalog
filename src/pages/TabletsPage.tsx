import { useContext } from 'react';
import { GadgetsList } from '../components/GadgetsList/GadgetsList';
import { LanguageContext } from '../store/LanguageProvider';

export const TabletsPage = () => {
  const { t } = useContext(LanguageContext);
  const title = t('tablets');

  return <GadgetsList title={title} />;
};

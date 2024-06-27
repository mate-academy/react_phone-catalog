import { useContext } from 'react';
import { GadgetsList } from '../components/GadgetsList/GadgetsList';
import { LanguageContext } from '../store/LanguageProvider';

export const PhonesPage = () => {
  const { t } = useContext(LanguageContext);
  const title = t('mobilePhones');

  return <GadgetsList title={title} />;
};

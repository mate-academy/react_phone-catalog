import { useTranslation } from 'react-i18next';
import Slider from './Slider';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('home.welcome_to_store')}</h2>

      <Slider />
    </>
  );
};

export default HomePage;

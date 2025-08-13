import { useTranslation } from 'react-i18next';

const Slider = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('home.welcome_to_store')}</h2>
    </>
  );
};

export default Slider;

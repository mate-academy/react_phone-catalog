import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.scss';
import { HeroSlider } from '@/components/layout/HeroSlider';
import { NewModelsSection } from '@/components/layout/NewModelsSection';
import { HotPricesSection } from '@/components/layout/HotPricesSection';
import { ShopByCategorySection } from '@/components/layout/ShopByCategorySection';

export const HomePage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container">
      <div className={styles.homeWraper}>
        <h1 className={styles.title}>{t('titles.homePageTitle')}</h1>
        <HeroSlider />
        <NewModelsSection />
        <ShopByCategorySection />
        <HotPricesSection />
      </div>
    </div>
  );
};

import style from './BrandNewModels.module.scss';
import { LanguageContext } from '../../../store/LanguageProvider';
import { useContext } from 'react';

export const BrandNewModels = () => {
  const { t } = useContext(LanguageContext);

  return (
    <section className={style.brandNewModels}>
      <div className={style.brandNewModels__slider}>
        <h2 className={style.brandNewModels__title}>{t('newModels')}</h2>
      </div>
    </section>
  );
};

//#region imports
import { TechSpecs } from '../../types/TechSpecs';
import { TechSpecsList } from '../TechSpecsList';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  techSpecs: Partial<TechSpecs>;
};

export const TechSpecsBlock: React.FC<Props> = ({ techSpecs }) => {
  const { t } = useTranslation('productDetails');

  return (
    <section className={baseStyles.techSpecs}>
      <h3 className={baseStyles.title}>
        {capitalizeFirstWord(t('techSpecs'))}
      </h3>

      <TechSpecsList specs={techSpecs} />
    </section>
  );
};

import { useTranslation } from 'react-i18next';
import { Description } from '../../../shared/components/Description/Description';
import { useGetProductDetails } from '../../hooks/useGetProductDetails';
import { descriptionsCreator } from '../../utils/descriptionsCreator';
import styles from './TechSpecs.module.scss';

export const TechSpecs = () => {
  const { t } = useTranslation();
  const { product } = useGetProductDetails();
  return (
    <div className={styles.product__techSpecs}>
      <h3 className={styles.subtitle}>
        {t('details_page.tech_specs_section_title')}
      </h3>

      <hr className={styles.line} />

      <Description
        discriptions={descriptionsCreator({
          screen: product?.screen,
          resolution: product?.resolution,
          processor: product?.processor,
          ram: product?.ram,
          capacity: product?.capacity,
          camera: product?.camera,
          zoom: product?.zoom,
          cell: product?.cell.join(', '),
        })}
      />
    </div>
  );
};

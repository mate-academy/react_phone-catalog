import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import styles from './ProductSpecs.module.scss';
import { ProductCatalogItem } from '../../../types/ProductCatalogItem';
import { ProductDetail } from '../../../types/ProductDetail';

interface Props {
  product: ProductCatalogItem | ProductDetail;
  specsList: string[];
  additionalStyles?: string;
  langPage?: string;
  styleMainDetail?: boolean;
  styleTechSpecs?: boolean;
}

type Spec = { title: string; value: string };

const ProductSpecs: React.FC<Props> = ({
  product,
  specsList,
  additionalStyles = '',
  langPage,
  styleMainDetail,
  styleTechSpecs,
}) => {
  const { t } = useTranslation();
  const specs: Spec[] = specsList
    .map(title => {
      const indexedProduct = product as unknown as Record<string, unknown>;

      return {
        title,
        value: String(indexedProduct[title] ?? ''),
      };
    })
    .filter(specLine => specLine.value);

  return (
    <dl className={styles.specs + ' ' + additionalStyles}>
      {specs.map(specLine => (
        <div
          key={specLine.title}
          className={cn(styles.specs__line, {
            [styles.specs__fontWeight_600]: styleMainDetail,
            [styles.specs__fontSize_14]: styleTechSpecs,
          })}
        >
          <dt className={styles.specs__line__lineTitle}>
            {t((langPage ?? 'product-card') + '.' + specLine.title)}
          </dt>
          <dd className={styles.specs__line__lineValue}>{specLine.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default ProductSpecs;

import { ProductDetails } from '../../../../types/ProductDetails';
import { useLanguage } from '../../../../context/LanguageContext';
import styles from './ProductInformation.module.scss';

interface Props {
  product: ProductDetails;
}

const formatCell = (cell: string[]) =>
  cell.filter(value => value.trim()).join(', ');

export const ProductInformation: React.FC<Props> = ({ product }) => {
  const { t } = useLanguage();

  return (
    <div className={styles.information}>
      <section className={styles.about}>
        <h2>{t('product.about')}</h2>

        <div className={styles.description}>
          {product.description.map(block => (
            <article key={block.title}>
              <h3>{block.title}</h3>
              {block.text.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.techSpecs}>
        <h2>{t('product.techSpecs')}</h2>

        <dl>
          <div>
            <dt>{t('product.screen')}</dt>
            <dd>{product.screen}</dd>
          </div>
          <div>
            <dt>{t('product.resolution')}</dt>
            <dd>{product.resolution}</dd>
          </div>
          <div>
            <dt>{t('product.processor')}</dt>
            <dd>{product.processor}</dd>
          </div>
          <div>
            <dt>{t('product.ram')}</dt>
            <dd>{product.ram.replace('GB', ' GB')}</dd>
          </div>
          <div>
            <dt>{t('product.builtInMemory')}</dt>
            <dd>{product.capacity.replace('GB', ' GB')}</dd>
          </div>
          {product.camera?.trim() && (
            <div>
              <dt>{t('product.camera')}</dt>
              <dd>{product.camera}</dd>
            </div>
          )}
          {product.zoom?.trim() && (
            <div>
              <dt>{t('product.zoom')}</dt>
              <dd>{product.zoom}</dd>
            </div>
          )}
          {formatCell(product.cell) && (
            <div>
              <dt>{t('product.cell')}</dt>
              <dd>{formatCell(product.cell)}</dd>
            </div>
          )}
        </dl>
      </section>
    </div>
  );
};

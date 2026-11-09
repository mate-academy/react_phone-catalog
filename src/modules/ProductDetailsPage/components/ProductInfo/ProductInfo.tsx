import classNames from 'classnames';
import { ProductDetails } from '../../../../types/ProductDetails';
import { Spec, SpecsList } from '../../../shared/components/SpecsList';
import styles from './ProductInfo.module.scss';

interface Props {
  details: ProductDetails;
  className?: string;
}

export const ProductInfo = ({ details, className }: Props) => {
  const techSpecs = [
    { label: 'Screen', value: details.screen },
    { label: 'Resolution', value: details.resolution },
    { label: 'Processor', value: details.processor },
    { label: 'RAM', value: details.ram },
    { label: 'Built in memory', value: details.capacity },
    { label: 'Camera', value: details.camera },
    { label: 'Zoom', value: details.zoom },
    { label: 'Cell', value: details.cell.join(', ') },
  ].filter((spec): spec is Spec => spec.value !== undefined);

  return (
    <div className={classNames(styles.info, className)}>
      <section>
        <h2 className={styles.title}>About</h2>

        <div className={styles.about}>
          {details.description.map(({ title, text }) => (
            <article key={title}>
              <h3 className={styles.aboutTitle}>{title}</h3>

              <div className={styles.paragraphs}>
                {text.map((paragraph, index) => (
                  <p key={index} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.title}>Tech specs</h2>

        <SpecsList specs={techSpecs} size="medium" />
      </section>
    </div>
  );
};

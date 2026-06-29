import styles from './ProductDescription.module.scss';

import { Description } from '../../../types/Description';

interface Props {
  description: Description[];
  additionalStyles?: string;
}

const ProductDescription: React.FC<Props> = ({
  description,
  additionalStyles,
}) => (
  <article className={additionalStyles}>
    <h3 className={styles.description__title}>About</h3>

    <div className={styles.description__content}>
      {description.map(({ title, text }, descIndex) => (
        <section key={descIndex} className={styles.section}>
          <h4 className={styles.section__title}>{title}</h4>
          {text.map((paragraph, index) => (
            <p key={index} className={styles.section__text}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  </article>
);

export default ProductDescription;

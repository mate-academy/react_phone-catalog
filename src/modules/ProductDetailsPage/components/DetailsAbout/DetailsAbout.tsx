import styles from './DetailsAbout.module.scss';
import type { DetailsProps } from "../../../shared/types/ProductDetails";

type AboutProps = DetailsProps<'description'>;

export const DetailsAbout = ({description}: AboutProps) => {
  return (
    <div className={styles.about}>
      <h3 className={styles.aboutTitle}>About</h3>
      {description.map((descItem) => (
        <div key={descItem.title} className={styles.aboutBlock}>
          <h4 className={styles.aboutSubtitle}>{descItem.title}</h4>
          {descItem.text.map((tex, i) => (
            <p className={styles.aboutText} key={i}>
              {tex}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

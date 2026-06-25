import { useProduct } from '../../../shared/hooks/ProductContext';
import styles from './About.module.scss';

export const About = () => {
  const { activeProduct } = useProduct();

  return (
    <div className={styles.contentAboutTech}>
      <div className={styles.titleAboutTech}>About</div>
      {activeProduct?.description.map((desc, i) => (
        <div key={i} className={styles.descriptionBlock}>
          <div className={styles.titleText}>{desc.title}</div>

          <div className={styles.text}>{desc.text}</div>
        </div>
      ))}
    </div>
  );
};

import { DescriptionItem } from '../../../../shared/types/Accessories';
import styles from './About.module.scss';

type Props = {
  description: DescriptionItem[];
};

export const About: React.FC<Props> = ({ description }) => {
  return (
    <section className={styles.about}>
      <h3>About</h3>
      <hr />
      <ul className={styles.about__info}>
        {description.map(item => (
          <li key={item.title} className={styles.about__item}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

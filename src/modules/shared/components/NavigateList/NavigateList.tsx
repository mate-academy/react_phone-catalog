import { useParams } from 'react-router-dom';
import styles from './NavigateList.module.scss';

export const NavigateList = () => {
  const { category } = useParams();

  return (
    <div className={styles.navigate}>
      <img src="/img/SliderImg/Home.svg" alt="Home" />
      <img src="img/SliderImg/Arrow Right.svg" alt="ArrowRight" />
      <div className={styles.category}>{category}</div>
    </div>
  );
};

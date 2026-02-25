import { Link } from 'react-router-dom';
import { Slider } from '../../../shared/components/Slider';
import { banerItems } from '../../constants/banerItems';
import styles from './BanerSlider.module.scss';

export const BannerSlider = () => {
  return (
    <section className={styles.slider}>
      <Slider
        type="baner"
        loop={true}
        autoplay={{ enabled: true, interval: 5000 }}
        draggable={true}
        breakpoints={{ 1: 1 }}
        showButton={true}
        showDots={true}
        dotsClassNames={styles.dash}
        leftButtonClassNames={styles.left}
        rightButtonClassNames={styles.right}
      >
        {banerItems.map(photo => (
          <Link to={photo.to || ''} key={photo.id}>
            <img src={photo.item} className={styles.img} />
          </Link>
        ))}
      </Slider>
    </section>
  );
};

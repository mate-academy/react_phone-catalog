import { BannerData } from '@shared/types';
import { Link } from 'react-router-dom';
import styles from './styles/sliderMain.module.scss';
import { useSliderCore } from './model/useSliderCore';
import { ArrowIcon } from '@shared/icons';

type Props = {
  data: BannerData[];
};
export const SliderCSS: React.FC<Props> = ({ data }) => {
  const { DOMRefs, handlers, mechRefs } = useSliderCore({
    gap: 13,
    amount: 4,
  });

  return (
    <section className={styles['hero-slider']} aria-label="Featured promotions">
      <button
        className={`${styles['button-prev']} ${styles.button}`}
        onClick={() => handlers.onButton(-1)}
        aria-label="Show previous slide"
      >
        <ArrowIcon direction="left" />
      </button>

      <div className={styles.viewport} ref={DOMRefs.viewport} {...handlers}>
        <div
          className={styles.track}
          ref={DOMRefs.track}
          style={
            {
              '--offset': `${mechRefs.offset.current}px`,
              '--gap': '13px',
            } as React.CSSProperties & Record<string, string>
          }
        >
          {data.map(el => (
            <Link
              key={el.src}
              to={'/phones'}
              className={styles.track__el}
              onClick={e => handlers.onClick(e)}
              ref={DOMRefs.item}
            >
              <img src={el.src} alt={el.alt} className={styles.banner} />
            </Link>
          ))}
        </div>
      </div>
      <button
        className={`${styles['button-next']} ${styles.button}`}
        onClick={() => handlers.onButton(1)}
        aria-label="Show next slide"
      >
        <ArrowIcon direction="right" />
      </button>
    </section>
  );
};

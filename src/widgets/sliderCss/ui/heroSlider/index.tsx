import { BannerData } from '@shared/types';
import { Link } from 'react-router-dom';
import styles from '../../styles/sliderMain.module.scss';
import { useSliderCore } from '../../model';
import { ArrowIcon } from '@shared/icons';
import classNames from 'classnames';
import { useSliderData } from '@widgets/sliderCss/model';

type Props = {
  data: BannerData[];
};
export const HeroSlider: React.FC<Props> = ({ data }) => {
  const { DOM, mechanics, activeIndex, gap } = useSliderData();
  const { handlers } = useSliderCore({
    amount: data.length,
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

      <div className={styles.viewport} ref={DOM.viewport} {...handlers}>
        <div
          className={styles.track}
          ref={DOM.track}
          style={
            {
              '--offset': `${mechanics.offset.current}px`,
              '--gap': `${gap}px`,
            } as React.CSSProperties
          }
        >
          {data.map(el => (
            <Link
              key={el.id}
              aria-label={el.ariaLabel}
              to={'/phones'}
              className={styles.track__el}
              onClick={e => handlers.onClick(e)}
              ref={el.id === 0 ? DOM.item : null}
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
      <div className={styles.pagination} role="tablist">
        {data.map(el => (
          <button
            className={styles['pagination-button']}
            key={el.id}
            onClick={() => handlers.onPagination(el.id)}
            aria-current={el.id === activeIndex}
          >
            <div
              className={classNames(styles['pagination-img'], {
                [styles['pagination-img-is-active']]: el.id === activeIndex,
              })}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../productCard';
import { useScrollableSlider } from '../../hooks/useScrollableSlider';
import styles from './sectionSlider.module.scss';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';

type Props = {
  product: Product[];
  hotPrice?: boolean;
  mayAlsoLike?: boolean;
};

export const SectionSlider: React.FC<Props> = ({
  product,
  hotPrice = false,
  mayAlsoLike = false,
}) => {
  const slider = useScrollableSlider([...product]);
  const { isAtEnd, isAtStart, scrollLeft, scrollRight, sliderRef } = slider;

  return (
    <section className={styles.sectionSlider}>
      <div className={styles.container}>
        <div className={styles.sectionTop}>
          <h2
            className={classNames(styles['section-title'], {
              [styles['section-title--width']]: !hotPrice && !mayAlsoLike,
            })}
          >
            {hotPrice
              ? 'Hot prices'
              : mayAlsoLike
                ? 'You may also like'
                : 'Brand new models'}
          </h2>
          <div className={styles.buttons}>
            <button
              className={classNames(styles['button-img'], {
                disabled: isAtStart,
              })}
              onClick={scrollLeft}
              disabled={isAtStart}
            >
              <Icon
                icon={isAtStart ? icons.arrowLeftDisabled : icons.arrowLeft}
              />
            </button>
            <button
              className={classNames(styles['button-img'], {
                disabled: isAtEnd,
              })}
              onClick={scrollRight}
              disabled={isAtEnd}
            >
              <Icon
                icon={isAtEnd ? icons.arrowRightDisabled : icons.arrowRight}
              />
            </button>
          </div>
        </div>
        <ProductCard product={product} sliderRef={sliderRef} />
      </div>
    </section>
  );
};

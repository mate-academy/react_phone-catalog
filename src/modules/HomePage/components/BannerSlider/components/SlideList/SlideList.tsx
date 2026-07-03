//#region imports
import { forwardRef } from 'react';
import { ProductLink } from '../../../../../shared/types/ProductLink';
import styles from './SlideList.module.scss';
import { Slide } from '../Slide/Slide';
//#endregion

type Props = {
  products: ProductLink[];
};

export const SlideList = forwardRef<HTMLUListElement, Props>(
  ({ products }, ref) => (
    <ul ref={ref} className={styles.slidesList}>
      {products.map(slide => (
        <li key={slide.id}>
          <Slide slide={slide} />
        </li>
      ))}
    </ul>
  ),
);

SlideList.displayName = 'SlideList';

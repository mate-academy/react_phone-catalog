import classNames from 'classnames';
import styles from './Dot.module.scss';

type Props = {
  number: number;
  goToSlide: (n: number) => void;
  slideIndex: number;
};

export const Dot: React.FC<Props> = ({ number, goToSlide, slideIndex }) => (
  <div
    className={classNames(styles.dot, {
      [styles['dot--selected']]: slideIndex === number,
    })}
    onClick={() => goToSlide(number)}
  ></div>
);

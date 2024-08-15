import { Button } from '../../../ui/Button';
import styles from './CarouselHeader.module.scss';

type Props = {
  title: string | undefined;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
};

export const CarouselHeader: React.FC<Props> = ({
  title,
  handlePrevSlide,
  handleNextSlide,
}) => {
  return (
    <div className={styles.productsHeader}>
      <p className={styles.title}>{title}</p>

      <div className={styles.buttons}>
        <Button
          onClick={handlePrevSlide}
          arrow={{ type: 'left', fill: '#4A4D58' }}
          size="small"
          appearance="dark"
          className="active"
        >
          {''}
        </Button>
        <Button
          className="active"
          onClick={handleNextSlide}
          arrow={{ type: 'right', fill: '#F1F2F9' }}
          size="small"
          appearance="dark"
        >
          {''}
        </Button>
      </div>
    </div>
  );
};

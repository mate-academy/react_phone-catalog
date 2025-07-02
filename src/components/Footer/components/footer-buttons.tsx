import { Link } from 'react-router-dom';
import styles from './footer-buttons.module.scss';
import { ButtonsProps } from '@shtypes/ButtonProps';
import { Button } from '@shared/ui/button';

type Props = {
  className: string;
  data: ButtonsProps;
};

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const FooterButtons: React.FC<Props> = ({ className, data }) => {
  return (
    <div className={className}>
      <Link to={'#top'} className={styles.text}>
        Back to top
      </Link>
      <Button data={data} className={styles.button} fn={goToTop} />
    </div>
  );
};

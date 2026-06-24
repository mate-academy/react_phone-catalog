import { useNavigate } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { Button } from '../../components/ui/Button';
import { imageUrl } from '../../utils/imageUrl';
import styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Pagetoolbar back />
      <div className={styles.empty}>
        <img
          src={imageUrl('img/page-not-found.png')}
          alt=""
          className={styles.empty__img}
        />
        <h2 className={styles.empty__title}>Page not found!</h2>
        <Button onClick={() => navigate('/')}>Go home</Button>
      </div>
    </div>
  );
};

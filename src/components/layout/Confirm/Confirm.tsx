import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import styles from './Confirm.module.scss';

export const Confirm = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thanks for purchase our products!</h1>
      <Button onClick={() => navigate('/')}>Go home</Button>
    </div>
  );
};

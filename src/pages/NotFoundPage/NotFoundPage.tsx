import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>Página não encontrada</h1>
      <p className={styles.message}>
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link to="/" className={styles.homeButton}>
        Voltar para a Home
      </Link>
    </div>
  );
}

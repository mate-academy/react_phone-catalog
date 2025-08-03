import { PicturesSlider } from '../PicturesSlider/PicturesSlider';
import styles from './Header.module.scss';

export const Header: React.FC = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
    <PicturesSlider />
  </header>
);

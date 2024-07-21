import { IoIosArrowUp } from 'react-icons/io';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.root}>
      <h5>
        Nice👌 <br /> Gadgets
      </h5>
      <div className={styles.links}>
        <a href="#">GitHub</a>
        <a href="#">Contacts</a>
        <a href="#">Rights</a>
      </div>
      <div className={styles.backToTop}>
        <a href="#">
          Back to top{' '}
          <button>
            <IoIosArrowUp className={styles.arrowUp} size={16} />
          </button>
        </a>
      </div>
    </footer>
  );
}

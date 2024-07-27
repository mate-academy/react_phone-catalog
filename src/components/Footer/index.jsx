import { IoIosArrowUp } from 'react-icons/io';
import styles from './Footer.module.scss';

export default function Footer() {
  const backTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer>
      <div className={styles.root}>
        {' '}
        <h5>
          Nice👌 <br /> Gadgets
        </h5>
        <div className={styles.links}>
          <a href="https://github.com/Hy-tapa-kot">GitHub</a>
          <a href="#">Contacts</a>
          <a href="#">Rights</a>
        </div>
        <div className={styles.backToTop} onClick={backTop}>
          <a>
            Back to top
            <button>
              <IoIosArrowUp className={styles.arrowUp} size={16} />
            </button>
          </a>
        </div>
      </div>
    </footer>
  );
}

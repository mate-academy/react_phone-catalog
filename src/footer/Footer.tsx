import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div><img src="./images/logo/Logo.png" className={styles.logo} /></div>
      <ul className={styles.nav}>
        <li onClick={handleScrollTop}>
          <Link to={'https://github.com/OlyaVidzi'}>GITHUB</Link>
        </li>
        <li onClick={handleScrollTop}>
          <Link to={'/'}>CONTACTS</Link>
        </li>
        <li onClick={handleScrollTop}>
          <Link to={'/'}>RIGHTS</Link>
        </li>
      </ul>
      <div className={styles.backToTop} onClick={handleScrollTop}>
        <h4>Back to top</h4>
        <img src="./images/icons/BackToTop.png" />
      </div>
    </div>
  );
};

export default Footer;

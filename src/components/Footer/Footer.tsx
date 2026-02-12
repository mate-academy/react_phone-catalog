import styles from './Footer.module.scss';
import logoNiceGadGets from '../../image/Logo.svg';
import iconGoTop from '../../Icons/seta para cima.png';

export const Footer = () => {
  const backTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <img
        className={styles.footer__logo}
        src={logoNiceGadGets}
        alt="LogoMarcaNiceGadgets"
      />

      <div className={styles.footer__divLinks}>
        <h6>GITHUB</h6>
        <h6>CONTACTS</h6>
        <h6>RIGHTS</h6>
      </div>

      <div className={styles.footer__divBacktop}>
        <h6 className={styles.footer__divBacktop__text}>Back to top</h6>
        <div className={styles.footer__divBacktop__backTop} onClick={backTop}>
          <img
            src={iconGoTop}
            alt="Go Top"
            className={styles.footer__divBacktop__backTop__img}
          />
        </div>
      </div>
    </footer>
  );
};

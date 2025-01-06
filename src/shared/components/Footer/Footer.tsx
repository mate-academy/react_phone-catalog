import { Container } from '../Container';
import s from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={s.Footer}>
      <Container>
        <div className={s.FooterField}>
          <a href="/" className={s.FooterLogo}>
            Nice👌 <br />
            Gadgets
          </a>

          <ul className={s.FooterList}>
            <li className={s.FooterItem}>
              <a href="https://github.com/tonni004" className={s.FooterLink}>
                Github
              </a>
            </li>

            <li className={s.FooterItem}>
              <a
                href="https://www.linkedin.com/in/tanya-baletska-06377828a/"
                className={s.FooterLink}
              >
                Contacts
              </a>
            </li>

            <li className={s.FooterItem}>
              <a
                href="https://portfolio-tonni004.netlify.app/"
                className={s.FooterLink}
              >
                Rights
              </a>
            </li>
          </ul>

          <div className={s.FooterBtnField}>
            <p>Back to top</p>
            <button
              type="button"
              className={s.BackToTopBtn}
              onClick={handleScrollToTop}
            ></button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

import styles from '../HomePage/Header/header.module.scss';
import flex from './footer.module.scss';
import buttom from '../HomePage/Welcome/homeface.module.scss';
import classNames from 'classnames';

export const Footer = () => {
  const componentDidMount = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={flex.footer}>
      <div>
        <a href="">
          <img src="./img/logo.png" alt="logo" className={styles.header_logo} />
        </a>
      </div>

      <div className={flex.footer_buttoms_container}>
        <a
          href="https://github.com/Annbpiu"
          target="_blank"
          rel="noopener noreferrer"
          className={flex.footer_buttoms}
        >
          github
        </a>
        <a
          href="https://github.com/Annbpiu"
          target="_blank"
          rel="noopener noreferrer"
          className={flex.footer_buttoms}
        >
          contacts
        </a>
        <a
          href="https://github.com/Annbpiu"
          target="_blank"
          rel="noopener noreferrer"
          className={flex.footer_buttoms}
        >
          rights
        </a>
      </div>

      <div>
        <div className={flex.footer_top}>
          Back to top
          <button
            className={classNames(
              buttom.product_slide_buttons,
              flex.footer_top_button,
            )}
            onClick={() => componentDidMount()}
          >
            <img src="./img/Vector_up.png" alt="vector" />
          </button>
        </div>
      </div>
    </div>
  );
};

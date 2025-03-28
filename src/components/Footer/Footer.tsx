import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <>
      <div className={`${styles.footer_main_container}`}>
        <div className={`${styles.footer_logo_container}`}>
          <img
            src="../../img/logo/logo-main.svg"
            alt="logo"
            className={`${styles.footer_logo}`}
          />
        </div>

        <div className={`${styles.footer_text_container}`}>
          <p className={`${styles.footer_paragraph}`}>Github</p>
          <p className={`${styles.footer_paragraph}`}>Contacts</p>
          <p className={`${styles.footer_paragraph}`}>rights</p>
        </div>

        <div className={`${styles.footer_back_to_top_container}`}>
          <p className={`${styles.footer_back_to_top_text}`}>Back to top</p>
          {/* <button className={`${styles.footer_back_to_top_button}`}>
            <a href="#">
              <img
                src="../../img/icons/main-default-arrow.svg"
                alt="arrow up"
                className={`${styles.footer_back_to_top_arrow}`}
              />
            </a>
          </button> */}
          <Button
            direction={ButtonDirection.up}
            isDisabled={false}
            backToTop={true}
          />
        </div>
      </div>
    </>
  );
};

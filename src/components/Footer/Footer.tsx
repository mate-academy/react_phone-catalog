import React from 'react';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import styles from './Footer.module.scss';

type Props = {
  disabledIds: number[];
};

export const Footer: React.FC<Props> = ({ disabledIds }) => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0 });
  };

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
          <div className={`${styles.footer_paragraph_wrapper}`}>
            <p className={`${styles.footer_paragraph}`}>Github</p>
          </div>
          <div className={`${styles.footer_paragraph_wrapper}`}>
            <p className={`${styles.footer_paragraph}`}>Contacts</p>
          </div>
          <div className={`${styles.footer_paragraph_wrapper}`}>
            <p className={`${styles.footer_paragraph}`}>rights</p>
          </div>
        </div>

        <div className={`${styles.footer_back_to_top_container}`}>
          <p className={`${styles.footer_back_to_top_text}`}>Back to top</p>
          <Button
            direction={ButtonDirection.up}
            onClick={handleBackToTop}
            buttonId={4}
            disabledIds={disabledIds}
          />
        </div>
      </div>
    </>
  );
};

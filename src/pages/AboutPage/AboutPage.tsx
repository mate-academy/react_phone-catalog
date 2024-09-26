import React, { useContext } from 'react';
import styles from './AboutPage.module.scss';
import { FavoritesContext } from '../../context/FavoritesContext';
import classNames from 'classnames';

export const AboutPage: React.FC = () => {
  const { theme } = useContext(FavoritesContext);

  return (
    <div className={styles.container}>
      <h2
        className={classNames(styles.title, {
          [styles.dark]: theme === 'dark',
        })}
      >
        About us
      </h2>
      
      <h3
        className={classNames(styles.subtitle, {
          [styles.dark]: theme === 'dark',
        })}
      >
        Honest members of divDogs team
      </h3>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <div className={styles.photo}></div>

          <h4 className={styles.name}>Mr. Vadym Babisov</h4>
          <p className={styles.occupation}>Junior Front-End Developer</p>

          <div className={styles.telephoneWrapper}>
            <i className={styles.telephoneIcon}></i>
            <p className={styles.telephoneText}>Tel : 369 258 147</p>
          </div>

          <div className={styles.emailWrapper}>
            <i className={styles.emailIcon}></i>
            <a href="mailto:h@procrew.pro" className={styles.emailText}>
              vadym.babisov.dev@gmail.com
            </a>
          </div>

          <div className={styles.linksWrapper}>
            <i className={styles.linksFacebook}></i>
            <i className={styles.linksLinkedin}></i>
            <i className={styles.linksTelegram}></i>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.photo}></div>

          <h4 className={styles.name}>Mr. Andrii Hrachov</h4>
          <p className={styles.occupation}>Junior Front-End Developer</p>

          <div className={styles.telephoneWrapper}>
            <i className={styles.telephoneIcon}></i>
            <p className={styles.telephoneText}>Tel : 369 258 147</p>
          </div>

          <div className={styles.emailWrapper}>
            <i className={styles.emailIcon}></i>
            <a href="mailto:h@procrew.pro" className={styles.emailText}>
              hrachov.andrii.dev@gmail.com
            </a>
          </div>

          <div className={styles.linksWrapper}>
            <i className={styles.linksFacebook}></i>
            <i className={styles.linksLinkedin}></i>
            <i className={styles.linksTelegram}></i>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.photo}></div>

          <h4 className={styles.name}>Mr. Yaroslav Kolesnyk</h4>
          <p className={styles.occupation}>Junior Front-End Developer</p>

          <div className={styles.telephoneWrapper}>
            <i className={styles.telephoneIcon}></i>
            <p className={styles.telephoneText}>Tel : 369 258 147</p>
          </div>

          <div className={styles.emailWrapper}>
            <i className={styles.emailIcon}></i>
            <a href="mailto:h@procrew.pro" className={styles.emailText}>
              yaroslav.kolesnyk.dev@gmail.com
            </a>
          </div>

          <div className={styles.linksWrapper}>
            <i className={styles.linksFacebook}></i>
            <i className={styles.linksLinkedin}></i>
            <i className={styles.linksTelegram}></i>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.photo}></div>

          <h4 className={styles.name}>Mrs. Anna Kuzmych</h4>
          <p className={styles.occupation}>Junior Front-End Developer</p>

          <div className={styles.telephoneWrapper}>
            <i className={styles.telephoneIcon}></i>
            <p className={styles.telephoneText}>Tel : 369 258 147</p>
          </div>

          <div className={styles.emailWrapper}>
            <i className={styles.emailIcon}></i>
            <a href="mailto:h@procrew.pro" className={styles.emailText}>
              anna.kuzmych.work@gmail.com
            </a>
          </div>

          <div className={styles.linksWrapper}>
            <i className={styles.linksFacebook}></i>
            <i className={styles.linksLinkedin}></i>
            <i className={styles.linksTelegram}></i>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.photo}></div>

          <h4 className={styles.name}>Mr. Yehor Volkov</h4>
          <p className={styles.occupation}>Junior Front-End Developer</p>

          <div className={styles.telephoneWrapper}>
            <i className={styles.telephoneIcon}></i>
            <p className={styles.telephoneText}>Tel : 369 258 147</p>
          </div>

          <div className={styles.emailWrapper}>
            <i className={styles.emailIcon}></i>
            <a href="mailto:h@procrew.pro" className={styles.emailText}>
              yehor.volkov.work@gmail.com
            </a>
          </div>

          <div className={styles.linksWrapper}>
            <i className={styles.linksFacebook}></i>
            <i className={styles.linksLinkedin}></i>
            <i className={styles.linksTelegram}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

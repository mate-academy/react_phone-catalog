/* eslint-disable react/jsx-key */
import styles from './About.module.scss';
import { ProductInfo } from '../../../../../type/ProductInfo';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';
import { useContext } from 'react';
import classNames from 'classnames';

type Props = {
  currentCard: ProductInfo | null;
};

export const About: React.FC<Props> = ({ currentCard }) => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <div className={styles.about}>
      <h2
        className={classNames(styles.about__title, {
          [styles.about__title_dark]: !isSunSelected,
        })}
      >
        About
      </h2>

      {currentCard?.description.map(info => (
        <div className={styles.about__info}>
          <h3
            className={classNames(styles.about__info_title, {
              [styles.about__info_title_dark]: !isSunSelected,
            })}
          >
            {info.title}
          </h3>
          <p
            className={classNames(styles.about__info_text, {
              [styles.about__info_text_dark]: !isSunSelected,
            })}
          >
            {info.text}
          </p>
        </div>
      ))}
    </div>
  );
};

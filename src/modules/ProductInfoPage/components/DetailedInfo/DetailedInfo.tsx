import classNames from 'classnames';
import { ProductInfo } from '../../../../types/ProductInfo';
import styles from './DetailedInfo.module.scss';
import { useContext } from 'react';
import { AppContext } from '../../../../utils/AppContext';

type Description = {
  title: string;
  text: string[];
};

type Props = {
  product: ProductInfo;
};

export const DetailedInfo: React.FC<Props> = ({ product }) => {
  const {
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = product;

  const { isDarkTheme } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <h3
          className={classNames(
            styles.about__title,
            isDarkTheme ? styles.about__titleDark : '',
          )}
        >
          About
        </h3>

        <div
          className={classNames(
            styles.line,
            isDarkTheme ? styles.lineDark : '',
          )}
        ></div>

        {description.map((note: Description, index) => {
          const { title, text } = note;

          return (
            <div className={styles.article} key={index}>
              <h4
                className={classNames(
                  styles.article__title,
                  isDarkTheme ? styles.article__titleDark : '',
                )}
              >
                {title}
              </h4>

              <p
                className={classNames(
                  styles.article__text,
                  isDarkTheme ? styles.article__textDark : '',
                )}
              >
                {text}
              </p>
            </div>
          );
        })}
      </div>

      <div className={styles.techInfo__container}>
        <h3
          className={classNames(
            styles.about__title,
            isDarkTheme ? styles.about__titleDark : '',
          )}
        >
          Tech specs
        </h3>

        <div
          className={classNames(
            styles.line,
            isDarkTheme ? styles.lineDark : '',
          )}
        ></div>

        <div className={styles.techInfo}>
          {screen && (
            <div className={styles.techInfo__line}>
              <span
                className={classNames(
                  styles.techInfo__lineTitle,
                  isDarkTheme ? styles.techInfo__lineTitleDark : '',
                )}
              >
                Screen
              </span>

              <span
                className={classNames(
                  styles.techInfo__lineText,
                  isDarkTheme ? styles.techInfo__lineTextDark : '',
                )}
              >
                {screen}
              </span>
            </div>
          )}

          {resolution && (
            <div className={styles.techInfo__line}>
              <span
                className={classNames(
                  styles.techInfo__lineTitle,
                  isDarkTheme ? styles.techInfo__lineTitleDark : '',
                )}
              >
                Resolution
              </span>

              <span
                className={classNames(
                  styles.techInfo__lineText,
                  isDarkTheme ? styles.techInfo__lineTextDark : '',
                )}
              >
                {resolution}
              </span>
            </div>
          )}

          {processor && (
            <div className={styles.techInfo__line}>
              <span
                className={classNames(
                  styles.techInfo__lineTitle,
                  isDarkTheme ? styles.techInfo__lineTitleDark : '',
                )}
              >
                Processor
              </span>

              <span
                className={classNames(
                  styles.techInfo__lineText,
                  isDarkTheme ? styles.techInfo__lineTextDark : '',
                )}
              >
                {processor}
              </span>
            </div>
          )}

          {ram && (
            <div className={styles.techInfo__line}>
              <span
                className={classNames(
                  styles.techInfo__lineTitle,
                  isDarkTheme ? styles.techInfo__lineTitleDark : '',
                )}
              >
                Ram
              </span>

              <span
                className={classNames(
                  styles.techInfo__lineText,
                  isDarkTheme ? styles.techInfo__lineTextDark : '',
                )}
              >
                {ram}
              </span>
            </div>
          )}

          {camera && (
            <div className={styles.techInfo__line}>
              <span
                className={classNames(
                  styles.techInfo__lineTitle,
                  isDarkTheme ? styles.techInfo__lineTitleDark : '',
                )}
              >
                Camera
              </span>

              <span
                className={classNames(
                  styles.techInfo__lineText,
                  isDarkTheme ? styles.techInfo__lineTextDark : '',
                )}
              >
                {camera}
              </span>
            </div>
          )}

          {zoom && (
            <div className={styles.techInfo__line}>
              <span
                className={classNames(
                  styles.techInfo__lineTitle,
                  isDarkTheme ? styles.techInfo__lineTitleDark : '',
                )}
              >
                Zoom
              </span>

              <span
                className={classNames(
                  styles.techInfo__lineText,
                  isDarkTheme ? styles.techInfo__lineTextDark : '',
                )}
              >
                {zoom}
              </span>
            </div>
          )}

          {cell && (
            <div className={styles.techInfo__line}>
              <span
                className={classNames(
                  styles.techInfo__lineTitle,
                  isDarkTheme ? styles.techInfo__lineTitleDark : '',
                )}
              >
                Cell
              </span>

              <span
                className={classNames(
                  styles.techInfo__lineText,
                  isDarkTheme ? styles.techInfo__lineTextDark : '',
                )}
              >
                {cell.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

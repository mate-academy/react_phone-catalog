import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  alt: string;
  imageMax640: string;
  image: string;
  textTitle: React.ReactNode;
  textTitle2: string;
  paragraph: string;
  textButton: string;
  to: string;
};

export const Slide = ({
  textButton,
  paragraph,
  textTitle,
  textTitle2,
  alt,
  imageMax640,
  image,
  to,
  ...props
}: Props) => {
  return (
    <div {...props} className={styles.slide}>
      <div className={styles.leftContainer}>
        <h2 className={styles.title}>{textTitle}</h2>
        <p className={styles.paragraph}>{paragraph}</p>
        <Link aria-label={to} to={to} className={styles.button}>
          {textButton}
        </Link>
      </div>

      <div className={styles.rightContainer}>
        <h2 className={classNames(styles.title2)}>{textTitle2}</h2>

        <picture className={classNames(styles.image)}>
          <source media="(max-width: 640px)" srcSet={imageMax640} />

          <img src={image} alt={alt} loading="lazy" />
        </picture>
      </div>
      <Link aria-label={to} to={to} className={classNames(styles.button, styles.button2)}>
        {textButton}
      </Link>
    </div>
  );
};

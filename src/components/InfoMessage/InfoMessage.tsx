import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './InfoMessage.module.scss';

type Props = {
  title: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  className?: string;
};

export const InfoMessage: React.FC<Props> = ({
  title,
  image,
  buttonText,
  buttonLink,
  onButtonClick,
  className = '',
}) => {
  const hasButton = Boolean(buttonText);
  const renderButton = () => {
    if (!hasButton) {
      return null;
    }

    if (buttonLink) {
      return (
        <Link to={buttonLink} className={styles['info-message__button']}>
          {buttonText}
        </Link>
      );
    }

    return (
      <button
        onClick={onButtonClick}
        className={styles['info-message__button']}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div
      className={classNames(styles['info-message'], className, {
        [styles['info-message--no-button']]: !hasButton,
      })}
    >
      <h3 className={styles['info-message__title']}>{title}</h3>
      {renderButton()}
      <img
        src={image}
        alt="State illustration"
        className={styles['info-message__img']}
      />
    </div>
  );
};

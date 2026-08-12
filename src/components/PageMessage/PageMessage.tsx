import { useId } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../Button';
import styles from './PageMessage.module.scss';

type Props = {
  title: string;
  text?: string;
  image?: string;
  actionText?: string;
  actionTo?: string;
  onAction?: () => void;
  titleTag?: 'h1' | 'h2';
};

export const PageMessage = ({
  title,
  text,
  image,
  actionText,
  actionTo,
  onAction,
  titleTag = 'h2',
}: Props) => {
  const titleId = useId();
  const imageSrc = image ? `${import.meta.env.BASE_URL}${image}` : '';
  const TitleTag = titleTag;

  return (
    <section className={styles.message} aria-labelledby={titleId}>
      {image && (
        <img
          className={styles.image}
          src={imageSrc}
          alt=""
          aria-hidden="true"
        />
      )}

      <TitleTag className={styles.title} id={titleId}>
        {title}
      </TitleTag>

      {text && <p className={styles.text}>{text}</p>}

      {actionText && actionTo && (
        <Link className={styles.link} to={actionTo}>
          <Button>{actionText}</Button>
        </Link>
      )}

      {actionText && onAction && (
        <Button onClick={onAction}>{actionText}</Button>
      )}
    </section>
  );
};

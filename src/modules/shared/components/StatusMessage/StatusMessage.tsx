import { ReactNode } from 'react';
import styles from './StatusMessage.module.scss';

interface Props {
  text: string;
  image?: string;
  children?: ReactNode;
}

export const StatusMessage = ({ text, image, children }: Props) => (
  <div className={styles['status-message']}>
    <p className={styles['status-message__text']}>{text}</p>

    {image && (
      <img src={image} alt="" className={styles['status-message__image']} />
    )}

    {children}
  </div>
);

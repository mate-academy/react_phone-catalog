import { FC } from 'react';
import { Message } from '../Message';

import styles from './EmptyMessage.module.scss';

interface Props {
  message: string;
  imgPath?: string;
}

export const EmptyMessage: FC<Props> = ({
  message,
  imgPath = 'img/product-not-found.png',
}) => {
  return (
    <Message>
      <Message.Icon>
        <img src={imgPath} alt={message} className={styles.emptyMessageIcon} />
      </Message.Icon>
      <Message.Title>{message}</Message.Title>
    </Message>
  );
};

import { Button } from '@/modules/shared/components/Button';
import { Message } from '@/modules/shared/components/Message';
import { FC } from 'react';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { TbReload } from 'react-icons/tb';

import styles from './ErrorMessage.module.scss';

interface Props {
  message: string;
  className?: string;
  onRetry: () => void;
}

export const ErrorMessage: FC<Props> = ({ message, onRetry, className }) => {
  return (
    <Message className={className}>
      <Message.Icon>
        <MdOutlineErrorOutline size={80} />
      </Message.Icon>
      <Message.Title>{message}</Message.Title>
      <Message.Actions>
        <Button
          variant="danger"
          startIcon={<TbReload size={18} />}
          size="medium"
          onClick={onRetry}
          className={styles.errorBtn}
        >
          Try again
        </Button>
      </Message.Actions>
    </Message>
  );
};

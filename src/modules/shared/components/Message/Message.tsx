import { FC } from 'react';
import styles from './Message.module.scss';
import { Button } from '../Button';
import classNames from 'classnames';
import { TbReload } from 'react-icons/tb';

interface Props {
  imgPath?: string;
  message: string;
  showRetry?: boolean;
  className?: string;
  onRetry?: () => void;
}

export const Message: FC<Props> = ({
  message,
  imgPath,
  onRetry = () => {},
  showRetry = false,
  className,
}) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {imgPath && (
        <div className={styles.imgWrapper}>
          <img src={imgPath} />
        </div>
      )}
      <h2 className={styles.message}>{message}</h2>
      {showRetry && (
        <Button
          variant="danger"
          onClick={onRetry}
          className={styles.retryBtn}
          startIcon={<TbReload size={18} />}
          size="medium"
        >
          Try again
        </Button>
      )}
    </div>
  );
};

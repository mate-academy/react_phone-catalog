import styles from './TextButton.module.scss';
import cn from 'classnames';

type TextButtonProps = {
  title: string;
  height?: string;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const TextButton = ({
  title,
  height,
  isActive = false,
  onClick = () => {},
}: TextButtonProps) => {
  return (
    <div
      className={cn(styles.container, {
        [styles.container__active]: isActive,
      })}
      style={{
        ...(height ? { height } : {}),
      }}
      onClick={onClick}
    >
      <button>
        <span>{title}</span>
      </button>
    </div>
  );
};

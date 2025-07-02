import { ButtonsProps } from '@shtypes/ButtonProps';
import styles from './button.module.scss';

type Props = {
  data: ButtonsProps;
  span?: string;
  className: string;
  fn?: () => void;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  data,
  span,
  className,
  fn,
  disabled,
}) => {
  const { name, path } = data;

  return (
    <button
      className={`${styles.button} ${className}`}
      aria-label={`${name}`}
      onClick={() => fn?.()}
      disabled={disabled}
    >
      {span && <span className={styles.span}>{span}</span>}
      {path && (
        <span
          className={styles.icon}
          style={{
            WebkitMaskImage: `url(/src/shared/icons/${path})`,
            maskImage: `url(/src/shared/icons/${path})`,
          }}
        ></span>
      )}
    </button>
  );
};

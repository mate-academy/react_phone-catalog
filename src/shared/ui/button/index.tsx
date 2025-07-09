import { AriaNames, ButtonCN, IconPath } from '@shared/types/ButtonProps';
import styles from './button.module.scss';

type Props = {
  ariaName: AriaNames;
  iconPath?: IconPath;
  text?: string;
  fn?: (arg?: unknown) => unknown;
  disabled?: boolean;
  className: ButtonCN;
};

export const Button: React.FC<Props> = ({
  ariaName,
  iconPath,
  text,
  fn,
  disabled,
  className,
}) => {
  const { main, span, icon } = className;

  return (
    <button
      className={`${main} ${styles.button}`}
      aria-label={text ? '' : `${ariaName}`}
      onClick={() => fn?.()}
      disabled={disabled}
    >
      {span && <span className={`${span} ${styles.button__span}`}>{text}</span>}
      {iconPath && (
        <span
          className={`${icon} ${styles.button__icon}`}
          style={{
            WebkitMaskImage: `url(/src/shared/icons${iconPath})`,
            maskImage: `url(/src/shared/icons${iconPath})`,
          }}
        ></span>
      )}
    </button>
  );
};

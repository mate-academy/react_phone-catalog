// PrevButton

import styles from './PrevButton.module.scss';
interface PrevButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrevButton = ({
  className = '',
  disabled = false,
  ...props
}: PrevButtonProps) => {
  const combinedClassName = `${styles.btnPrev} ${className}`.trim();

  return (
    <button
      type="button"
      className={combinedClassName}
      disabled={disabled}
      {...props} // сюди автоматично потрапить onClick та інші події
    >
      <img className={styles.icon} src="/icons/arrow-left.svg" alt="Previous" />
    </button>
  );
};

// NextButton

import styles from './NextButton.module.scss';
import arrowRight from '/icons/arrow-right.svg';
interface NextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const NextButton = ({
  className = '',
  disabled = false,
  ...props
}: NextButtonProps) => {
  const combinedClassName = `${styles.btnNext} ${className}`.trim();

  return (
    <button
      type="button"
      className={combinedClassName}
      disabled={disabled}
      {...props} // сюди автоматично потрапить onClick та інші події
    >
      <img className={styles.icon} src={arrowRight} alt="Next" />
    </button>
  );
};

import classNames from 'classnames';
import styles from './AccentButton.module.scss';

type Props = {
  text: string;
  onClick?: () => void;
  hasCart?: boolean;
};

export const AccentButton: React.FC<Props> = ({ text, onClick, hasCart }) => {
  return (
    <button
      className={classNames(styles.accentButton, {
        [styles.accentButton__added]: hasCart,
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

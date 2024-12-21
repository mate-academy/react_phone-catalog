import classNames from 'classnames';
import styles from './Dash.module.scss';

type HandleClick = () => void;

type Props = {
  label: number;
  position: number;
  activePosition: number;
  onClick: HandleClick;
};

export const Dash: React.FC<Props> = ({
  label,
  position,
  activePosition,
  onClick,
}) => {
  return (
    <li>
      <button
        className={classNames(
          styles.Button,
          activePosition === position && styles.Button_active,
        )}
        onClick={onClick}
      >
        <span className={styles.Label}>{label}</span>
      </button>
    </li>
  );
};

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
    <li
      className={classNames(activePosition === position && styles.Dash_active)}
    >
      <label htmlFor={`Dash${position}`} className={styles.Label}>
        {label}
      </label>

      <button
        id={`Dash${position}`}
        className={styles.Button}
        onClick={onClick}
      />
    </li>
  );
};

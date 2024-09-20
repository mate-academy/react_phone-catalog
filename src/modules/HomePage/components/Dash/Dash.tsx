import classNames from 'classnames';
import styles from './Dash.module.scss';
import { useId } from 'react';

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
  const id = useId();

  return (
    <li>
      <label htmlFor={id} className={styles.Label}>
        {label}
      </label>

      <button
        id={id}
        className={classNames(
          styles.Button,
          activePosition === position && styles.Button_active,
        )}
        onClick={onClick}
      />
    </li>
  );
};

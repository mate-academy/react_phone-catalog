import classNames from 'classnames';
import styles from '../styles/blockButton.module.scss';

type Props = {
  el: string;
  onClick: () => void;
  active: boolean;
};

export const ImageButton = ({ el, onClick, active }: Props) => {
  return (
    <button
      className={classNames(styles.button, { [styles.active]: active })}
      key={el}
      role="tab"
      onClick={onClick}
      aria-current={active}
      aria-label={`Show slide #${el + 1}`}
    >
      <img className={styles.inner} src={el} />
    </button>
  );
};

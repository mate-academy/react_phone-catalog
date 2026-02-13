import classNames from 'classnames';
import styles from '../styles/blockButton.module.scss';

type Props = {
  el: number;
  onClick: () => void;
  active: boolean;
};

export const BlockButton = ({ el, onClick, active }: Props) => {
  return (
    <button
      className={styles['pagination-button']}
      key={el}
      role="tab"
      onClick={onClick}
      aria-current={active}
      aria-label={`Show slide #${el + 1}`}
    >
      <div
        className={classNames(styles['pagination-block'], {
          [styles['pagination-block-is-active']]: active,
        })}
      />
    </button>
  );
};

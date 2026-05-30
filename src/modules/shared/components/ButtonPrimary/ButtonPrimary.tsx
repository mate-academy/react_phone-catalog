import classNames from 'classnames';
import styles from './ButtonPrimary.module.scss';

type Props = {
  onClick?: () => void;
  title: string;
  isSelected?: boolean;
};

export const ButtonPrimary: React.FC<Props> = ({
  onClick = () => {},
  title,
  isSelected = false,
}) => {
  return (
    <button
      className={classNames(styles['button-primary'], {
        [styles[`button-primary--selected`]]: isSelected,
      })}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

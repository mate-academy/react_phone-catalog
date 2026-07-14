import classNames from 'classnames';
import styles from './FavoriteButton.module.scss';
import { getImageUrl } from '../../utils/getImageUrl';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const FavoriteButton: React.FC<Props> = ({
  disabled,
  selected,
  className,
  ...props
}) => {
  const classes = classNames(
    styles.btn,
    {
      [styles['btn--selected']]: selected,
    },
    className,
  );

  return (
    <button {...props} disabled={disabled} className={classes}>
      {selected ? (
        <img src={getImageUrl('/icons/active-heart.svg')} alt="" />
      ) : (
        <img src={getImageUrl('/icons/heart.svg')} alt="" />
      )}
    </button>
  );
};

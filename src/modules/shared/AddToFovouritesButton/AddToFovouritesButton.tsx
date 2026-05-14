import classNames from 'classnames';
import s from './AddToFovouritesButton.module.scss';

type Props = {
  selected?: boolean;
  onClick?: () => void;
};

export const AddToFovouritesButton = ({
  selected = false,
  onClick = () => {},
}: Props) => {
  return (
    <button
      className={classNames(s.button, {
        [s['button--selected']]: selected,
      })}
      onClick={onClick}
    ></button>
  );
};

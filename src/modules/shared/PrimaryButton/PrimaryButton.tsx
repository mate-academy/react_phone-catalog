import classNames from 'classnames';
import s from './PrimaryButton.module.scss';

type Props = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryButton = ({
  selected = false,
  children,
  onClick,
}: Props) => {
  return (
    <button
      className={classNames(s.button, {
        [s['button--selected']]: selected,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

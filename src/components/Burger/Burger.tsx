import classNames from 'classnames';

type Props = {
  burgerActive: boolean,
  setBurgerActive: (value: boolean) => void
};

export const Burger: React.FC<Props> = ({ burgerActive, setBurgerActive }) => {
  return (
    <button
      type="button"
      className={classNames('button navbar-burger', {
        'is-active': burgerActive,
      })}
      data-formTarget="nevMenu"
      onClick={() => {
        setBurgerActive(!burgerActive);
      }}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

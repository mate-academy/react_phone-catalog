/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import classNames from 'classnames';
import './BurgerIcon.scss';

type Props = {
  onClick: (state: boolean) => void,
  isOpen: boolean,
};

export const BurgerIcon: React.FC<Props> = ({ onClick, isOpen }) => {
  const handleOnClick = () => {
    onClick(!isOpen);
  };

  return (
    <div
      className="burger-icon"
      onClick={handleOnClick}
    >
      <div
        className={classNames('burger-icon__line', {
          'burger-icon__translateX burger-icon__open1': isOpen,
        })}
      />
      <div
        className={classNames('burger-icon__line burger-icon__line2', {
          'burger-icon__translateXminus burger-icon__open2': isOpen,
        })}
      />
    </div>
  );
};

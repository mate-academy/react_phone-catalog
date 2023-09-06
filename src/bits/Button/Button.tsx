/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import './Button.scss';
import { ButtonType } from '../../types/enums/ButtonType';

type Props = {
  size: ButtonType,
};

export const Button: React.FC<Props> = ({ size }) => {
  return (
    <button
      type="button"
      className={classNames('button', {
        'button--cart': size === ButtonType.cart,
        ' button--cart button--cart--large': size === ButtonType.large,
      })}
    />
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import './Button.scss';
import { ButtonType } from '../../types/enums/ButtonType';
import { useProducts } from '../../context';

type Props = {
  size: ButtonType,
  handler?: () => void,
  id?: string,
  disabled?: boolean,
};

export const Button: React.FC<Props> = ({
  size,
  handler,
  id,
  disabled,
}) => {
  const { cart } = useProducts();

  const isInCart = cart.some(item => item.itemId === id);

  return (
    <button
      type="button"
      onClick={handler}
      disabled={disabled}
      className={classNames('button', {
        'button--cart': size === ButtonType.small,
        'button--cart button--cart--large': size === ButtonType.large,
        'button--checkout': size === ButtonType.checkout,
        'button--added': isInCart,
      })}
    />
  );
};

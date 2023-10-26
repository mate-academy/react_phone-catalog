import classNames from 'classnames';
import { Product } from '../../types/Product';
import './ButtonHeart.scss';

type Props = {
  product: Product;
};

export const ButtonHeart: React.FC<Props> = () => {
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      data-cy="addToFav"
      className={classNames(
        'button-fav',
      )}
      type="button"
    />
  );
};

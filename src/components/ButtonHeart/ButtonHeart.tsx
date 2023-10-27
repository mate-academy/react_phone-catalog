import classNames from 'classnames';
import './ButtonHeart.scss';

type Props = {
  productId: string;
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

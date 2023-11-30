/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCard, removeCard } from '../../features/cardSlice';
import { ProductPhone } from '../../Type/phone';
import './BuyButtonCard.scss';

type Props = {
  phone: ProductPhone | null;
};

export const BuyButtonCart: React.FC<Props> = ({ phone }) => {
  const cardPhones
    = useAppSelector(state => state.card.cardPhones);
  const dispatch = useAppDispatch();

  const hasPhone = cardPhones
    .find((cardItem: ProductPhone) => cardItem.phoneId === phone?.phoneId);

  function handelCardPhone() {
    if (phone && !hasPhone) {
      dispatch(addCard(phone));
    }

    if (phone && hasPhone) {
      dispatch(removeCard(phone));
    }
  }

  return (
    <div className="button">
      <button
        aria-label="Mute volume"
        className={classNames(
          'button__link', {
            'button__link-active': hasPhone,
          },
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handelCardPhone();
        }}

      >
        {hasPhone ? 'Added to cart' : 'Add to cart' }
      </button>
    </div>
  );
};

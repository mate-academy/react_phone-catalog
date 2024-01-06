import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { capitalize } from '../../helpers/utils/capitalize';
import './Modal.scss';
import { hideCartModal, hideFavouriteModal } from '../../features/modalSlice';

type Props = {
  type: 'cart' | 'favourite';
};

export const Modal: React.FC<Props> = ({ type }) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    if (type === 'cart') {
      dispatch(hideCartModal());
    } else {
      dispatch(hideFavouriteModal());
    }
  };

  return (
    <div className="modal">
      <button
        type="button"
        aria-label="button"
        onClick={() => onClick()}
        className="modal__icon modal__icon--close"
      />
      <div className="modal__content">
        <div className="modal__texts">
          <div className="modal__icon modal__icon--done" />
          <h1 className="modal__title">Product was added</h1>
          <p className="modal__text">
            {`Click to check your ${capitalize(type)}`}
          </p>
        </div>

        <button
          type="button"
          aria-label="button"
          className="modal__button"
        >
          <Link to={`/${type}`} className="modal__link">
            <div className={`modal__icon modal__icon--${type}`} />
          </Link>
        </button>
      </div>
    </div>
  );
};

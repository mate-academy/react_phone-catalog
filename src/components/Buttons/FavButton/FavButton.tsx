import heartIcon from '../../../assets/svg/heart.svg';
import './FavButton.scss';

type FavButtonProps = {
  size: number;
};

export const FavButton = ({ size }: FavButtonProps) => (
  <button style={{ width: size, height: size }} type="button" className="fav-button">
    <img
      className="fav-button__icon"
      src={heartIcon}
      alt="Add to favorites icon"
    />
  </button>
);

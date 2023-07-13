import favorite from '../../imgs/Favourites (Heart Like).svg';
import './button.scss';

export const FavButton: React.FC = () => {
  return (
    <button type="button" className="button button__fav">
      <img src={favorite} alt="" />
    </button>
  );
};

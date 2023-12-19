import './Buttons.scss';

export const Buttons = () => {
  return (
    <div className="buttons">
      <button
        className="buttons__buy"
        type="button"
      >
        <p className="buttons__buy-name">Add to cart</p>
      </button>

      <button
        aria-label="button"
        className="buttons__fav"
        type="button"
      >
        <img
          src="img/mine/icons/Favourites (Heart Like).svg"
          alt=""
          className="buttons__fav-img"
        />
      </button>
    </div>
  );
};

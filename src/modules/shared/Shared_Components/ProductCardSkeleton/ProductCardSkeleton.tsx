export const ProductCardSkeleton = () => {
  return (
    <div id={`card_skeleton`} className="card card--skeleton carousel__card">
      <div className="card__top">
        <div className="card__img card__img--skeleton" />

        <p className="card__title card__title--skeleton"></p>

        <div className="card__price-container">
          <p className="card__price card__price--skeleton "></p>
        </div>
      </div>

      <div className="card__bottom">
        <div className="card__details">
          <div className="card__detail">
            <p className="card__text card__text--skeleton" />
          </div>

          <div className="card__detail">
            <p className="card__text card__text--skeleton" />
          </div>

          <div className="card__detail">
            <p className="card__text card__text--skeleton" />
          </div>
        </div>

        <div className="buttons">
          <button
            className="
              buttons__button-cart buttons__button-cart--skeleton
              "
          />

          <button
            className="
            buttons__button-favorites
            buttons__button-favorites--skeleton
            "
          />
        </div>
      </div>
    </div>
  );
};

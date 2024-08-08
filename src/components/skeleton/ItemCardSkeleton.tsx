import './ItemCardSkeleton.scss';

export const ItemCardSkeleton = () => {
  return (
    <div className="items">
      <div className="item is-loading">
        <div className="item__image-container skeleton" />
        <p className="item__title skeleton" />

        <p className="item__title-bottom skeleton" />

        <div className="item__price-group">
          <p className="item__price skeleton" />
          <p className="item__price-right skeleton" />
        </div>

        <div className="item__divider skeleton" />

        <div className="item__text-group">
          <p className="item__text skeleton" />
          <p className="item__text-right skeleton" />
        </div>

        <div className="item__text-group">
          <p className="item__text skeleton" />
          <p className="item__text-right skeleton" />
        </div>

        <div className="item__text-group">
          <p className="item__text skeleton" />
          <p className="item__text-right skeleton" />
        </div>

        <div className="item__actions">
          <button
            type="button"
            aria-label="Loading button"
            className="item__button item__button-left skeleton"
          />
          <button
            type="button"
            aria-label="Loading button"
            className="item__button item__button-right skeleton"
          />
        </div>
      </div>
    </div>
  );
};

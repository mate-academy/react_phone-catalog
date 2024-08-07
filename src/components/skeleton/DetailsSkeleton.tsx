import './DetailsSkeleton.scss';

export const DetailsSkeleton = () => {
  return (
    <div className="elems">
      <div className="elem__image-container skeleton" />
      <p className="elem__title skeleton" />

      <p className="elem__title-bottom skeleton" />

      <div className="elem__price-group">
        <p className="elem__price skeleton" />
        <p className="elem__price-right skeleton" />
      </div>

      <div className="elem__divider skeleton" />

      <div className="elem__text-group">
        <p className="elem__text skeleton" />
        <p className="elem__text-right skeleton" />
      </div>

      <div className="elem__text-group">
        <p className="elem__text skeleton" />
        <p className="elem__text-right skeleton" />
      </div>

      <div className="elem__text-group">
        <p className="elem__text skeleton" />
        <p className="elem__text-right skeleton" />
      </div>

      <div className="elem__actions">
        <button
          type="button"
          aria-label="Loading button"
          className="elem__button elem__button-left skeleton"
        />
        <button
          type="button"
          aria-label="Loading button"
          className="elem__button elem__button-right skeleton"
        />
      </div>
    </div>
  );
};

import { useContext } from 'react';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';
import classNames from 'classnames';

/* eslint-disable max-len */
export const ProductDescriptionSkeleton = () => {
  const { isDark } = useContext(DarkModeContext);

  return (
    <div className="details__main">
      <div className="details__features">
        <div className="details__images">
          <div className="details__main-image details__main-image--skeleton" />

          <div className="details__secondary-images">
            <div className="details__secondary-image details__secondary-image--skeleton" />

            <div className="details__secondary-image details__secondary-image--skeleton" />

            <div className="details__secondary-image details__secondary-image--skeleton" />

            <div className="details__secondary-image details__secondary-image--skeleton" />

            <div className="details__secondary-image details__secondary-image--skeleton" />
          </div>
        </div>

        <div className="details__controls details__controls--skeleton">
          <div className="details__colors details__colors--skeleton" />

          <div className="details__colors details__colors--skeleton" />

          <div className="details__price details__price--skeleton" />

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

          <div className="details__specs">
            <div className="details__tech-detail details__tech-detail--skeleton" />

            <div className="details__tech-detail details__tech-detail--skeleton" />

            <div className="details__tech-detail details__tech-detail--skeleton" />

            <div className="details__tech-detail details__tech-detail--skeleton" />
          </div>
        </div>
      </div>

      <div className="details__description">
        <div className="details__about">
          <h2
            className={classNames(
              'title title--h2 details__description-title',
              {
                'title--is-Dark': isDark,
              },
            )}
          >
            About
          </h2>

          <div className="details__about-block--skeleton" />
        </div>

        <div className="details__tech-specs">
          <h2
            className={classNames(
              'title title--h2 details__description-title',
              {
                'title--is-Dark': isDark,
              },
            )}
          >
            Tech Specs
          </h2>

          <div className="details__about-block--skeleton" />
        </div>
      </div>
    </div>
  );
};

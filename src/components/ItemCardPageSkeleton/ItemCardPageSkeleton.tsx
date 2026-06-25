import classNames from 'classnames';
// eslint-disable-next-line max-len
import itemCardPageStyles from '../../pages/ItemCardPage/ItemCardPage.module.scss';
// eslint-disable-next-line max-len
import itemCardShortInfoStyles from '../ItemCardShortInfo/ItemCardShortInfo.module.scss';
import skeletonStyles from './ItemCardPageSkeleton.module.scss';

export const ItemCardPageSkeleton = () => {
  return (
    <>
      <div className={classNames('container', itemCardPageStyles.ItemCardPage)}>
        <div
          className={classNames(
            skeletonStyles.skeleton,
            skeletonStyles.breadcrumbs,
          )}
        />

        <div
          className={classNames(
            skeletonStyles.skeleton,
            skeletonStyles.backButton,
          )}
        />

        <article>
          <div
            className={classNames(
              'font-h2',
              itemCardShortInfoStyles.Title,
              skeletonStyles.skeleton,
              skeletonStyles.title,
            )}
          />

          <div className={itemCardShortInfoStyles.ContentWrapper}>
            <div className={itemCardShortInfoStyles.ImageContainer}>
              <div
                className={classNames(
                  itemCardShortInfoStyles.MainImage,
                  skeletonStyles.skeleton,
                  skeletonStyles.mainImage,
                )}
              />

              <div className={itemCardShortInfoStyles.SmallImages}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={classNames(
                      itemCardShortInfoStyles.SmallImage,
                      skeletonStyles.skeleton,
                      skeletonStyles.smallImage,
                    )}
                  />
                ))}
              </div>
            </div>

            <div className={itemCardShortInfoStyles.AdditionalInfoContainer}>
              <section className={itemCardShortInfoStyles.ColorSelectorSection}>
                <div
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.colorSelector,
                  )}
                />
                <div
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.id,
                  )}
                />
              </section>

              <div className={itemCardShortInfoStyles.HorizontalLine} />

              <section className={itemCardShortInfoStyles.CapacitySection}>
                <div
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.capacityTitle,
                  )}
                />

                <div className={itemCardShortInfoStyles.CapacityButtons}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className={classNames(
                        itemCardShortInfoStyles.CapacityButtonWrapper,
                        skeletonStyles.skeleton,
                      )}
                    />
                  ))}
                </div>
              </section>

              <div className={itemCardShortInfoStyles.HorizontalLine} />

              <section className={itemCardShortInfoStyles.PriceAndButtons}>
                <div
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.price,
                  )}
                />

                <div className={itemCardShortInfoStyles.Buttons}>
                  <div
                    className={classNames(
                      skeletonStyles.skeleton,
                      skeletonStyles.cartButton,
                    )}
                  />
                  <div
                    className={classNames(
                      skeletonStyles.skeleton,
                      skeletonStyles.favoriteButton,
                    )}
                  />
                </div>

                <div className={itemCardShortInfoStyles.Details}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <p
                      key={index}
                      className={itemCardShortInfoStyles.DetailsInfo}
                    >
                      <span
                        className={classNames(
                          skeletonStyles.skeleton,
                          skeletonStyles.detailTitle,
                        )}
                      />
                      <span
                        className={classNames(
                          skeletonStyles.skeleton,
                          skeletonStyles.detailText,
                        )}
                      />
                    </p>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>

        <div className={itemCardPageStyles.ContentContainer}>
          <article className={skeletonStyles.about}>
            <div
              className={classNames(
                itemCardPageStyles.AboutTitle,
                skeletonStyles.skeleton,
                skeletonStyles.sectionTitle,
              )}
            />

            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <div
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.aboutSubtitle,
                  )}
                />
                <div
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.aboutText,
                  )}
                />
                <div
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.aboutTextShort,
                  )}
                />
              </div>
            ))}
          </article>

          <article className={itemCardPageStyles.TechSpecs}>
            <div
              className={classNames(
                itemCardPageStyles.TechSpecsTitle,
                skeletonStyles.skeleton,
                skeletonStyles.sectionTitle,
              )}
            />

            {Array.from({ length: 7 }).map((_, index) => (
              <p key={index} className={itemCardPageStyles.TechSpecData}>
                <span
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.techSpecTitle,
                  )}
                />
                <span
                  className={classNames(
                    skeletonStyles.skeleton,
                    skeletonStyles.techSpecValue,
                  )}
                />
              </p>
            ))}
          </article>
        </div>
      </div>

      <div className={itemCardPageStyles.SliderContainer}>
        <div className="container">
          <div
            className={classNames(
              skeletonStyles.skeleton,
              skeletonStyles.sliderTitle,
            )}
          />
          <div className={skeletonStyles.sliderItems}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={classNames(
                  skeletonStyles.skeleton,
                  skeletonStyles.sliderItem,
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

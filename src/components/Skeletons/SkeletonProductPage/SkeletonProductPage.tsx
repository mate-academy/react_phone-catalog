import styles from './SkeletonProductPage.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import classNames from 'classnames';

export const SkeletonProductPage = () => {
  let productTitleRows = 1;
  let descriptionRows = 5;

  if (window.innerWidth <= 380) {
    productTitleRows = 2;
    descriptionRows = 8;
  }

  return (
    <section className={styles.container}>
      <SkeletonTheme baseColor="#3B3E4A" highlightColor="#4A4D58">
        <div className={styles.breadcrumbs}>
          <Skeleton />
        </div>
        <div className={styles.goBack}>
          <Skeleton />
        </div>
        <div className={styles.productTitle}>
          <Skeleton count={productTitleRows} />
        </div>
        <div className={styles.swiperContainer}>
          <div className={styles.mainImg}>
            <Skeleton />
          </div>

          <div className={styles.smallImgContainer}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className={styles.smallImg} />
              ))}
          </div>
        </div>
        <div className={styles.productSpecsContainer}>
          <div className={styles.configContainer}>
            <Skeleton className={styles.subTitle} />
            <div className={styles.configSelection}>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className={styles.color} />
                ))}
            </div>
            <div className={styles.randomID}>
              <Skeleton />
            </div>
          </div>
          <div className={styles.configContainer}>
            <Skeleton className={styles.subTitle} />
            <div className={styles.configSelection}>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className={styles.capacity} />
                ))}
            </div>
          </div>
          <div className={styles.priceContainer}>
            <p className={styles.price}>
              <Skeleton />
            </p>
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.btnAddToCart}>
              <Skeleton className={styles.btnAddToCartRadius} />
            </div>
            <Skeleton circle={true} className={styles.btnFavorite} />
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemScreen,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemScreen1,
                )}
              />
            </div>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemResolution,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemScreen1,
                )}
              />
            </div>

            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor1,
                )}
              />
            </div>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemRAM,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemRAM1,
                )}
              />
            </div>
          </div>
        </div>
        <div className={styles.aboutProductContainer}>
          <div className={styles.aboutTitle}>
            <Skeleton className={styles.aboutTitleText} />
          </div>
          {Array(3)
            .fill(0)
            .map((_, index) => {
              return (
                <div className={styles.descriptionContainer} key={index}>
                  <p
                    className={classNames(styles.descriptionTitle, {
                      [styles.descriptionTitleLast]: index === 2,
                    })}
                  >
                    <Skeleton />
                  </p>
                  {Array(descriptionRows)
                    .fill(0)
                    .map((__, i) => (
                      <p key={i}>
                        <Skeleton />
                      </p>
                    ))}
                </div>
              );
            })}
        </div>
        <div className={styles.productTechSpecContainer}>
          <h3 className={styles.aboutTitle}>
            <Skeleton className={styles.aboutTitleText} />
          </h3>
          <div className={styles.productInfo}>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemScreen,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemScreen1,
                )}
              />
            </div>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemResolution,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemScreen1,
                )}
              />
            </div>

            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor1,
                )}
              />
            </div>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemRAM,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemRAM1,
                )}
              />
            </div>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemRAM1,
                )}
              />
            </div>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor2,
                )}
              />
            </div>

            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemResolution,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor2,
                )}
              />
            </div>
            <div className={styles.productInfoItem}>
              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemResolution,
                )}
              />

              <Skeleton
                className={classNames(
                  styles.productItem,
                  styles.productItemProcessor3,
                )}
              />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </section>
  );
};

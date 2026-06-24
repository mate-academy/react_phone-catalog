import React from "react";
import classNames from "classnames";
import styles from "./LoadingCard.module.scss";

interface Props {
  variant?: "cards" | "details";
  cardsCount?: number;
}

export const LoadingCard: React.FC<Props> = ({
  variant = "cards",
  cardsCount = 4,
}) => {
  if (variant === "details") {
    return (
      <section className={styles.details} aria-label="Loading product details">
        <div
          className={classNames(styles.shimmer, styles.line, styles.bread)}
        />
        <div className={classNames(styles.shimmer, styles.line, styles.back)} />
        <div
          className={classNames(styles.shimmer, styles.line, styles.title)}
        />

        <div className={styles.topGrid}>
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={`thumb-${index + 1}`}
                  className={classNames(styles.shimmer, styles.thumb)}
                />
              ))}
            </div>

            <div className={classNames(styles.shimmer, styles.mainImage)} />
          </div>

          <div className={styles.sidebar}>
            <div
              className={classNames(styles.shimmer, styles.line, styles.meta)}
            />
            <div className={styles.colorsRow}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`color-${index + 1}`}
                  className={classNames(styles.shimmer, styles.color)}
                />
              ))}
            </div>
            <div
              className={classNames(styles.shimmer, styles.line, styles.meta)}
            />
            <div className={styles.capacityRow}>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`capacity-${index + 1}`}
                  className={classNames(styles.shimmer, styles.capacity)}
                />
              ))}
            </div>
            <div
              className={classNames(styles.shimmer, styles.line, styles.price)}
            />
            <div className={styles.buttonsRow}>
              <div className={classNames(styles.shimmer, styles.buttonMain)} />
              <div className={classNames(styles.shimmer, styles.buttonIcon)} />
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`row-${index + 1}`}
                className={classNames(styles.shimmer, styles.line, styles.spec)}
              />
            ))}
          </div>
        </div>

        <div className={styles.bottomGrid}>
          <div>
            <div
              className={classNames(
                styles.shimmer,
                styles.line,
                styles.section,
              )}
            />
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`about-${index + 1}`}
                className={classNames(
                  styles.shimmer,
                  styles.line,
                  styles.paragraph,
                )}
              />
            ))}
          </div>

          <div>
            <div
              className={classNames(
                styles.shimmer,
                styles.line,
                styles.section,
              )}
            />
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`spec-${index + 1}`}
                className={classNames(styles.shimmer, styles.line, styles.spec)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.loaderBox} aria-label="Loading products">
      {Array.from({ length: cardsCount }).map((_, index) => (
        <div key={`card-${index + 1}`} className={styles.card} />
      ))}
    </div>
  );
};

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WriteReview } from '../WriteReview/WriteReview';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { Stars } from '../Stars/Stars';
import './ReviewsPage.scss';
import { useReviews } from '@hooks/useReviews';

export const ReviewsPage = ({
  onBack,
  productId,
}: {
  onBack: () => void;
  productId: string;
}) => {
  const { t } = useTranslation();
  const { reviews, loading, addReview, avgScore, ratings } =
    useReviews(productId);
  const [showWriteReview, setShowWriteReview] = useState(false);

  if (showWriteReview) {
    return (
      <WriteReview
        onBack={() => setShowWriteReview(false)}
        onSubmit={addReview}
      />
    );
  }

  return (
    <div className="reviews-page">
      <div className="reviews-page__header">
        <h1 className="reviews-page__title">{t('reviews.title')}</h1>
        <button
          className="reviews-page__back"
          onClick={onBack}
        >
          {'<'} {t('reviews.back')}
        </button>
      </div>
      <div className="reviews-page__body">
        <div className="summary-panel">
          <div className="summary-panel__score-row">
            <Stars score={avgScore} />
            <span className="summary-panel__score-text">
              {avgScore} {t('reviews.out_of')}
            </span>
          </div>
          <p className="summary-panel__count">
            {reviews.length} {t('reviews.global_ratings')}
          </p>
          {ratings.map((r) => (
            <div
              key={r.label}
              className="summary-panel__bar-row"
            >
              <span className="summary-panel__bar-label">{r.label}</span>
              <div className="summary-panel__bar-track">
                <div
                  className="summary-panel__bar-fill"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <span className="summary-panel__bar-pct">{r.pct}%</span>
            </div>
          ))}
          <div className="summary-panel__write-section">
            <p className="summary-panel__write-title">
              {t('reviews.write_title')}
            </p>
            <p className="summary-panel__write-sub">{t('reviews.write_sub')}</p>
            <button
              className="summary-panel__write-btn"
              onClick={() => setShowWriteReview(true)}
            >
              {t('reviews.write_btn')}
            </button>
          </div>
        </div>
        <div className="reviews-list">
          {loading && <p>{t('auth.loading')}</p>}
          {reviews.slice(0, 5).map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './WriteReview.scss';

interface Props {
  onBack: () => void;
  onSubmit: (data: {
    name: string;
    score: number;
    title: string;
    body: string;
  }) => Promise<boolean>;
}

export const WriteReview = ({ onBack, onSubmit }: Props) => {
  const { t } = useTranslation();

  const [starScore, setStarScore] = useState(0);
  const [hoverScore, setHoverScore] = useState(0);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const starLabels = (t('write_review.star_labels', {
    returnObjects: true,
  }) as string[]) || [
    '',
    'I hate it',
    "I don't like it",
    "It's OK",
    'I like it',
    'I love it',
  ];

  const canSubmit =
    starScore > 0 &&
    name.trim().length > 0 &&
    title.trim().length > 0 &&
    body.length >= 20;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    const ok = await onSubmit({ name, score: starScore, title, body });
    setLoading(false);
    if (ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="write-review">
        <div className="write-review__inner">
          <div className="write-review__success">
            <div className="write-review__success-icon">✅</div>
            <h2 className="write-review__success-title">
              {t('write_review.success_title')}
            </h2>
            <p className="write-review__success-sub">
              {t('write_review.success_sub')}
            </p>
            <button
              className="write-review__cancel"
              onClick={onBack}
            >
              {'<'} {t('write_review.back_to')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="write-review">
      <div className="write-review__inner">
        <div className="write-review__header">
          <h1 className="write-review__title">{t('write_review.title')}</h1>
          <button
            className="write-review__back"
            onClick={onBack}
          >
            {'<'} {t('write_review.back')}
          </button>
        </div>

        <div className="write-review__section">
          <div className="write-review__section-title">
            {t('write_review.name_label', 'Your name')}
          </div>
          <input
            className="write-review__input"
            type="text"
            placeholder="e.g. John D."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
        </div>

        <div className="write-review__section">
          <div className="write-review__section-title">
            {t('write_review.overall_rating', 'Overall rating')}
          </div>
          <div className="star-picker">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`star-picker__star${(hoverScore || starScore) >= n ? ' star-picker__star--active' : ''}`}
                onMouseEnter={() => setHoverScore(n)}
                onMouseLeave={() => setHoverScore(0)}
                onClick={() => setStarScore(n)}
              >
                ★
              </button>
            ))}
          </div>
          {(hoverScore || starScore) > 0 && (
            <div className="write-review__section-hover">
              {starLabels[hoverScore || starScore]}
            </div>
          )}
        </div>

        <div className="write-review__section">
          <div className="write-review__section-title">
            {t('write_review.headline')}
          </div>
          <input
            className="write-review__input"
            type="text"
            placeholder={t('write_review.headline_placeholder')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={150}
          />
        </div>

        <div className="write-review__section">
          <div className="write-review__section-title">
            {t('write_review.written')}
          </div>
          <textarea
            className="write-review__textarea"
            placeholder={t('write_review.written_placeholder')}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="write-review__hint">
            {t('write_review.hint')} ({body.length} / 20)
          </div>
        </div>

        <div className="write-review__actions">
          <button
            className="write-review__submit"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
          >
            {loading ?
              t('write_review.submitting', 'Submitting...')
            : t('write_review.submit', 'Submit')}
          </button>
          <button
            className="write-review__cancel"
            onClick={onBack}
          >
            {t('write_review.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

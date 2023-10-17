import { useNavigate, useSearchParams } from 'react-router-dom';
import './TitleOfPage.scss';

type Props = {
  title: string,
  phonesLen?: number,
  visiblePhonesLen?: number,
  isLoading?: boolean,
  isError?: boolean,
  backArrow: boolean,
  prevSearchParam?: string,
};

export const TitleOfPage: React.FC<Props> = ({
  phonesLen,
  visiblePhonesLen,
  title,
  isLoading,
  isError,
  backArrow,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const goBack = () => {
    navigate(-1);
  };

  return (
    phonesLen && !backArrow ? (
      <div className="title-of-page">
        <h1 className="title-of-page__title">
          {title}
        </h1>

        <p
          className="title-of-page__paragraph"
          style={{ visibility: !isLoading && !isError ? 'visible' : 'hidden' }}
        >
          {query ? `${visiblePhonesLen} results` : `${phonesLen || 0} models`}
        </p>

      </div>
    ) : (
      <div className="title-of-page">
        <div className="title-of-page__container">
          <button
            type="button"
            aria-label="go back"
            className="title-of-page__arrow"
            onClick={() => goBack()}
          />
          <button
            type="button"
            aria-label="go back"
            className="title-of-page__back-link"
            onClick={() => goBack()}
          >
            Back
          </button>
        </div>

        <h1 className="title-of-page__title">
          {title}
        </h1>
      </div>
    )
  );
};

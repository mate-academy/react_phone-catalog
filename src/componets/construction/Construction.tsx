import './Construction.scss';
import constructionImage from '../../img/comingSoon.png';

export const Construction = () => {
  return (
    <div className="construction">
      <h1 className="construction__title">Coming soon</h1>
      <div className="construction__image-container">
        <img
          src={constructionImage}
          alt="coming soon"
          className="construction__image"
        />
      </div>
      <h2 className="construction__announcement">
        We&apos;ve got something special in store for you
      </h2>
      <h3 className="construction__description">
        And we can&apos;t wait for you to see it.
      </h3>
      <h3 className="construction__description construction__description--last">
        Please check back soon.
      </h3>
    </div>
  );
};

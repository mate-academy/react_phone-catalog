import React, { memo } from 'react';

import './UnrealizedFeature.scss';

type Props = {
  onClose: () => void;
};

export const UnrealizedFeature: React.FC<Props> = memo(({ onClose }) => {
  return (
    <section className="UnrealizedFeature">
      <div className="UnrealizedFeature__modal">
        <button
          className="UnrealizedFeature__button"
          type="button"
          aria-label="Close modal"
          onClick={() => onClose()}
        >
          <i className="fas fa-xmark UnrealizedFeature__xmark" />
        </button>
        <h1>Unrealized Feature</h1>
        <p className="UnrealizedFeature__text">
          Sorry, this feature has not been implemented yet.
        </p>
      </div>
    </section>
  );
});

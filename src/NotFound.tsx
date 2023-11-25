import React from 'react';

type Props = {
  text: string,
};

export const NotFoundItems: React.FC<Props> = ({
  text,
}) => {
  return (
    <div className="not-found">
      <p className="not-found__message">
        {text}
        {' '}
        not found.
      </p>
      <p className="not-found__message">
        Would you like to return to
        <a
          href="#/"
          className="not-found__link"
        >
          Home page?
        </a>

      </p>

    </div>
  );
};

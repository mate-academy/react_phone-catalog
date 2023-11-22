import React from 'react';

type Props = {
  title: string;
};

export const NoSearchResults: React.FC<Props> = ({ title }) => {
  return (
    <div className="no-results">
      {`${title} not found by this params`}
    </div>
  );
};

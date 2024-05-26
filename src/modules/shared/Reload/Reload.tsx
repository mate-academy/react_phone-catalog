import React from 'react';
import { ReloadButton } from '../Buttons/MoveButtons';

type Props = {
  imgOfError: string;
};

export const Reload: React.FC<Props> = React.memo(({ imgOfError }) => {
  return (
    <div className="reload-block">
      <img
        src={`/img/${imgOfError}`}
        alt="page not found"
        className="reload-block__page-not-found"
      />

      <div className="reload-block__button">
        <ReloadButton />
      </div>
    </div>
  );
});

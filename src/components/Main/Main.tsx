import React, { FC } from 'react';
import './_Main.scss';

interface Props {
  children: JSX.Element;
}

export const Main: FC<Props> = (props) => {
  return (
    <main className="main">
      {props.children}
    </main>
  );
};

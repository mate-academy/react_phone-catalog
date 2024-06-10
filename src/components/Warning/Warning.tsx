import React, { useEffect, useState } from 'react';
import './Warning.scss';
import { CSSTransition } from 'react-transition-group';

type Props = {
  text: string;
  setHasWarning: (a: boolean) => void;
};

export const Warning: React.FC<Props> = ({ text, setHasWarning }) => {
  const [isShowWarning, setIsShowWarning] = useState(true);

  const durationWarning = 1000;
  const durationAnimation = 300;

  useEffect(() => {
    window.setTimeout(() => {
      setIsShowWarning(false);
    }, durationWarning - durationAnimation);

    window.setTimeout(() => {
      setHasWarning(false);
    }, durationWarning);
  }, []);

  return (
    <CSSTransition
      in={isShowWarning}
      classNames="warning"
      timeout={durationAnimation}
      unmountOnExit
    >
      <div className="warning__massage">
        <p className="warning__text">{text}</p>
      </div>
    </CSSTransition>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import './Loader.scss';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

type Props = {
  style?: React.CSSProperties;
  classModifier?: string;
  fullScreen?: boolean;
};

export const Loader: React.FC<Props> = ({
  classModifier,
  style,
  fullScreen = false,
}) => {
  const { body } = document;

  const element = (
    <div
      className={clsx(
        'Loader',
        fullScreen && '--fullscreen',
        classModifier && classModifier,
      )}
      data-cy="loader"
      style={{ ...style }}
    >
      <div className="Loader__content" />
    </div>
  );

  if (fullScreen) {
    body.classList.add('lock');
  }

  useEffect(() => {
    if (fullScreen) {
      body.classList.add('lock');
    }

    return () => {
      if (fullScreen && body.classList.contains('lock')) {
        body.classList.remove('lock');
      }
    };
  }, []);

  return (
    <>
      {!fullScreen && element}
      {fullScreen && createPortal(element, document.body)}
    </>
  );
};

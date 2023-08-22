/* eslint-disable max-len */
import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useTranslation } from 'react-i18next';

import { MainButton } from '../Buttons/MainButton/MainButton';

import './Player.scss';

export const Player: React.FC = React.memo(() => {
  const [isPlayerStarted, setIsPlayerStarted] = useState(false);
  const [isControlsShowed, setIsControlsShowed] = useState(false);
  const [isButtonShowed, setIsButtonShowed] = useState(true);
  const { t } = useTranslation();

  const startPlayer = () => {
    setIsPlayerStarted(true);
    setIsControlsShowed(true);
    setIsButtonShowed(false);
  };

  const handlePlayerStart = () => {
    setIsButtonShowed(false);
  };

  const handlePlayerPause = () => {
    setIsPlayerStarted(false);
    setIsControlsShowed(false);
    setIsButtonShowed(true);
  };

  const handlePlayerEnded = () => {
    setIsPlayerStarted(false);
    setIsButtonShowed(true);
  };

  return (
    <div className="player">
      <ReactPlayer
        url="https://gosyanich.cloudns.nz:9353/kuroso/images/winter-2022/videos/winter-2022.mov"
        width="100%"
        height="100%"
        stopOnUnmount
        controls={isControlsShowed}
        onStart={handlePlayerStart}
        playing={isPlayerStarted}
        onPause={handlePlayerPause}
        onEnded={handlePlayerEnded}
      />

      {isButtonShowed && (
        <h1 className="player__title">
          {t('Winter drop')}
        </h1>
      )}

      {isButtonShowed && (
        <div className="player__button-container">
          <MainButton
            text={t('View')}
            className="player__button"
            button
            onClick={startPlayer}
          />
        </div>
      )}
    </div>
  );
});

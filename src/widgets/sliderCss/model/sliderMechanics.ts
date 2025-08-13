import styles from '../styles/sliderAnimation.module.scss';

const manipulate = {
  toggleTrackClass: (track: HTMLDivElement, anim: boolean) => {
    track.classList.toggle(styles['slider-animated'], anim);
    track.classList.toggle(styles['slider-dragging'], !anim);
  },

  moveTrack: (track: HTMLDivElement, offset: number) => {
    if (!track) {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    track.style.setProperty('--offset', `${offset}px`);
  },
};

export { manipulate };

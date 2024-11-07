import { MouseEventHandler } from 'react';

export const instantScroll: MouseEventHandler<HTMLAnchorElement> = e => {
  const target = e.target as HTMLElement;

  if (!(target instanceof HTMLButtonElement)) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
};

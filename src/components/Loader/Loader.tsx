import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import './loader.scss';

export const Loader: FC = () => {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className="dot-spinner">
      <div className={`dot-spinner__dot dot-spinner__dot--${theme}`} />
      <div className={`dot-spinner__dot dot-spinner__dot--${theme}`} />
      <div className={`dot-spinner__dot dot-spinner__dot--${theme}`} />
      <div className={`dot-spinner__dot dot-spinner__dot--${theme}`} />
      <div className={`dot-spinner__dot dot-spinner__dot--${theme}`} />
      <div className={`dot-spinner__dot dot-spinner__dot--${theme}`} />
      <div className={`dot-spinner__dot dot-spinner__dot--${theme}`} />
      <div className={`dot-spinner__dot dot-spinner__dot--${theme}`} />
    </div>
  );
};

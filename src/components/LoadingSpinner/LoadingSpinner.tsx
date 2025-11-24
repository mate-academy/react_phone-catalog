import style from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  color?: string;
}

export default function LoadingSpinner({
  color = '#161827',
}: LoadingSpinnerProps) {
  return (
    <div className={style.loadingSpinner} style={{ borderTopColor: color }} />
  );
}

import './LongButton.scss';

export const LongButton = ({ text, onClick, className }: any) => {
  return (
    <a
      className={`long-button__link body14 ${className}`}
      href="/"
      onClick={onClick}
    >
      {text}
    </a>
  );
};

import './LongButton.scss';

export const LongButton = ({ text, onClick }: any) => {
  return (
    <a
      className="long-button__link body14"
      href="/"
      onClick={onClick}
    >
      {text}
    </a>
  );
};

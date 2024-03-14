import './ButtonMain.scss';

type Props = {
  text: string;
};

export const ButtonMain: React.FC<Props> = ({ text }) => {
  return (
    <button className="button-main" aria-label="home" type="button">
      {text}
    </button>
  );
};

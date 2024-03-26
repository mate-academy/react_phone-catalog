import './TextH1.scss';

type Props = {
  text: string;
};
export const TextH1: React.FC<Props> = ({ text }) => {
  return <h1 className="h1-text">{text}</h1>;
};

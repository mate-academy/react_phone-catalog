type Props = {
  text: string;
};

export const Error: React.FC<Props> = ({ text }) => (
  <div>
    <h2>{text}</h2>
  </div>
);

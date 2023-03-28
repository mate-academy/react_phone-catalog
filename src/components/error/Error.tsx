type Props = {
  text: string;
};

export const Error: React.FC<Props> = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
);

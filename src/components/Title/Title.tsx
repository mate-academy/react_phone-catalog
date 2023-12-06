import './Title.scss';

type Props = {
  title: string;
};

export const Title: React.FC<Props> = ({ title }) => {
  return (
    <h2
      className="title"
    >
      {title}
    </h2>
  );
};

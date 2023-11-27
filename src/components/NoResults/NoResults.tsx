import './result.scss';

type Props = {
  name: string;
};

export const NoResults: React.FC<Props> = ({ name }) => {
  return (
    <section className="result">
      <h1 className="result__title">{`${name} not found`}</h1>
    </section>
  );
};

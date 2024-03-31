type Props = {
  title: string;
};

export const NoResults: React.FC<Props> = ({ title }) => {
  return <h1>{`${title} not found`}</h1>;
};

import { Title } from '../Title';

type NoResultsProps = {
  categoryName: string
};

export const NoResults = ({ categoryName }: NoResultsProps) => {
  const titleText = `${categoryName} not found`;

  return <Title>{titleText}</Title>;
};

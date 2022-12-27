import './NoResults.scss';

type Props = {
  title: string,
};

export const NoResults: React.FC<Props> = ({ title }) => (
  <h1
    className="
      product-list__no-results
      no-results"
  >
    {`${title} is not found...`}
  </h1>
);

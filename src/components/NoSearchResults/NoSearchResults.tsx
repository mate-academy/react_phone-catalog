import './style.scss';

type Props = {
  section: string;
};

export const NoSearchResults: React.FC<Props> = ({ section }) => (
  <p className="no-results">
    {`There are no products matching your search in the ${section}...`}
  </p>
);

type Props = {
  category: string
};

export const NotFound: React.FC<Props> = ({ category }) => (
  <h1 className="title phones-page-container__title">
    {` ${category} not found`}
  </h1>
);

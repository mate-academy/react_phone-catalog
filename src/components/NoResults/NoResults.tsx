interface Props {
  categoryName: string;
}

export const NoResults: React.FC<Props> = ({ categoryName }) => (
  <section className="section">
    <div className="section__container">
      <h3 className="h3">{`${categoryName} not found.`}</h3>
    </div>
  </section>
);

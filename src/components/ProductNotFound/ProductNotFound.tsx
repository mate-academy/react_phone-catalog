import './ProductNotFound.scss';

type Props = {
  category: string,
};

export const ProductNotFound: React.FC<Props> = ({ category }) => (
  <section>
    <h1>{`${category} was not found`}</h1>
  </section>
);

import { Gadgets } from '../../Components/Gadgets/Gadgets';

type Props = {
  searchInput: string;
};

export const Tablets: React.FC<Props> = ({ searchInput }) => {
  const pageDescription = ['tablets', 'Tablets', 'tablet'];

  return (
    <div className="Tablets">
      <Gadgets pageDescription={pageDescription} searchInput={searchInput} />
    </div>
  );
};

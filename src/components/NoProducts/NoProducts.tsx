import './style.scss';

type Props = {
  section: string;
};

export const NoProducts: React.FC<Props> = ({ section }) => (
  <p className="no-results">
    {`No producs in ${section} yet. Please add something you like!...`}
  </p>
);

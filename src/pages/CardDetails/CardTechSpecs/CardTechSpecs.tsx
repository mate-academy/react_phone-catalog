import './CardTechSpecs.scss';
import CharsList from '../../../components/CharsList/CharList';
import { createChars } from '../../../helpers/createChars';
import { CardDetail } from '../../../types/CardDetail';

const charsList = [
  'Screen',
  'Resolution',
  'Processor',
  'RAM',
  'Built in memory',
  'Camera',
  'Zoom',
  'Cell',
];

type Props = {
  cardDetail: CardDetail;
};

const CardTechSpecs: React.FC<Props> = ({
  cardDetail: {
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    capacity,
  },
}) => {
  const chars = createChars(
    charsList,
    [screen, resolution, processor, ram, capacity, camera, zoom, cell],
  );

  return (
    <div className="card-tech-specs">
      <h3 className="card-tech-specs__title">
        Tech specs
      </h3>

      <div className="line card-tech-specs__line" />

      <CharsList classes="card-tech-specs" list={chars} />
    </div>
  );
};

export default CardTechSpecs;

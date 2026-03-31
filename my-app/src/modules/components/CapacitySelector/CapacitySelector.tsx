import { useNavigate } from 'react-router-dom';
import './CapacitySelector.scss';

interface Props {
  capacities: string[];
  selected: string;
  category: string;
  namespaceId: string;
  color: string;
}

export function CapacitySelector({ capacities, selected, category, namespaceId, color }: Props) {
  const navigate = useNavigate();

  const handleSelect = (capacity: string) => {
    const variantId = `${namespaceId}-${capacity.toLowerCase()}-${color}`;
    navigate(`/${category}/${variantId}`);
  };

  return (
    <div className="capacity-selector">
      <p className="capacity-selector__label">Select capacity</p>
      <div className="capacity-selector__options">
        {capacities.map((cap) => (
          <button
            key={cap}
            className={`capacity-selector__option${cap === selected ? ' capacity-selector__option--active' : ''}`}
            onClick={() => handleSelect(cap)}
            aria-pressed={cap === selected}
          >
            {cap}
          </button>
        ))}
      </div>
    </div>
  );
}

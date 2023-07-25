import './SpecList.scss';

type Props = {
  specList: [string, string | string[]][];
};

export const SpecList: React.FC<Props> = ({ specList }) => (
  <div className="tech-specs__full-spec">
    <ul className="full-spec__list">
      {specList.map(([name, value]) => (
        <li
          key={name}
          className="full-spec__item"
        >
          <div className="full-spec__item--name">
            {name}
          </div>

          <div className="full-spec__item--value">
            {Array.isArray(value)
              ? value.join(', ')
              : value}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

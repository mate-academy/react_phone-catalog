import './ItemTech.scss';

type Props = {
  itemTech: {
    title: string;
    value: string | string[];
  }[];
  headline?: string;
  variant?: 'card' | 'page';
};

export const ItemTech: React.FC<Props> = ({ itemTech, headline, variant }) => {
  return (
    <div className="item-tech">
      {headline && <h3 className="item-tech__headline">{headline}</h3>}
      <ul className={`item-tech__list item-tech__list--${variant}`}>
        {itemTech.map(({ title, value }) => {
          return (
            <li key={title} className="item-tech__item">
              <p className="item-tech__name">
                {title}
                <span className="item-tech__value">
                  {typeof value === 'string' ? value : value.join(', ')}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

import { Description } from '../../types/phoneDetails';
import { Description as DescriptionItem } from '../Description';

type Props = {
  description: Description[],
};

export const DescriptionList: React.FC<Props> = ({ description }) => (
  <ul className="description__list">
    {description.map(({ title, text }) => (
      <li
        className="description__listItem"
        key={title}
      >
        <DescriptionItem
          title={title}
          text={text}
        />
      </li>
    ))}
  </ul>
);

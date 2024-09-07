import { Category } from '../../types/Category';
import { Icon } from '../base/Icon/Icon.component';

type Props = {
  category: Category;
};

export const NavigationPath: React.FC<Props> = ({ category }) => {
  return (
    <article className="navigationPath">
      <Icon iconType="home" iconUse="button" iconSize="16" />
      <Icon
        iconType="chevron-right"
        iconUse="button"
        iconSize="16"
        disabled={true}
      />
      <span className="navigationPath__name">{category.id.toUpperCase()}</span>
    </article>
  );
};

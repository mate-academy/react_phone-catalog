import { Icon } from '../base/Icon/Icon.component';

type Props = {
  id: string;
};

export const NavigationPath: React.FC<Props> = ({ id }) => {
  return (
    <article className="navigationPath">
      <Icon iconType="home" iconUse="button" iconSize="16" />
      <Icon
        iconType="chevron-right"
        iconUse="button"
        iconSize="16"
        disabled={true}
      />
      <span className="navigationPath__name">{id.toUpperCase()}</span>
    </article>
  );
};

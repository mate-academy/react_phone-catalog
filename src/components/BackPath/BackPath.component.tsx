import { Icon } from '../base/Icon/Icon.component';

export const BackPath = () => {
  return (
    <article className="backPath">
      <Icon iconType="chevron-left" iconUse="button" iconSize="16" />
      <span className="backPath__text">Back</span>
    </article>
  );
};

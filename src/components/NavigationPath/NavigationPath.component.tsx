import { Link } from 'react-router-dom';
import { Icon } from '../base/Icon/Icon.component';

type Props = {
  firstLevel: string;
  secondLevel?: string;
};

export const NavigationPath: React.FC<Props> = ({
  firstLevel,
  secondLevel,
}) => {
  return (
    <article className="navigationPath">
      <Link to="/home">
        <Icon iconType="home" iconUse="button" iconSize="16" />
      </Link>
      <Icon
        iconType="chevron-right"
        iconUse="button"
        iconSize="16"
        disabled={true}
      />
      <span className="navigationPath__name--firstLevel">{`${firstLevel.charAt(0).toUpperCase()}${firstLevel.slice(1)}`}</span>
      {secondLevel && (
        <>
          <Icon
            iconType="chevron-right"
            iconUse="button"
            iconSize="16"
            disabled={true}
          />
          <span className="navigationPath__name--secondLevel">
            {secondLevel}
          </span>
        </>
      )}
    </article>
  );
};

import { NavLink } from 'react-router-dom';

type Props = {
  pathname: string;
  name?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ pathname, name }) => {
  return (
    <div className="breadCrumbs" data-cy="breadCrumbs">
      <NavLink to="/" className="breadCrumbs__iconContainer">
        <div className="breadCrumbs__iconContainer--icon" />
      </NavLink>

      <span className="arrow arrow--right-disabled" />

      <NavLink to={`/${pathname.toLowerCase()}`} className="breadCrumbs__text">
        {pathname}
      </NavLink>

      {name && (
        <>
          <span className="arrow arrow--right-disabled" />
          <span className="breadCrumbs__text">{name}</span>
        </>
      )}

    </div>
  );
};

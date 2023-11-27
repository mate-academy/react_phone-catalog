import { ICONS } from '../icons';

export const AccessoriesPage = () => {
  return (
    <div className="empty-pages">
      <h1 className="empty-pages_title">
        We&apos;re building something awesome, but it&apos;s not ready yet.
      </h1>
      <div className="empty-pages_image-container">
        <img
          className="empty-pages_image"
          src={ICONS.accessoriesUnderConstruction}
          alt="Accessories background page"
        />
      </div>
    </div>
  );
};

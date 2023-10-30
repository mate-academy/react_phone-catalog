/* eslint-disable max-len */
import { ICONS } from '../icons';
import '../style/EmptyPages.scss';

export const TabletPage = () => {
  return (
    <div className="empty-pages">
      <h1 className="empty-pages_title">
        Our web developers are in a race against time
        <br />
        and caffeine to finish this page.
        <br />
        Please check back later for updates.
      </h1>
      <div className="empty-pages_image-container">
        <img
          className="empty-pages_image"
          src={ICONS.tabletsUnderConstruction}
          alt="Tablets background page"
        />
      </div>
    </div>
  );
};

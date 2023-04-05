import './EmptyPage.scss';

export const EmptyPage = () => {
  return (
    <section className="empty">
      <img src="Images/empty--img.png" className="empty__img" alt="Empty image" />

      <p className="empty__message">
        At the moment this page does not exist, we will add this functionality soon
      </p>

    </section>
  );
};

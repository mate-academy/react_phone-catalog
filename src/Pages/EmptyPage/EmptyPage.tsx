import './EmptyPage.scss';

export const EmptyPage = () => {
  return (
    <section className="empty">
      <img
        src="Images/empty--img.png"
        className="empty__img"
        alt="Empty"
      />

      <p className="empty__message">
        {
          `At the moment this page is empty,
          you can back when it will be some here`
        }
      </p>

    </section>
  );
};

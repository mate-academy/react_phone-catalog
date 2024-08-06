const NoPage = () => {
  return (
    <section className="mx-auto flex w-page flex-col items-center justify-between px-8">
      <p className="text-smallText">Sorry, page not found</p>
      <img src={`${window.location.origin}/img/page-not-found.png`} alt="" />
    </section>
  );
};

export default NoPage;

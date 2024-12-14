export const NotFoundPage = () => {
  return (
    <div
      className="page-not-found"
      style={{
        marginTop: '40px',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Page not found</h2>
      <img
        src="/img/page-not-found.png"
        alt="Page Not Found"
        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

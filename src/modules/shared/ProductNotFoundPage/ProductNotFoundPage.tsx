export const ProductNotFoundPage = () => {
  // Style once, forget forever
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img
        src="img/product-not-found.png"
        alt="Page not found"
        style={{
          maxWidth: '300px',
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

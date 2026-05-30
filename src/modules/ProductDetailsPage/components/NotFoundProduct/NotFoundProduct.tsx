import notFoundSrc from '../../../../assets/img/product-not-found.png';

export const NotFoundProduct: React.FC = () => {
  return (
    <div className={'empty'}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        Product was not found
      </h1>
      <img className="empty_img" src={notFoundSrc} alt="Not Found" />
    </div>
  );
};

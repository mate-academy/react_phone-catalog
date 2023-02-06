import './ProductCapacity.scss';

export const ProductCapacity = ({ product, products, setProduct }) => {
  const searchProductByCapacity = async (capacity: string) => {
    const newProduct = products.find((one: any) => {
      return (
        one.phoneId
        === product.id.replace(product.capacity.toLowerCase(),
          capacity.toLowerCase()));
    });
    // console.log(newProduct)

    try {
      const response = await fetch(
        `/_new/products/${newProduct.itemId}.json`,
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const result = await response.json();

        window.history.replaceState(null, '', `/phones/${newProduct.id}`);

        // pathname=`phones${newProduct.id}`
        return setProduct(result);
      }
    } catch (err) {
      throw err;
    }

    setProduct(newProduct);

    // navigate(`../${newProduct.id}`);
    // window.location.reload(true);
  };

  return (
    <div className="capacity">
      <div className="capacity__text body 12">
        Select capacity
      </div>
      <ul className="capacity__list">
        {
          product.capacityAvailable.map((one) => {
            return (
              <li
                className={`capacity__item ${one && 'active-button'}`}
                key={one}
                onClick={() => {
                  searchProductByCapacity(one);
                }}
              >
                {one}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

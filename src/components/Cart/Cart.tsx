import './Cart.scss';

export const Cart: React.FC = () => {
  return (
    <div>
      <h1>Cart</h1>

      <div>
        <ul>
          <li>
            <button type="button">X</button>

            <img src="" alt="" />

            <span />

            <div>
              <button type="button">-</button>
              <span>2</span>
              <button type="button">+</button>
            </div>

            <span>21123</span>
          </li>
        </ul>

        <div>
          <p>
            123123
            <span>total 12312 items</span>
          </p>

          <button type="button" className="button">Checkout</button>
        </div>

      </div>
    </div>
  );
};

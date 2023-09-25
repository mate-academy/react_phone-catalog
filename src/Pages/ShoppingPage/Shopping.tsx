import { ButtonBack, Loader, Navigation } from '../../Components';
import { Phone } from '../../Type/Phone';
import { BASE_URL } from '../../utils/BASE_URL';
import './shopping.scss';

type Props = {
  isLoading: boolean;
  shoppingPhones: Phone[];
};

export const ShoppingPage: React.FC<Props> = ({
  shoppingPhones,
  isLoading,
}) => {
  const testPhones = shoppingPhones.slice(22, 25);

  return (
    <>
      <Navigation />

      {isLoading && <Loader />}

      {!isLoading && (
        <main className="shopping">
          <section>
            <div className="shopping__title">
              <ButtonBack />

              <h1 className="shopping__title--cart">Cart</h1>
            </div>
          </section>

          <section className="shopping__content">
            <div className="shopping__content--carts">
              {testPhones.map(product => (
                <div
                  className="shopping__products"
                  key={product.itemId}
                >
                  <div
                    className="shopping__product shopping__products--content"
                  >
                    <>
                      <button
                        type="button"
                        aria-label="Mute volume"
                        className="shopping__buttons shopping__buttons--close"
                      />

                      <img
                        src={`${BASE_URL}/_new/${product.image}`}
                        alt="product"
                        className="shopping__product--img"
                      />

                      <p className="shopping__product--name">{product.name}</p>

                      <div className="shopping__product--buttons">
                        <button
                          type="button"
                          aria-label="Mute volume"
                          className="shopping__buttons--minus
                          shopping__buttons
                          shopping__product--button"
                        />
                        1
                        <button
                          type="button"
                          aria-label="Mute volume"
                          className="shopping__buttons--plus
                          shopping__buttons
                          shopping__product--button"
                        />
                      </div>
                    </>

                    <div>
                      <h2 className="shopping__product--price">
                        {`$${product.fullPrice}`}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="shopping__outcome">
              <h1 className="shopping__outcome--price">{`$${3297}`}</h1>

              <p className="shopping__outcome--total">
                {`Total for ${testPhones.length} items`}
              </p>

              <button
                type="button"
                className="shopping__outcome--checkout"
              >
                Checkout
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ deliveryOptions, cart, setCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate
                deliveryOptions={deliveryOptions}
                cartItem={cartItem}
              />
              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} />
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cart={cart}
                  setCart={setCart}
                  cartItem={cartItem}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

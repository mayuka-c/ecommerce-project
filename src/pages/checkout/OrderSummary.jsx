import { useNavigate } from "react-router";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  const navigate = useNavigate();

  const handleCartEmpty = () => {
    navigate("/");
  };

  return (
    <div className="order-summary">
      {(!cart || cart.length === 0) && (
        <>
          <p>Your cart is empty.</p>
          <button
            className="button-view-products button-primary"
            onClick={handleCartEmpty}
          >
            View products
          </button>
        </>
      )}
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate
                deliveryOptions={deliveryOptions}
                cartItem={cartItem}
              />
              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

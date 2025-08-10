import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({deliveryOptions, cart, setCart, cartItem}) {
  function handleDeliveryOptionChange(e, productId) {
    const selectedDeliveryId = e.currentTarget.dataset.deliveryOptionId;

    setCart(
      cart.map((cartItem) =>
        cartItem.productId === productId
          ? {
              ...cartItem,
              deliveryOptionId: selectedDeliveryId,
            }
          : cartItem
      )
    );
  }
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)}-Shipping`;
        }

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            data-delivery-option-id={deliveryOption.id}
            onClick={(e) => {
              handleDeliveryOptionChange(e, cartItem.productId);
            }}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
              data-delivery-option-id={deliveryOption.id}
              onChange={(e) => {
                e.stopPropagation();
                handleDeliveryOptionChange(e, cartItem.productId);
              }}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

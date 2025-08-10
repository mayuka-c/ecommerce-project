import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [update, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleInputQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleKeyDownQuantityChange = async (event) => {
    event.key === "Enter" && (await updateCartItem());
    if (event.key === "Escape") {
      setQuantity(cartItem.quantity);
      setUpdate(false);
    }
  };

  const updateCartItem = async () => {
    update &&
      (await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      }));
    await loadCart();
    setUpdate(!update);
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {update ? (
              <input
                type="text"
                className="quantity-update-text"
                value={quantity}
                onChange={handleInputQuantityChange}
                onKeyDown={handleKeyDownQuantityChange}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}
          >
            {update ? "Save" : "Update"}
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

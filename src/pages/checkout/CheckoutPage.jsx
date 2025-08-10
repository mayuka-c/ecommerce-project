import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./CheckoutPage.css";

// Tu use axios in browser console
// window.axios = axios;

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/favicons/cart-favicon.png" />

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            loadCart={loadCart}
          />

          <PaymentSummary
            paymentSummary={paymentSummary}
            cart={cart}
            loadCart={loadCart}
          />
        </div>
      </div>
    </>
  );
}

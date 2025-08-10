import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [matchingProduct, setMatchingProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderDetailsById = async function () {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setMatchingProduct(
        response.data.products.find((orderProduct) => {
          return orderProduct.productId === productId;
        })
      );
    };
    getOrderDetailsById().catch(() => {
      setError("Invalid Order ID or unable to fetch order details.");
    });
  }, [orderId, productId]);

  return (
    <>
      <title>Tracking</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/favicons/tracking-favicon.png"
      />

      <Header cart={cart} />

      {error && (
        <div className="tracking-page">
          <div className="order-tracking">
            <div className="error-message" style={{ color: 'red', margin: '1em 0' }}>
              {error}
            </div>
            <a className="back-to-orders-link link-primary" href="/orders">
              View all orders
            </a>
          </div>
        </div>
      )}
      {!error && matchingProduct && (
        <div className="tracking-page">
          <div className="order-tracking">
            <a className="back-to-orders-link link-primary" href="/orders">
              View all orders
            </a>

            <div className="delivery-date">
              Arriving on{" "}
              {dayjs(matchingProduct.estimatedDeliveryTimeMs).format("MMMM D")}
            </div>

            <div className="product-info">{matchingProduct.product.name}</div>

            <div className="product-info">
              Quantity: {matchingProduct.quantity}
            </div>

            <img
              className="product-image"
              src={matchingProduct.product.image}
            />

            <div className="progress-labels-container">
              <div className="progress-label">Preparing</div>
              <div className="progress-label current-status">Shipped</div>
              <div className="progress-label">Delivered</div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

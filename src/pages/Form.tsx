import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";
import { OrderContext } from "../components/context/OrdersContext";

function Form() {
  const { orders, setOrders } = useContext(OrderContext);
  const [customerName, setCustomerName] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(window.location.search);
  const id = queryParam.get("id");

  useEffect(() => {
    if (id) {
      const order = orders.find((order: any) => order.id === id);
      if (order) {
        setCustomerName(order.customerName);
        setItem(order.item);
        setQuantity(order.quantity);
        setStatus(order.status);
      }
    }
  }, [id, orders]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id) {
      setOrders((prev: any[]) => [
        {
          id: crypto.randomUUID(),
          customerName,
          item,
          quantity: Number(quantity),
          status,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
      navigate("/");
      return;
    }
    const updatedOrders = orders.map((order: any) => {
      if (order.id === id) {
        return {
          ...order,
          customerName,
          item,
          quantity: Number(quantity),
          status,
        };
      }
      return order;
    });
    setOrders(updatedOrders);

    navigate("/");
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Customer Name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={styles.input}
              required
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Item:
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className={styles.input}
              required
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.input}
              required
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.input}
              required
            >
              <option value="">-- Select a status --</option>
              <optgroup label="Status">
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </optgroup>
            </select>
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default Form;

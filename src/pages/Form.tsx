import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";

const formStyles = {
  formGroup: styles.formGroup,
  label: styles.label,
  input: styles.input,
};

import { OrderContext } from "../components/context/OrdersContext";
import Input from "../components/Input";

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
        <Input
          label="Customer Name:"
          customerName={customerName}
          setCustomerName={setCustomerName}
          styles={formStyles}
          type="text"
        />
        <Input
          label="Item:"
          customerName={item}
          setCustomerName={setItem}
          styles={formStyles}
          type="text"
        />
        <Input
          label="Quantity:"
          customerName={quantity}
          setCustomerName={setQuantity}
          styles={formStyles}
          type="number"
        />

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

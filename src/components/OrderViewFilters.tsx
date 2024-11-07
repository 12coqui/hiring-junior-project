import { useState } from "react";
import styles from "../styles/OrderView.module.css";

interface OrderViewFiltersProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  setStatus: (status: string) => void;
  status: string;
}

function OrderViewFilters({
  itemsPerPage,
  setItemsPerPage,
  setStatus,
  status,
}: OrderViewFiltersProps) {
  return (
    <>
      <div className={styles.actions}>
        <div className={styles.inputGroup}>
          <label htmlFor="all">
            All:
            <input
              type="radio"
              name="status"
              id="all"
              onChange={(e) => setStatus(e.target.id)}
              checked={status === "all"}
            />
          </label>
          <label htmlFor="pending">
            Pending:
            <input
              type="radio"
              name="status"
              id="pending"
              onChange={(e) => setStatus(e.target.id)}
              checked={status === "pending"}
            />
          </label>
          <label htmlFor="completed">
            Completed:
            <input
              type="radio"
              name="status"
              id="completed"
              onChange={(e) => setStatus(e.target.id)}
              checked={status === "completed"}
            />
          </label>
          <label htmlFor="cancelled">
            Cancelled:
            <input
              type="radio"
              name="status"
              id="cancelled"
              onChange={(e) => setStatus(e.target.id)}
              checked={status === "cancelled"}
            />
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="number_of_items">
            {" "}
            Number of items per page:
            <input
              type="number"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              min={1}
              max={10}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default OrderViewFilters;

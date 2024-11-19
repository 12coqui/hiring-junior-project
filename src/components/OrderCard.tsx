import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";

import VisuallyHidden from "../helpers/VisuallyHidden";
import { OrderContext } from "./context/OrdersContext";
import styles from "../styles/OrderView.module.css";

interface OrderCardProps {
  customerName: string;
  item: string;
  quantity: number;
  status: string;
  date: string;
  time: string;
  id: string;
}

function OrderCard({
  customerName,
  item,
  quantity,
  status,
  date,
  time,
  id,
}: OrderCardProps) {
  const [show, setShow] = useState(false);
  const { orders, setOrders } = useContext(OrderContext);
  const navigate = useNavigate();

  function handleEdit(id: string) {
    navigate(`/order?id=${id}`);
  }

  function handleDelete(id: string) {
    const updatedOrders = orders.filter((order: any) => order.id !== id);
    setOrders(updatedOrders);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.li
        layout={true}
        className={styles.item}
        style={{ borderLeft: `var(--${status}) solid 10px` }}
      >
        <div>
          <span>Customer Name:</span> <span>{customerName}.</span>
        </div>
        <div>
          <span>Item: </span>
          <span>{item}.</span>
        </div>
        <div>Quantity: {quantity}.</div>
        <div>
          <span>Status: </span>
          <span>{status}.</span>
        </div>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: show ? 1 : 0 }}
              transition={{
                type: "spring",
                stiffness: "200",
                damping: "40",
                duration: 0.4,
              }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              <span>Date: </span>
              <span>{date}.</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: show ? 1 : 0 }}
            >
              <span>Time: </span>
              <span>{time}.</span>
            </motion.div>
          </>
        )}
        <AnimatePresence mode="wait">
          <motion.button
            className={styles.show}
            onClick={() => setShow((prev) => !prev)}
            layout
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={show ? "show-less" : "show-more"}
                layout
                initial={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                animate={{ opacity: 1, width: "max-content" }}
                exit={{ opacity: 0, width: 0 }}
              >
                {show ? "Show less" : "Show more"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </AnimatePresence>
        <button className={styles.delete} onClick={() => handleDelete(id)}>
          <Trash2 size={18} />
          <VisuallyHidden>Delete item</VisuallyHidden>
        </button>
        <button className={styles.edit} onClick={() => handleEdit(id)}>
          <Edit size={16} />
          <VisuallyHidden>Edit item</VisuallyHidden>
        </button>
      </motion.li>
    </AnimatePresence>
  );
}

export default OrderCard;

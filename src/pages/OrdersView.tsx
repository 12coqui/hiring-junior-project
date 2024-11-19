import { useState, useContext, useEffect } from "react";
import { OrderContext } from "../components/context/OrdersContext.tsx";
import OrderCard from "../components/OrderCard.tsx";
import OrderViewFilters from "../components/OrderViewFilters";
import styles from "../styles/OrderView.module.css";

function OrdersView() {
  const [currentPage, setCurrentPage] = useState(1);
  const { orders } = useContext(OrderContext);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [status, setStatus] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    if (status === "all") {
      setFilteredOrders(orders);
      return;
    }
    const filtered = orders.filter((order: any) => order.status === status);
    setFilteredOrders(filtered);
  }, [status, orders]);

  return (
    <div className={styles.wrapper}>
      <OrderViewFilters
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setStatus={setStatus}
        status={status}
      />
      <ul className={styles.list}>
        {currentOrders.map((order: any) => (
          <OrderCard key={order.id} {...order} />
        ))}
      </ul>
      <div>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={styles.previous}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrdersView;

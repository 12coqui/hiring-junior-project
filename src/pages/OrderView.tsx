import { useState, useContext, useEffect } from 'react';
import { OrderContext } from '../components/context/OrdersContext';
import OrderCard from '../components/OrderCard.tsx';
import styles from '../styles/OrderView.module.css';

function OrderView() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { orders } = useContext(OrderContext);
	const [status, setStatus] = useState('all');
	const [filteredOrders, setFilteredOrders] = useState(orders);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	useEffect(() => {
		if (status === 'all') {
			setFilteredOrders(orders);
			return;
		}
		const filtered = orders.filter((order: any) => order.status === status);
		setFilteredOrders(filtered);
	}, [status, orders]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.actions}>
				<div className={styles.inputGroup}>
					<label htmlFor='all'>
						All:
						<input
							type='radio'
							name='status'
							id='all'
							onChange={e => setStatus(e.target.id)}
							checked={status === 'all'}
						/>
					</label>
					<label htmlFor='pending'>
						Pending:
						<input
							type='radio'
							name='status'
							id='pending'
							onChange={e => setStatus(e.target.id)}
							checked={status === 'pending'}
						/>
					</label>
					<label htmlFor='completed'>
						Completed:
						<input
							type='radio'
							name='status'
							id='completed'
							onChange={e => setStatus(e.target.id)}
							checked={status === 'completed'}
						/>
					</label>
					<label htmlFor='cancelled'>
						Cancelled:
						<input
							type='radio'
							name='status'
							id='cancelled'
							onChange={e => setStatus(e.target.id)}
							checked={status === 'cancelled'}
						/>
					</label>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor='number_of_items'>
						{' '}
						Number of items per page:
						<input
							type='number'
							value={itemsPerPage}
							onChange={e => setItemsPerPage(Number(e.target.value))}
							min={1}
							max={10}
						/>
					</label>
				</div>
			</div>
			<ul className={styles.list}>
				{currentOrders.map((order: any) => (
					<OrderCard key={order.id} {...order} />
				))}
			</ul>
			<div>
				<button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.previous}>
					Previous
				</button>
				<span>
					{' '}
					Page {currentPage} of {totalPages}{' '}
				</span>
				<button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.next}>
					Next
				</button>
			</div>
		</div>
	);
}

export default OrderView;

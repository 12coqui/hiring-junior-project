import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit } from 'react-feather';
import styles from '../styles/OrderView.module.css';
import VisuallyHidden from './VisuallyHidden';
import { OrderContext } from './context/OrdersContext';

interface OrderCardProps {
	customerName: string;
	item: string;
	quantity: number;
	status: string;
	date: string;
	time: string;
	id: string;
}

function OrderCard({ customerName, item, quantity, status, date, time, id }: OrderCardProps) {
	const [show, setShow] = useState(false);
	const { orders, setOrders } = useContext(OrderContext);
	const navigate = useNavigate();

	function handleEdit(id: string) {
		navigate(`/form?id=${id}`);
	}

	function handleDelete(id: string) {
		const updatedOrders = orders.filter((order: any) => order.id !== id);
		setOrders(updatedOrders);
	}

	return (
		<li className={styles.item} style={{ border: `var(--${status}) solid 2px` }}>
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
					<div>
						<span>Date: </span>
						<span>{date}.</span>
					</div>
					<div>
						<span>Time: </span>
						<span>{time}.</span>
					</div>
				</>
			)}
			<button className={styles.show} onClick={() => setShow(prev => !prev)}>
				{show ? 'Show less' : 'Show more'}
			</button>
			<button className={styles.delete} onClick={() => handleDelete(id)}>
				<Trash2 size={18} />
				<VisuallyHidden>Delete item</VisuallyHidden>
			</button>
			<button className={styles.edit} onClick={() => handleEdit(id)}>
				<Edit size={16} />
				<VisuallyHidden>Edit item</VisuallyHidden>
			</button>
		</li>
	);
}

export default OrderCard;

import { createContext, useState } from 'react';
import { orders as ORDERS } from '../../api/orders';
const OrderContext = createContext<any>(null);

function OrdersContext({ children }: any) {
	const [orders, setOrders] = useState(ORDERS);
	return <OrderContext.Provider value={{ orders, setOrders }}>{children}</OrderContext.Provider>;
}

export { OrdersContext, OrderContext };

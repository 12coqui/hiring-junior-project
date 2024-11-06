import "./App.css";
import "./reset.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderView from "./pages/OrdersView";
import Form from "./pages/Form";
import Navbar from "./components/Navbar";
import { OrdersContext } from "./components/context/OrdersContext";

function App() {
  return (
    <OrdersContext>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<OrderView />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router>
      <img src="./src/assets/grocery_bg.png" alt="grocery" className="bg" />
    </OrdersContext>
  );
}

export default App;

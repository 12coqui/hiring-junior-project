import { Link } from "react-router-dom";
import { List, PlusSquare } from "react-feather";
import { motion } from "framer-motion";
import styles from "../styles/Navbar.module.css";
import VisuallyHidden from "../helpers/VisuallyHidden";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <motion.h1
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        Greengrocery
      </motion.h1>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            <span>
              <List />
              <VisuallyHidden>View Orders</VisuallyHidden>
            </span>

            <span>List</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/order" className={styles.navLink}>
            <span>
              <PlusSquare />
              <VisuallyHidden>New Order</VisuallyHidden>
            </span>
            <span>New Order</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

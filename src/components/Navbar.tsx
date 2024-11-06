import { Link } from "react-router-dom";
import { List, PlusSquare } from "react-feather";

import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1>Greengrocery</h1>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            <span>
              <List />
            </span>

            <span>List</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/order" className={styles.navLink}>
            <span>
              <PlusSquare />
            </span>
            <span>New Order</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

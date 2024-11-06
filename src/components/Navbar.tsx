import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { List, PlusSquare } from 'react-feather';
function Navbar() {
	return (
		<nav className={styles.navbar}>
			<h1>Greengrocery</h1>
			<ul className={styles.navList}>
				<li className={styles.navItem}>
					<Link to='/' className={styles.navLink}>
						<span>
							<List />
						</span>

						<span>List</span>
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link to='/form' className={styles.navLink}>
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

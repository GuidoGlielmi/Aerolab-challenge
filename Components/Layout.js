import styles from './layout.module.css';
import AerolabLogo from '../public/assets/aerolab-logo.svg';
import Coin from '../public/assets/icons/coin.svg';

const Layout = ({ children }) => {
	return (
		<>
			<nav className={`${styles.rowContainer} ${styles.nav}`}>
				<div>
					<AerolabLogo className={styles.aerolabLogo} />
				</div>
				<div className={styles.rowContainer}>
					<span>John Kite</span>
					<div className={`${styles.rowContainer} ${styles.coinBox}`}>
						<span>6000</span>
						<Coin />
					</div>
				</div>
			</nav>
			{children}
		</>
	);
};

export default Layout;

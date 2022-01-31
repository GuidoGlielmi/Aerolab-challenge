import styles from './layout.module.css';
import AerolabLogo from '../public/assets/aerolab-logo.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from '../Components/Button';

const Layout = ({ children }) => {
	return (
		<>
			<nav className={`rowContainer ${styles.nav}`}>
				<div>
					<AerolabLogo className={styles.aerolabLogo} />
				</div>
				<div className='rowContainer'>
					<span>John Kite</span>
					<Button cursor='default'>
						<span>6000</span>
						<Coin />
					</Button>
				</div>
			</nav>
			{children}
		</>
	);
};

export default Layout;

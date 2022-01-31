import React from 'react';
import styles from './layout.module.css';
import AerolabLogo from '../public/assets/aerolab-logo.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from '../Components/Button';
import { useState } from 'react';
const Layout = ({ children }) => {
	const [{ points, name }, setUser] = useState({ points: '', name: '' });
	return (
		<>
			<nav className={`rowContainer ${styles.nav}`}>
				<div>
					<AerolabLogo className={styles.aerolabLogo} />
				</div>
				<div className='rowContainer'>
					<span>{name}</span>
					<Button cursor='default'>
						<span>{points}</span>
						<Coin />
					</Button>
				</div>
			</nav>
			{React.cloneElement(children, { setUser })}
		</>
	);
};

export default Layout;

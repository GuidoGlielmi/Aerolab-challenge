import { useState } from 'react';
import styles from './button.module.css';
const Button = ({ children, backgroundColor, clickeable }) => {
	const [toggleStyle, setToggleStyle] = useState(false);
	return clickeable ? (
		<div
			onClick={() => setToggleStyle(!toggleStyle)}
			style={{ background: toggleStyle ? backgroundColor : '#ddd', cursor: 'pointer' }}
			className={`${toggleStyle ? styles.boxOn : styles.boxOff} rowContainer`}
		>
			{children}
		</div>
	) : (
		<div style={{ cursor: 'default' }} className={`${styles.boxOff} rowContainer`}>
			{children}
		</div>
	);
};

export default Button;

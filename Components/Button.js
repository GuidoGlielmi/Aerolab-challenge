import { useState } from 'react';
import styles from './button.module.css';
const Button = ({ children, backgroundColor, clickeable, size }) => {
	const [toggleStyle, setToggleStyle] = useState(false);
	return clickeable ? (
		<div
			onClick={() => setToggleStyle(!toggleStyle)}
			style={{ background: toggleStyle ? backgroundColor : '#ddd', cursor: 'pointer' }}
			className={`${toggleStyle ? styles.boxOn : styles.boxOff} ${size ? size : 'small'}Font rowContainer`}
		>
			{children}
		</div>
	) : (
		<div style={{ cursor: 'default' }} className={`${styles.boxOff} ${size ? size : 'small'}Font rowContainer`}>
			{children}
		</div>
	);
};

export default Button;

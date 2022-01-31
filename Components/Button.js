import { useState } from 'react';
import styles from './button.module.css';
const Button = ({ children, backgroundColor, toggling, size, cursor }) => {
	const [toggleStyle, setToggleStyle] = useState(false);
	return toggling ? (
		<div
			onClick={() => setToggleStyle(!toggleStyle)}
			style={{ background: toggleStyle ? backgroundColor : '#ddd', cursor }}
			className={`${toggleStyle ? styles.boxOn : styles.boxOff} ${size ? size : 'small'}Font rowContainer`}
		>
			{children}
		</div>
	) : (
		<div style={{ cursor }} className={`${styles.boxOff} ${size ? size : 'small'}Font rowContainer`}>
			{children}
		</div>
	);
};

export default Button;

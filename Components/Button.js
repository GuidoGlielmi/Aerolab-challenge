import { useState } from 'react';
import styles from './button.module.css';
const Button = ({ children, backgroundColor, clickeable }) => {
	const [toggleStyle, setToggleStyle] = useState(false);
	return (
		<div
			onClick={() => setToggleStyle(!toggleStyle)}
			style={
				clickeable
					? { background: toggleStyle ? backgroundColor : '#ddd', cursor: 'pointer' }
					: { background: '#ddd', cursor: 'default' }
			}
			className={`${clickeable ? (toggleStyle ? styles.boxOn : styles.boxOff) : styles.boxOff} rowContainer`}
		>
			{children}
		</div>
	);
};

export default Button;

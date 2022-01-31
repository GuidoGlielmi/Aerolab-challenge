import { useState } from 'react';
import styles from './button.module.css';
const Button = ({ children, backgroundColor, toggleable, size, cursor, clickHandler }) => {
	const [toggleStyle, setToggleStyle] = useState(false);
	return toggleable ? (
		<div
			onClick={() => {
				if (!clickHandler) {
					return setToggleStyle(!toggleStyle);
				}
				clickHandler();
				setToggleStyle(!toggleStyle);
			}}
			style={{ background: toggleStyle ? backgroundColor : '#ddd', cursor }}
			className={`${toggleStyle ? styles.boxOn : styles.boxOff} ${size ? size : 'small'}Font rowContainer`}
		>
			{children}
		</div>
	) : (
		<div
			onClick={clickHandler ? () => clickHandler() : () => ''}
			style={{ cursor }}
			className={`${styles.boxOff} ${size ? size : 'small'}Font rowContainer`}
		>
			{children}
		</div>
	);
};

export default Button;

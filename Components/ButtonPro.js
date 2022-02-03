import styles from './buttonPro.module.css';
import { useState, useRef } from 'react';

const ButtonPro = ({ buttonRef, clickHandler, children }) => {
  const [toggleStyle, setToggleStyle] = useState(false);
  return (
    <div
      className='marginSmall rowContainer'
      style={{ width: 'max-content', position: 'relative' }}
    >
      <div className={`${toggleStyle ? styles.boxOn : styles.boxOff} smallFont rowContainer`}>
        {children}
      </div>
      <input
        onClick={(e) => {
          clickHandler(e, () => setToggleStyle(toggleStyle ? !toggleStyle : toggleStyle));
          setToggleStyle(!toggleStyle);
        }}
        className={styles.checkbox}
        type='checkbox'
        ref={buttonRef}
      />
    </div>
  );
};

export default ButtonPro;

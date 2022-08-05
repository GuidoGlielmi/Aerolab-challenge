import styles from './buttonPro.module.css';
import {useState} from 'react';

const ButtonPro = ({buttonRef, action, children}) => {
  const [toggleStyle, setToggleStyle] = useState(false);
  return (
    <div className='marginSmall rowContainer' style={{width: 'max-content', position: 'relative'}}>
      <div className={`${toggleStyle ? styles.boxOn : styles.boxOff} smallFont rowContainer`}>
        {children}
      </div>
      <input
        onClick={() => {
          action();
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

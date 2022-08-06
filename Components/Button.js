import styles from './buttonPro.module.css';

const ButtonPro = ({action, children, state}) => {
  return (
    <div onClick={action} className={`${state && styles.boxOff} ${styles.button}`}>
      {children}
    </div>
  );
};

export default ButtonPro;
